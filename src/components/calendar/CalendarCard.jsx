// Componente de card reutilizavel com title (prop) e children.
function CalendarCard({ title, children }) {
  // Estrutura visual padrao para blocos de conteudo.
  return (
    // Section semantica para agrupar o card.
    // Tailwind detalhado:
    // rounded-2xl -> bordas arredondadas grandes.
    // border -> habilita borda 1px.
    // border-ocean/20 -> borda com cor ocean e 20% de opacidade.
    // bg-white -> fundo branco.
    // p-4 -> padding interno de 1rem.
    // shadow-soft -> sombra custom definida no tailwind.config.js.
    // sm:p-5 -> em telas >= sm, padding vira 1.25rem.
    <section className="rounded-2xl border border-ocean/20 bg-white p-4 shadow-soft sm:p-5">
      {/* Titulo recebido via prop. */}
      {/* Tailwind do titulo:
          font-heading -> fonte de titulo.
          text-xl -> tamanho de texto extra grande.
          text-ocean -> cor principal ocean. */}
      <h2 className="font-heading text-xl text-ocean">{title}</h2>
      {/* Children: conteudo interno injetado por quem usa o componente. */}
      {/* Tailwind do container interno:
          mt-4 -> separa o corpo do card do titulo com margem superior de 1rem. */}
      <div className="mt-4">{children}</div>
    </section>
  )
}

// Exporta o componente para reutilizacao.
export default CalendarCard
