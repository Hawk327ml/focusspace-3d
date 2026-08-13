/**
 * Capture ~15s silent FocusSpace room loop for portfolio card.
 * Usage: npm run build && npm run preview (elsewhere) then
 *   node scripts/capture-cover.mjs http://127.0.0.1:4173
 * Or: npm run capture:cover  (starts preview itself)
 */
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { copyFile, mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const portfolioThumbs = path.resolve(
  root,
  "..",
  "..",
  "Hawk327ml.github.io",
  "public",
  "thumbs",
);
const outLocal = path.join(root, "public", "thumbs", "focusspace.webm");
const outPortfolio = path.join(portfolioThumbs, "focusspace.webm");
const requestedUrl = process.argv[2];
const FPS = 12;
const DURATION_SEC = 15;
const FRAME_COUNT = FPS * DURATION_SEC;

const require = createRequire(import.meta.url);
const portfolioNode = path.resolve(root, "..", "..", "Hawk327ml.github.io", "node_modules");

function loadTool(name) {
  try {
    return require(name);
  } catch {
    return require(path.join(portfolioNode, name));
  }
}

const { chromium } = loadTool("playwright");
const ffmpegInstaller = loadTool("@ffmpeg-installer/ffmpeg");

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", shell: false });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited ${code}`));
    });
  });
}

async function waitForServer(url, timeoutMs = 90000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { method: "GET" });
      if (res.ok || res.status === 304) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Server not ready: ${url}`);
}

async function startPreview() {
  const preview = spawn("npm", ["run", "preview", "--", "--host", "127.0.0.1", "--port", "4173"], {
    cwd: root,
    stdio: "ignore",
    shell: true,
  });
  const base = "http://127.0.0.1:4173";
  await waitForServer(base);
  return {
    base,
    stop: () => preview.kill("SIGTERM"),
  };
}

async function main() {
  let stopPreview = null;
  let base = requestedUrl;
  if (!base) {
    const preview = await startPreview();
    base = preview.base;
    stopPreview = preview.stop;
  }

  const frameDir = await mkdtemp(path.join(tmpdir(), "focus-frames-"));
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: [
      "--enable-webgl",
      "--ignore-gpu-blocklist",
      "--use-gl=angle",
      "--use-angle=swiftshader",
    ],
  });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
  });

  try {
    page.on("console", (msg) => {
      if (msg.type() === "error") console.warn("page:", msg.text());
    });
    await page.goto(`${base.replace(/\/$/, "")}/?cap=${Date.now()}`, {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });
    await page.waitForSelector("canvas", { timeout: 90000 });
    await page.locator('a[href="#room"]').first().click();
    await page.waitForTimeout(1600);

    // Crop to the 3D room canvas area when possible.
    const canvas = page.locator("canvas").first();
    await canvas.waitFor({ state: "visible", timeout: 30000 });

    // Click lamp once for a readable night scene beat, then let autoRotate run.
    try {
      const box = await canvas.boundingBox();
      if (box) {
        await page.mouse.click(box.x + box.width * 0.62, box.y + box.height * 0.42);
        await page.waitForTimeout(500);
      }
    } catch {
      // ignore miss-clicks
    }

    await page.addStyleTag({
      content: `
        header, footer, #top, #modes, .panel-shell { display: none !important; }
        main, #room, .scene-shell { margin: 0 !important; max-width: none !important; }
        .scene-shell > div:first-child { display: none !important; }
        .scene-canvas { height: 100vh !important; }
        body { background: #0f172a !important; }
      `,
    });
    await page.waitForTimeout(400);

    const interval = 1000 / FPS;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const t0 = Date.now();
      const file = path.join(frameDir, `frame_${String(i).padStart(4, "0")}.png`);
      await page.screenshot({ path: file, type: "png" });
      const spent = Date.now() - t0;
      if (spent < interval) await page.waitForTimeout(interval - spent);
    }
  } finally {
    await browser.close();
    if (stopPreview) stopPreview();
  }

  await mkdir(path.dirname(outLocal), { recursive: true });
  await run(ffmpegInstaller.path, [
    "-y",
    "-framerate",
    String(FPS),
    "-i",
    path.join(frameDir, "frame_%04d.png"),
    "-c:v",
    "libvpx-vp9",
    "-b:v",
    "1M",
    "-an",
    "-pix_fmt",
    "yuv420p",
    outLocal,
  ]);
  await rm(frameDir, { recursive: true, force: true });

  try {
    await mkdir(path.dirname(outPortfolio), { recursive: true });
    await copyFile(outLocal, outPortfolio);
    console.log(`Also copied to ${outPortfolio}`);
  } catch (err) {
    console.warn("Portfolio copy skipped:", err.message);
  }
  console.log(`Wrote ${outLocal}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
