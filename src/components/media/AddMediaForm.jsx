import Card from '../ui/Card'
import FormField from '../ui/FormField'

function AddMediaForm({ form, onChange, onSubmit, message }) {
  const showAltTextField = form.type === 'image'

  return (
    <Card
      title="Adicionar conteudo"
      description="Aceita URL de imagem ou video para praticar estados e eventos."
    >
      <form className="grid gap-4" onSubmit={onSubmit}>
        <FormField
          id="title"
          label="Titulo"
          value={form.title}
          onChange={onChange}
          placeholder="Ex.: Tutorial de contraste"
          required
        />

        <div className="flex flex-col gap-2">
          <label htmlFor="type" className="text-sm font-semibold text-ocean">
            Tipo de midia
          </label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={onChange}
            className="rounded-xl border border-ocean/30 bg-white px-3 py-2 text-sm text-ink outline-none transition focus-visible:ring-4 focus-visible:ring-sun/60"
          >
            <option value="image">Imagem</option>
            <option value="video">Video</option>
          </select>
        </div>

        <FormField
          id="url"
          label={form.type === 'video' ? 'URL do YouTube' : 'URL da imagem'}
          type="url"
          value={form.url}
          onChange={onChange}
          placeholder={
            form.type === 'video'
              ? 'https://www.youtube.com/watch?v=...'
              : 'https://exemplo.com/imagem.jpg'
          }
          helpText={
            form.type === 'video'
              ? 'Cole a URL normal do YouTube (youtu.be ou youtube.com/watch).'
              : 'Use link direto do arquivo (.jpg, .png, .webp). No Pixabay, prefira links em cdn.pixabay.com.'
          }
          required
        />

        <FormField
          id="description"
          label="Descricao resumida"
          value={form.description}
          onChange={onChange}
          placeholder="Conteudo pedagogico em ate 120 caracteres"
          required
        />

        {showAltTextField ? (
          <FormField
            id="altText"
            label="Texto alternativo (obrigatorio para imagem)"
            value={form.altText}
            onChange={onChange}
            placeholder="Pessoa apresentando slide sobre usabilidade"
            required
          />
        ) : null}

        <button
          type="submit"
          className="rounded-xl bg-teal px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:ring-4 focus-visible:ring-sun/60"
        >
          Salvar midia
        </button>

        <p className="text-sm text-ink" role="status" aria-live="polite">
          {message}
        </p>
      </form>
    </Card>
  )
}

export default AddMediaForm
