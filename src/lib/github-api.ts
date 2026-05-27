import { getGithubRepo } from '@/lib/github-releases'

export function getGithubToken(): string | undefined {
  return process.env.GITHUB_TOKEN?.trim() || undefined
}

export function githubApiHeaders(accept = 'application/vnd.github+json'): HeadersInit {
  const token = getGithubToken()
  const headers: Record<string, string> = {
    Accept: accept,
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

/**
 * Resolves a short-lived CDN URL for a private-release asset.
 * GitHub returns 302 to objects.githubusercontent.com; the browser can download without repo access.
 */
export async function resolveReleaseAssetDownloadUrl(
  assetId: number,
  repo = getGithubRepo(),
): Promise<string | null> {
  const url = `https://api.github.com/repos/${repo}/releases/assets/${assetId}`
  const response = await fetch(url, {
    headers: githubApiHeaders('application/octet-stream'),
    redirect: 'manual',
    cache: 'no-store',
  })

  if (response.status === 302 || response.status === 307) {
    return response.headers.get('location')
  }

  if (!response.ok) {
    console.warn(`[releases] asset ${assetId} redirect failed: ${response.status}`)
  }

  return null
}
