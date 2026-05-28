import { getGithubToken, githubApiHeaders, resolveReleaseAssetDownloadUrl } from '@/lib/github-api'
import { getGithubRepo, type GitHubRelease } from '@/lib/github-releases'

export type ReleaseFetchError =
  | 'missing_token'
  | 'unauthorized'
  | 'not_found'
  | 'http_error'

export type ReleaseFetchMeta = {
  release: GitHubRelease | null
  error: ReleaseFetchError | null
  httpStatus?: number
}

async function githubGet(url: string): Promise<Response> {
  return fetch(url, {
    headers: githubApiHeaders(),
    cache: 'no-store',
  })
}

function pickNewestRelease(releases: GitHubRelease[]): GitHubRelease | null {
  const published = releases.filter((entry) => !entry.draft)
  const pool = published.length > 0 ? published : releases
  return pool[0] ?? null
}

export async function fetchLatestReleaseWithMeta(): Promise<ReleaseFetchMeta> {
  const repo = getGithubRepo()

  if (!getGithubToken()) {
    return { release: null, error: 'missing_token' }
  }

  const latestResponse = await githubGet(`https://api.github.com/repos/${repo}/releases/latest`)

  if (latestResponse.status === 401) {
    return { release: null, error: 'unauthorized', httpStatus: 401 }
  }

  if (latestResponse.ok) {
    return { release: (await latestResponse.json()) as GitHubRelease, error: null }
  }

  if (latestResponse.status !== 404) {
    return { release: null, error: 'http_error', httpStatus: latestResponse.status }
  }

  const listResponse = await githubGet(
    `https://api.github.com/repos/${repo}/releases?per_page=15`,
  )

  if (listResponse.status === 401) {
    return { release: null, error: 'unauthorized', httpStatus: 401 }
  }

  if (!listResponse.ok) {
    return { release: null, error: 'http_error', httpStatus: listResponse.status }
  }

  const releases = (await listResponse.json()) as GitHubRelease[]
  const release = pickNewestRelease(releases)

  if (!release) {
    return { release: null, error: 'not_found', httpStatus: 404 }
  }

  return { release, error: null }
}

export async function fetchLatestReleaseRaw(): Promise<GitHubRelease | null> {
  const { release } = await fetchLatestReleaseWithMeta()
  return release
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
