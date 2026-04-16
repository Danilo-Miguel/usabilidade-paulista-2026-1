// Componente que mostra os nomes dos dias da semana.
// todayWeekDayIndex recebe o indice atual (0..6) para destacar a coluna certa.
function WeekDaysRow({ weekDays, todayWeekDayIndex = null }) {
  // weekDays chega por props como array de strings.
  return (
    // Lista semantica em 7 colunas (uma para cada dia da semana).
    // Tailwind detalhado da lista:
    // grid -> ativa CSS Grid.
    // grid-cols-7 -> cria 7 colunas iguais.
    // gap-2 -> espaco de 0.5rem entre celulas.
    // text-center -> centraliza texto horizontalmente.
    <ul className="grid grid-cols-7 gap-2 text-center" aria-label="Dias da semana">
      {/* map transforma cada item do array em um elemento JSX. */}
      {weekDays.map((day, index) => {
        // Marca visual no cabecalho quando este dia e o dia da semana atual.
        const isTodayWeekDay = index === todayWeekDayIndex

        return (
          <li
            // key identifica cada item da lista para reconciliacao do React.
            key={day}
            // Tailwind detalhado de cada celula do dia:
            // rounded-lg -> borda arredondada media.
            // py-2 -> padding vertical de 0.5rem.
            // text-xs -> texto pequeno.
            // font-semibold -> peso semibold.
            // uppercase -> texto em maiusculas.
            // tracking-[0.1em] -> espacamento entre letras custom.
            // bg-ocean/text-white -> destaque visual para o dia da semana atual.
            // bg-sand/text-ocean -> estilo padrao para os demais dias.
            className={`rounded-lg py-2 text-xs font-semibold uppercase tracking-[0.1em] ${
              isTodayWeekDay ? 'bg-ocean text-white' : 'bg-sand text-ocean'
            }`}
            // aria-current informa tecnologias assistivas sobre o item atual da data.
            aria-current={isTodayWeekDay ? 'date' : undefined}
          >
            {/* Conteudo textual do dia da semana. */}
            {day}
          </li>
        )
      })}
    </ul>
  )
}

// Exporta o componente para uso em CalendarPage.
export default WeekDaysRow
