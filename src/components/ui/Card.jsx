function Card({ title, description, children, tone = 'default' }) {
  const toneClass =
    tone === 'highlight'
      ? 'border-sun/50 bg-sun/20'
      : 'border-ocean/15 bg-white'

  return (
    <section className={`rounded-2xl border p-4 shadow-soft sm:p-5 ${toneClass}`}>
      <h2 className="font-heading text-xl text-ocean">{title}</h2>
      {description ? <p className="mt-1 text-sm text-ink/80">{description}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default Card
