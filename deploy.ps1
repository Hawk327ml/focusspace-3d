# Safe deploy — FocusSpace only (never bare firebase deploy)
# Requires: firebase login, site focusspace-3d already created
#
# Node/Firebase CLI does NOT use Windows system proxy by default.
# With v2rayN system proxy at 127.0.0.1:10808, set NODE proxy env or login/deploy fails
# on auth.firebase.tools (ECONNRESET / attest).

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

# --- Proxy for Node/Firebase CLI (v2rayN default HTTP port) ---
if (-not $env:HTTP_PROXY) { $env:HTTP_PROXY = "http://127.0.0.1:10808" }
if (-not $env:HTTPS_PROXY) { $env:HTTPS_PROXY = "http://127.0.0.1:10808" }
$env:NODE_USE_ENV_PROXY = "1"
Write-Host "== Node proxy for Firebase CLI ==" -ForegroundColor Cyan
Write-Host "HTTP_PROXY=$($env:HTTP_PROXY)"
Write-Host "HTTPS_PROXY=$($env:HTTPS_PROXY)"
Write-Host "NODE_USE_ENV_PROXY=$($env:NODE_USE_ENV_PROXY)"

Write-Host "== Verify target binding ==" -ForegroundColor Cyan
Get-Content .firebaserc
$firebaseJson = Get-Content firebase.json -Raw
if ($firebaseJson -notmatch '"target"\s*:\s*"focusspace"') {
  throw "firebase.json missing hosting.target focusspace — aborting to protect other sites."
}

Write-Host "== Build ==" -ForegroundColor Cyan
npm run build

Write-Host "== Deploy hosting:focusspace only ==" -ForegroundColor Cyan
firebase deploy --only hosting:focusspace --project daisy-c2db8

Write-Host "== Spot-check URLs (open manually) ==" -ForegroundColor Yellow
Write-Host "https://focusspace-3d.web.app"
Write-Host "https://rosemary-care-notebook.web.app"
Write-Host "https://luna-dining-3d.web.app"
