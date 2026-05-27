# CreatorBox download page

Marketing / download landing page for [CreatorBox](https://github.com/creatorbox/creatorbox) — served at `creatorbox.arushnerdsout.com`.

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

## GitHub Releases

Download URLs are dummy placeholders in `src/lib/github-releases.ts` (`creatorbox/creatorbox`). Update `GITHUB_REPO` when the repo is public.

## Build

```bash
npm run build
npm start
```

Assets (`creatorbox-logo.svg`, `creatorbox-nebula.jpg`) are copied from the desktop app repo for brand parity.
