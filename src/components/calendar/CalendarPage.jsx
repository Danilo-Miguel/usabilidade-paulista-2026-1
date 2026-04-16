// Importa componentes menores que serao montados nesta pagina.
import CalendarCard from './CalendarCard'
import CalendarGrid from './CalendarGrid'
import CalendarHeader from './CalendarHeader'
import WeekDaysRow from './WeekDaysRow'
// Importa dados estaticos do calendario.
import {
  CALENDAR_CELLS,
  CALENDAR_MONTH_INDEX,
  CALENDAR_TITLE,
  CALENDAR_YEAR,
  WEEK_DAYS,
} from './calendarData'

// Componente que compoe a pagina completa do calendario.
function CalendarPage() {
  // Captura a data atual do navegador do usuario.
  const today = new Date()
  const currentDayOfMonth = today.getDate()
  const currentWeekDayIndex = today.getDay()
  const currentWeekDayLabel = WEEK_DAYS[today.getDay()]

  // So destaca o dia quando o mes/ano exibidos batem com a data atual.
  const isCurrentMonthView =
    today.getMonth() === CALENDAR_MONTH_INDEX && today.getFullYear() === CALENDAR_YEAR

  // Retorna a estrutura final combinando varios componentes.
  return (
    // Container principal da pagina.
    // Tailwind detalhado do container:
    // mx-auto -> centraliza horizontalmente.
    // flex -> layout flexivel.
    // min-h-screen -> altura minima da tela inteira.
    // w-full -> largura total disponivel.
    // max-w-5xl -> limita largura maxima para leitura confortavel.
    // flex-col -> organiza filhos em coluna.
    // gap-5 -> espaco vertical entre blocos.
    // px-4 -> padding horizontal de 1rem.
    // py-6 -> padding vertical de 1.5rem.
    // sm:px-6 -> em telas >= sm, padding horizontal vira 1.5rem.
    // sm:py-8 -> em telas >= sm, padding vertical vira 2rem.
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8">
      {/* Header recebe title via prop. */}
      <CalendarHeader title={CALENDAR_TITLE} />

      {/* CalendarCard usa children: os itens internos vao para dentro do card. */}
      <CalendarCard title="Calendario">
        {/* Linha de dias da semana recebe array via prop. */}
        <WeekDaysRow
          weekDays={WEEK_DAYS}
          todayWeekDayIndex={isCurrentMonthView ? currentWeekDayIndex : null}
        />
        {/* Mostra o dia atual e o dia da semana, sem persistencia. */}
        <p className="mt-3 text-sm text-ink/85" aria-live="polite">
          Hoje: {currentWeekDayLabel}, dia {currentDayOfMonth}
        </p>
        {/* Grade de dias recebe array de celulas via prop. */}
        <CalendarGrid
          cells={CALENDAR_CELLS}
          todayDayNumber={isCurrentMonthView ? currentDayOfMonth : null}
        />
      </CalendarCard>

      {/* Segundo card com objetivo didatico da etapa. */}
      <CalendarCard title="Objetivo da aula">
        {/* Tailwind do paragrafo:
            text-sm -> tamanho pequeno de leitura.
            text-ink/85 -> cor principal com 85% de opacidade para contraste suave. */}
        <p className="text-sm text-ink/85">
          Nesta primeira etapa, a turma pratica apenas componentizacao, props,
          children e key. Hooks entram na proxima evolucao.
        </p>
      </CalendarCard>
    </div>
  )
}

// Exporta a pagina para ser usada no App.
export default CalendarPage
