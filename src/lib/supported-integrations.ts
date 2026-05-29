/**
 * Logo URLs match the CreatorBox desktop app:
 * - Plugins: src/renderer/plugins/PluginsApp.tsx (PLUGIN_ICON_URLS)
 * - API integrations: src/renderer/components/settings/settingsLayout.ts (API_INTEGRATION_BRANDS)
 * - Firecrawl: bundled CoCreator skill (creatorbox-firecrawl); favicon matches other API providers
 */
export type SupportedIntegration = {
  id: string
  name: string
  logoUrl: string
  category: 'plugin' | 'api' | 'research'
}

export const PLUGIN_ICON_URLS = {
  ffmpeg:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/FFmpeg_icon.svg/1280px-FFmpeg_icon.svg.png',
  remotion: 'https://raw.githubusercontent.com/remotion-dev/brand/main/logo-white.svg',
} as const

export const API_INTEGRATION_LOGO_URLS = {
  anthropic: 'https://www.anthropic.com/favicon.ico',
  fal: 'https://fal.ai/favicon.ico',
  elevenlabs: 'https://elevenlabs.io/favicon.ico',
  gemini:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/960px-Google_Gemini_icon_2025.svg.png',
} as const

/** Same pattern as API keys in Settings; used by the Firecrawl skill via FIRECRAWL_API_KEY */
export const FIRECRAWL_LOGO_URL = 'https://www.firecrawl.dev/favicon.ico'

export const SUPPORTED_INTEGRATIONS: readonly SupportedIntegration[] = [
  { id: 'ffmpeg', name: 'FFmpeg', logoUrl: PLUGIN_ICON_URLS.ffmpeg, category: 'plugin' },
  { id: 'remotion', name: 'Remotion', logoUrl: PLUGIN_ICON_URLS.remotion, category: 'plugin' },
  {
    id: 'anthropic',
    name: 'Anthropic',
    logoUrl: API_INTEGRATION_LOGO_URLS.anthropic,
    category: 'api',
  },
  { id: 'fal', name: 'Fal.ai', logoUrl: API_INTEGRATION_LOGO_URLS.fal, category: 'api' },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    logoUrl: API_INTEGRATION_LOGO_URLS.elevenlabs,
    category: 'api',
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    logoUrl: API_INTEGRATION_LOGO_URLS.gemini,
    category: 'api',
  },
  {
    id: 'firecrawl',
    name: 'Firecrawl',
    logoUrl: FIRECRAWL_LOGO_URL,
    category: 'research',
  },
] as const

export const SUPPORTED_INTEGRATION_COUNT = SUPPORTED_INTEGRATIONS.length
