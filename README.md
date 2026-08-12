# FocusSpace — 3D Study Room

Interactive study room with **React Three Fiber**. Click desk objects to switch focus modes, toggle day/night, and run a Pomodoro timer.

**Portfolio:** https://hawk327ml.github.io/  
**Live:** https://focusspace-3d.web.app · [GitHub Pages mirror](https://hawk327ml.github.io/focusspace-3d/)

![Study room preview](docs/preview/study-room.png)

## What you can do

- Click **laptop / book / coffee / plant / lamp / clock** to switch focus modes + tips
- Toggle **day / night** lighting and UI theme
- Run an on-page **Pomodoro** timer while looking at the room
- Orbit / zoom the 3D desk scene (desktop + touch)

## Stack

| Layer | Tech |
|-------|------|
| UI | React 18, Tailwind, DaisyUI (`focus` / `focusday`) |
| 3D | Three.js · `@react-three/fiber` · `@react-three/drei` |
| Build | Vite (`base: './'`) |
| Hosting | **Firebase** `focusspace-3d` · GitHub Pages mirror |

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

### Firebase Hosting (primary)

```bash
npm run build
firebase deploy --only hosting:focusspace --project daisy-c2db8
```

**Never** run bare `firebase deploy`. After deploy, spot-check:
- https://rosemary-care-notebook.web.app
- https://focusspace-3d.web.app
- https://luna-dining-3d.web.app

### GitHub Pages (mirror)

Push to `main` → Actions publishes https://hawk327ml.github.io/focusspace-3d/

## Author

Hawk327ml · Multimedia Computing · UPM
