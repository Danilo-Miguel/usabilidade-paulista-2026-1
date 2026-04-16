// Titulo exibido no cabecalho do calendario.
export const CALENDAR_TITLE = 'Abril de 2026'

// Mes/ano da grade exibida (mes usa padrao JS: 0 = janeiro, 3 = abril).
export const CALENDAR_MONTH_INDEX = 3
export const CALENDAR_YEAR = 2026

// Dias da semana usados para montar a primeira linha da grade.
export const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

// Grade de calendario fixa para ensino inicial (sem hooks e sem logica de data).
// null representa celula vazia antes do primeiro dia do mes.
// Cada posicao do array vira uma celula no componente CalendarGrid.
export const CALENDAR_CELLS = [
  // Primeira semana (com espacos vazios antes do dia 1).
  null, null, null, 1, 2, 3, 4,
  // Segunda semana.
  5, 6, 7, 8, 9, 10, 11,
  // Terceira semana.
  12, 13, 14, 15, 16, 17, 18,
  // Quarta semana.
  19, 20, 21, 22, 23, 24, 25,
  // Quinta semana (com espacos vazios no final).
  26, 27, 28, 29, 30, null, null,
]
