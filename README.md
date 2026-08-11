# FocusSpace — 3D Study Room

Interactive study room built with **React**, **Vite**, **DaisyUI**, and **React Three Fiber**.

Click desk objects to switch focus tools, toggle day/night lighting, and run a Pomodoro timer.

## Live

- **GitHub Pages:** https://hawk327ml.github.io/focusspace-3d/
- Firebase Hosting (optional, when CLI auth works): https://focusspace-3d.web.app

## Stack

- React 18 + Vite
- Tailwind CSS + DaisyUI (custom `focus` / `focusday` themes)
- Three.js via `@react-three/fiber` + `@react-three/drei`
- GitHub Pages (primary Live) · Firebase Hosting configs kept for optional later deploy

## Local

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Deploy

### GitHub Pages (recommended)

Push to `main`. Actions builds and publishes automatically.

### Firebase Hosting (optional — anti-overwrite)

Only after `firebase login` works. Deploys **only** to site `focusspace-3d` via target `focusspace`.

```bash
firebase use daisy-c2db8
firebase target:apply hosting focusspace focusspace-3d
npm run build
firebase deploy --only hosting:focusspace
```

**Never** run bare `firebase deploy`.

After any Firebase deploy, spot-check:
- https://rosemary-care-notebook.web.app
- https://focusspace-3d.web.app (if used)
- https://luna-dining-3d.web.app (if used)

## Author

Hawk327ml · Multimedia Computing
