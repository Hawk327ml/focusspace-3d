# Safe deploy — FocusSpace only (never bare firebase deploy)
# Requires: firebase login, site focusspace-3d already created

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

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
