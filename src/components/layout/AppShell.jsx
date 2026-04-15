function AppShell({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-sand text-ink">
      <header className="bg-ocean px-4 pb-8 pt-7 text-sand sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="font-heading text-sm uppercase tracking-[0.28em] text-sun">
            Portal didatico React
          </p>
          <h1 className="mt-3 font-heading text-3xl leading-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-sand/90 sm:text-base">
            {subtitle}
          </p>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>

      <footer className="mx-auto w-full max-w-5xl px-4 pb-6 text-xs text-ink/70 sm:px-6">
        Exemplo educacional focado em React + Tailwind + acessibilidade.
      </footer>
    </div>
  )
}

export default AppShell
