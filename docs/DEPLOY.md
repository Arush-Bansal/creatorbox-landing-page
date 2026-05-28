# Deploy CreatorBox download page (Vercel)

Site: [creatorbox.arushnerdsout.com](https://creatorbox.arushnerdsout.com)

## 1. Vercel environment variables

In the Vercel project → **Settings** → **Environment Variables**, add for **Production** (and Preview if you want):

| Name | Value | Notes |
|------|--------|--------|
| `GITHUB_REPO` | `Arush-Bansal/creatorbox` | Must match the desktop repo |
| `GITHUB_TOKEN` | *(paste PAT)* | See below — **required for private repo** |

Redeploy after saving (Deployments → … → Redeploy). **Without this token, every download button sends people to a private GitHub page that shows “not found”.**

Check: https://creatorbox.arushnerdsout.com/api/releases/status — should show `"tokenConfigured": true` and a `tagName` like `v0.0.3`.

## 2. Create `GITHUB_TOKEN` (read-only is enough for the website)

1. GitHub → your profile **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens** → **Generate**.
2. Resource owner: your account. Repository access: **Only select** → `creatorbox`.
3. Permissions: **Contents** → Read-only, **Metadata** → Read-only.
4. Generate and copy the token once.
5. Paste into Vercel as `GITHUB_TOKEN`.

This token stays on the server only. It powers:

- Download buttons (`/download/windows`, etc.)
- Auto-update manifests (`/api/updates/latest.yml`, etc.) for the installed desktop app

Visitors and the app never need GitHub access or a token in the installer.

## 3. Create `GH_TOKEN` (desktop repo — for publishing releases)

Different secret, used only in GitHub Actions when building the app:

1. Fine-grained or classic PAT with **Contents: Read and write** on `Arush-Bansal/creatorbox`.
2. Repo **creatorbox** → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
3. Name: `GH_TOKEN`, value: the PAT.

Also add signing secrets from `docs/release.md` when you are ready for signed macOS/Windows builds.

## 4. Publish the first desktop release

In the **creatorbox** repo (local):

```bash
git tag v0.0.2
git push origin v0.0.2
```

Wait for the **Release** workflow to finish on GitHub Actions. Then open the site — version and downloads should update within ~5 minutes (cache).

## 5. Quick checks

- https://creatorbox.arushnerdsout.com — shows `v0.0.2` (or your tag) under the buttons.
- https://creatorbox.arushnerdsout.com/download/windows — starts a `.exe` download (after a release exists).
