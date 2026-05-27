import { githubApiHeaders, resolveReleaseAssetDownloadUrl } from '@/lib/github-api'
import { getGithubRepo, type GitHubRelease } from '@/lib/github-releases'

export async function fetchLatestReleaseRaw(): Promise<GitHubRelease | null> {
  const repo = getGithubRepo()
  const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
    headers: githubApiHeaders(),
    next: { revalidate: 300 },
  })
  if (response.status === 404) return null
  if (!response.ok) return null
  return (await response.json()) as GitHubRelease
}

export async function fetchReleaseAssetBytes(assetId: number): Promise<ArrayBuffer | null> {
  const signedUrl = await resolveReleaseAssetDownloadUrl(assetId)
  if (!signedUrl) return null

  const response = await fetch(signedUrl, { cache: 'no-store' })
  if (!response.ok) return null
  return response.arrayBuffer()
}

export async function fetchReleaseAssetText(assetId: number): Promise<string | null> {
  const bytes = await fetchReleaseAssetBytes(assetId)
  if (!bytes) return null
  return new TextDecoder().decode(bytes)
}
