# Preparation Calendar

Projeto didatico para iniciantes absolutos em React.

Objetivo desta branch:
- reduzir complexidade
- focar em componentizacao e props
- deixar hooks para a proxima etapa

## O que existe agora

- Calendario estatico
- Estrutura em componentes pequenos
- Sem `useState`, `useEffect` e `useMemo` no fluxo principal

Estrutura principal:

```txt
src/
  App.jsx
  components/
    calendar/
      calendarData.js
      CalendarHeader.jsx
      CalendarCard.jsx
      WeekDaysRow.jsx
      CalendarGrid.jsx
      CalendarPage.jsx
```

## Como rodar

```bash
npm install
npm run dev
```

## Roteiro de aula (passo a passo)

Use o arquivo:

- `AULA_SETUP_VITE_CALENDARIO.md`

Ele foi escrito em formato de roteiro didatico, com trechos de codigo e explicacao de linha por linha (conceitos e aplicacao pratica).
