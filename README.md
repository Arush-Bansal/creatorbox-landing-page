# CreatorBox download page

Marketing / download landing page for [CreatorBox](https://github.com/creatorbox/creatorbox), served at `creatorbox.arushnerdsout.com`.

## Stack

- Next.js (App Router)
- React Three Fiber + postprocessing (scroll-linked laptop scene)
- Lenis smooth scroll, Motion for section reveals
- Tailwind CSS v4 (CreatorBox brand tokens)

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## GitHub Releases & Vercel

The site fetches the latest release and serves downloads via `/download/windows`, `/download/mac`, `/download/linux` (works with a **private** repo when `GITHUB_TOKEN` is set on Vercel).

**Lazy deploy checklist:** see [docs/DEPLOY.md](docs/DEPLOY.md).

Desktop builds: [Arush-Bansal/creatorbox](https://github.com/Arush-Bansal/creatorbox). Tag with `git tag v* && git push origin v*`. See that repo’s `docs/release.md`.

## Build

```bash
npm run build
npm start
```

Assets (`creatorbox-logo.svg`, `creatorbox-nebula.jpg`) are copied from the desktop app repo for brand parity.
