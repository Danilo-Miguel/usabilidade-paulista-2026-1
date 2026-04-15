const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif']

export function isLikelyDirectImageUrl(url) {
  try {
    const parsed = new URL(url)
    const pathname = parsed.pathname.toLowerCase()

    return IMAGE_EXTENSIONS.some((extension) => pathname.endsWith(extension))
  } catch {
    return false
  }
}

export function isPixabayPageUrl(url) {
  try {
    const parsed = new URL(url)

    return (
      parsed.hostname.includes('pixabay.com')
      && (parsed.pathname.startsWith('/photos/') || parsed.pathname.startsWith('/illustrations/'))
    )
  } catch {
    return false
  }
}
