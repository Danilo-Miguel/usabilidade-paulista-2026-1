/**
 * Converte qualquer URL do YouTube em URL de embed.
 *
 * Formatos aceitos:
 *   https://www.youtube.com/watch?v=VIDEO_ID
 *   https://youtu.be/VIDEO_ID
 *   https://www.youtube.com/embed/VIDEO_ID  (ja esta no formato certo)
 *
 * Retorna null se a URL nao for do YouTube.
 */
export function toYouTubeEmbedUrl(url) {
  try {
    const parsed = new URL(url)

    // Formato: youtube.com/watch?v=...
    if (parsed.hostname.includes('youtube.com') && parsed.searchParams.has('v')) {
      const videoId = parsed.searchParams.get('v')
      return `https://www.youtube.com/embed/${videoId}`
    }

    // Formato: youtu.be/VIDEO_ID
    if (parsed.hostname === 'youtu.be') {
      const videoId = parsed.pathname.slice(1)
      return `https://www.youtube.com/embed/${videoId}`
    }

    // Formato: youtube.com/embed/VIDEO_ID
    if (parsed.hostname.includes('youtube.com') && parsed.pathname.startsWith('/embed/')) {
      return url
    }

    return null
  } catch {
    return null
  }
}
