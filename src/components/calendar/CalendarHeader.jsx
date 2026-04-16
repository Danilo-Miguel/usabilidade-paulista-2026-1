// Componente de cabecalho que recebe titulo via props.
function CalendarHeader({ title }) {
  // Retorna a estrutura visual do topo da pagina.
  return (
    // Header semantico da pagina.
    // Tailwind detalhado:
    // rounded-2xl -> bordas bem arredondadas.
    // bg-ocean -> fundo com cor ocean do tema.
    // px-4 -> padding horizontal 1rem.
    // py-5 -> padding vertical 1.25rem.
    // text-sand -> cor base do texto em sand.
    // sm:px-6 -> em telas >= sm, padding horizontal passa para 1.5rem.
    <header className="rounded-2xl bg-ocean px-4 py-5 text-sand sm:px-6">
      {/* Texto auxiliar para contexto da aula. */}
      {/* Tailwind detalhado do paragrafo:
          font-heading -> usa fonte de titulo definida no tema.
          text-sm -> tamanho pequeno de texto.
          uppercase -> transforma texto em maiusculo.
          tracking-[0.22em] -> aumenta espacamento entre letras (letter-spacing custom).
          text-sun -> cor de destaque sun. */}
      <p className="font-heading text-sm uppercase tracking-[0.22em] text-sun">
        Projeto didatico React
      </p>
      {/* Exibe o titulo dinamico vindo da prop title. */}
      {/* Tailwind do titulo:
          mt-2 -> margem superior de 0.5rem.
          font-heading -> fonte de titulo.
          text-3xl -> tamanho grande para destaque. */}
      <h1 className="mt-2 font-heading text-3xl">{title}</h1>
      {/* Explicacao curta sobre o foco desta fase do projeto. */}
      {/* Tailwind do texto de apoio:
          mt-2 -> margem superior de 0.5rem.
          text-sm -> tamanho pequeno.
          text-sand/90 -> cor sand com 90% de opacidade para contraste suave. */}
      <p className="mt-2 text-sm text-sand/90">
        Exemplo inicial de componentizacao com props e children (sem hooks).
      </p>
    </header>
  )
}

// Exporta o componente para ser usado em CalendarPage.
export default CalendarHeader
