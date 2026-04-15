import Card from '../ui/Card'
import { toYouTubeEmbedUrl } from '../../utils/youtube'
import { useState } from 'react'

function MediaGallery({
  items,
  onRemove,
  isReaderModeEnabled,
  onReadItem,
  onStopReading,
  currentlyReadingMediaId,
}) {
  const [brokenImageIds, setBrokenImageIds] = useState([])

  function handleImageError(itemId) {
    setBrokenImageIds((previousIds) =>
      previousIds.includes(itemId) ? previousIds : [...previousIds, itemId],
    )
  }

  return (
    <Card
      title="Biblioteca pessoal"
      description="As keys no map garantem renderizacao previsivel de cada card."
    >
      {items.length === 0 ? (
        <p className="rounded-xl bg-sand p-3 text-sm text-ink/80">
          Nenhuma midia adicionada ainda. Comece pelo formulario acima.
        </p>
      ) : (
        <ul className="grid gap-4">
          {items.map((item) => (
            <li key={item.id} className="rounded-xl border border-ocean/20 bg-white p-4">
              <article className="grid gap-3">
                <header className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-heading text-lg text-ocean">{item.title}</h3>
                    <p className="text-xs uppercase tracking-[0.15em] text-ink/65">
                      {item.type === 'image' ? 'Imagem' : 'Video'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="rounded-lg border border-coral px-3 py-1 text-xs font-semibold text-coral transition hover:bg-coral/10 focus-visible:ring-4 focus-visible:ring-sun/60"
                  >
                    Remover
                  </button>
                </header>

                {item.type === 'image' ? (
                  brokenImageIds.includes(item.id) ? (
                    <div className="rounded-lg border border-coral/40 bg-coral/10 p-3 text-sm text-ink">
                      Falha ao carregar imagem. Verifique se a URL e direta para o arquivo da imagem.
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.altText}
                      className="h-48 w-full rounded-lg object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(item.id)}
                    />
                  )
                ) : (
                  <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src={toYouTubeEmbedUrl(item.url)}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                )}

                <p className="text-sm text-ink">{item.description}</p>

                {isReaderModeEnabled ? (
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onReadItem(item)}
                      className="rounded-lg border border-ocean/40 px-3 py-1 text-xs font-semibold text-ocean transition hover:bg-ocean/10 focus-visible:ring-4 focus-visible:ring-sun/60"
                    >
                      Ler descricao
                    </button>

                    {currentlyReadingMediaId === item.id ? (
                      <button
                        type="button"
                        onClick={onStopReading}
                        className="rounded-lg border border-coral px-3 py-1 text-xs font-semibold text-coral transition hover:bg-coral/10 focus-visible:ring-4 focus-visible:ring-sun/60"
                      >
                        Parar leitura
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

export default MediaGallery
