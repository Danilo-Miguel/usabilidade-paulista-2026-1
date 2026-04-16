// Componente que desenha a grade de dias do mes.
// todayDayNumber recebe o numero do dia atual (1..31) para destaque visual.
function CalendarGrid({ cells, todayDayNumber = null }) {
  // cells chega por props como array de numeros e null.
  return (
    // Lista ordenada semantica para representar os dias do mes.
    // Tailwind detalhado da grade:
    // mt-3 -> margem superior de 0.75rem.
    // grid -> ativa CSS Grid.
    // grid-cols-7 -> 7 colunas para a semana.
    // gap-2 -> espaco entre celulas de 0.5rem.
    <ol className="mt-3 grid grid-cols-7 gap-2" aria-label="Dias do mes">
      {/* map percorre o array e cria uma celula para cada posicao. */}
      {cells.map((value, index) => {
        // Marca visual para destacar o dia atual sem usar persistencia.
        // So compara quando a celula tem numero (null e celula vazia).
        const isToday = value !== null && value === todayDayNumber

        return (
          <li
            // key unica da celula (aqui usamos indice por ser grade estatica de aula).
            key={`cell-${index}`}
            // Tailwind detalhado da celula:
            // flex -> ativa Flexbox na celula.
            // h-12 -> altura fixa de 3rem.
            // items-center -> centraliza no eixo vertical.
            // justify-center -> centraliza no eixo horizontal.
            // rounded-lg -> cantos arredondados.
            // border -> borda 1px.
            // text-sm -> texto pequeno.
            // estado "hoje": bg-ocean + text-white + font-semibold.
            // estado padrao: bg-white + text-ink + borda suave.
            className={`flex h-12 items-center justify-center rounded-lg border text-sm ${
              isToday
                ? 'border-ocean bg-ocean text-white font-semibold'
                : 'border-ocean/15 bg-white text-ink'
            }`}
            // aria-label melhora leitura por tecnologias assistivas.
            // Quando for o dia atual, inclui "(hoje)" no texto lido.
            aria-label={
              value
                ? isToday
                  ? `Dia ${value} (hoje)`
                  : `Dia ${value}`
                : 'Espaco vazio'
            }
          >
            {/* Mostra valor do dia ou vazio quando for null. */}
            {value ?? ''}
          </li>
        )
      })}
    </ol>
  )
}

// Exporta o componente para uso em CalendarPage.
export default CalendarGrid
