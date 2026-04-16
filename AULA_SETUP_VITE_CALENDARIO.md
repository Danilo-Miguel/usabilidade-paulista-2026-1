# Aula Setup Vite + Calendario (Guia Didatico Linha por Linha)

## Objetivo do documento

Este arquivo foi feito para aula com iniciantes absolutos.
A ideia e explicar:

- como nasce um projeto React com Vite
- como o app renderiza na tela (root)
- como dividir em componentes
- como usar props, children e key
- como ler e explicar cada linha de codigo sem pressa

---

## Sessao 1 - Criacao do projeto (terminal)

### Comandos

```bash
npm create vite@latest meu-calendario -- --template react
cd meu-calendario
npm install
npm run dev
```

### Explicacao didatica por linha

#### Linha 1
`npm create vite@latest meu-calendario -- --template react`

- O que faz: cria o projeto.
- Conceito aplicado: scaffold (estrutura inicial automatica).
- Por que Vite: inicializacao e build mais rapidos que abordagens antigas.

#### Linha 2
`cd meu-calendario`

- O que faz: entra na pasta do projeto.
- Conceito aplicado: contexto de trabalho no terminal.

#### Linha 3
`npm install`

- O que faz: instala dependencias do projeto.
- Conceito aplicado: gerenciamento de pacotes (Node + npm).
- Observacao importante para iniciantes: esse comando nao instala "qualquer coisa".
  Ele le o arquivo `package.json` e instala exatamente as bibliotecas listadas nele.

#### Linha 4
`npm run dev`

- O que faz: abre servidor de desenvolvimento.
- Conceito aplicado: ciclo de desenvolvimento local com hot reload.

## Sessao 1.1 - Todas as libs deste projeto para instalar

Se voce quiser reproduzir exatamente este projeto, use os comandos abaixo.
Eles instalam todas as bibliotecas que hoje existem no `package.json`.

### 1) Bibliotecas de producao

```bash
npm install react react-dom
```

### 2) Bibliotecas de desenvolvimento

```bash
npm install -D vite @vitejs/plugin-react eslint @eslint/js eslint-plugin-react-hooks eslint-plugin-react-refresh globals @types/react @types/react-dom tailwindcss postcss autoprefixer
```

### Quando usar essa sessao

- Use esta sessao quando quiser montar o projeto manualmente e garantir o mesmo conjunto de libs.
- Se o projeto ja foi criado com Vite e o `package.json` ja esta pronto, normalmente basta rodar `npm install`.

### O que foi instalado no projeto (lista real)

Quando voce executa `npm install`, o npm instala tudo que esta no `package.json`.
No nosso projeto, ficou assim:

#### Dependencias de producao (`dependencies`)

- `react` -> biblioteca principal para criar componentes e interface.
- `react-dom` -> faz a ponte do React com o DOM do navegador.

#### Dependencias de desenvolvimento (`devDependencies`)

- `vite` -> servidor de desenvolvimento e ferramenta de build.
- `@vitejs/plugin-react` -> plugin que habilita React no Vite.
- `tailwindcss` -> framework utilitario de CSS.
- `postcss` -> processador de CSS usado pelo Tailwind.
- `autoprefixer` -> adiciona prefixos CSS para compatibilidade entre navegadores.
- `eslint` -> analisador de codigo para padrao/qualidade.
- `@eslint/js` -> configuracoes base do ESLint para JavaScript.
- `eslint-plugin-react-hooks` -> regras de qualidade para hooks do React.
- `eslint-plugin-react-refresh` -> suporte de lint para React Fast Refresh.
- `globals` -> lista de variaveis globais para configuracao de lint.
- `@types/react` -> tipagens de apoio para ferramentas/editor.
- `@types/react-dom` -> tipagens de apoio para ferramentas/editor.

### Estrutura criada apos o scaffold do Vite

Estrutura minima que costuma nascer com `npm create vite@latest ... --template react`:

```text
meu-calendario/
  index.html
  package.json
  package-lock.json
  vite.config.js
  eslint.config.js
  public/
  src/
    main.jsx
    App.jsx
    index.css
    assets/
```

  Observacao importante para aula:

  - `src/assets/` normalmente ja vem no template React do Vite.
  - `src/components/` e `src/components/calendar/` NAO vem no template.
  - Essas duas pastas foram criadas por nos durante a organizacao didatica.

  ### Comandos para criar as pastas da aula

  No terminal, dentro da pasta do projeto:

  ```bash
  mkdir src/components
  mkdir src/components/calendar
  ```

  Opcao em um comando so (PowerShell):

  ```bash
  mkdir src/components, src/components/calendar
  ```

### Estrutura apos organizacao didatica desta aula

Depois da componentizacao do calendario, a parte principal do `src/` ficou assim:

```text
src/
  main.jsx
  App.jsx
  index.css
  assets/
  components/
    calendar/
      calendarData.js
      CalendarHeader.jsx
      CalendarCard.jsx
      WeekDaysRow.jsx
      CalendarGrid.jsx
      CalendarPage.jsx
```

Resumo para falar em sala:

- Vite cria a base do projeto.
- `npm install` baixa as bibliotecas definidas no `package.json`.
- Nos organizamos o `src/` em componentes pequenos para facilitar ensino e manutencao.

---

## Sessao 2 - Root e ponto de entrada

Arquivo: src/main.jsx

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### Explicacao linha por linha

#### Linha 1
`import { StrictMode } from 'react'`

- O que e: ferramenta de desenvolvimento do React.
- Conceito: boas praticas e alertas para detectar problemas cedo.

#### Linha 2
`import { createRoot } from 'react-dom/client'`

- O que e: API para montar app React no DOM.
- Conceito: ponte React -> HTML real.

#### Linha 3
`import './index.css'`

- O que e: estilo global.
- Conceito: modulo de estilo aplicado no inicio da app.

#### Linha 4
`import App from './App.jsx'`

- O que e: componente principal.
- Conceito: composicao por componente raiz.

#### Linha 6
`createRoot(document.getElementById('root')).render(`

- O que e: cria root React no elemento HTML com id root.
- Conceito: root (ponto de montagem da aplicacao).

#### Linhas 7 a 9
`<StrictMode> <App /> </StrictMode>`

- O que e: renderiza o componente App dentro do StrictMode.
- Conceito: arvore de componentes React.

---

## Sessao 3 - App minimo e intencional

Arquivo: src/App.jsx

```jsx
import CalendarPage from './components/calendar/CalendarPage'

function App() {
  return <CalendarPage />
}

export default App
```

### Explicacao linha por linha

#### Linha 1
`import CalendarPage from './components/calendar/CalendarPage'`

- O que e: importa componente de pagina.
- Conceito: separacao de responsabilidade.

#### Linhas 3 a 5
`function App() { return <CalendarPage /> }`

- O que e: componente App extremamente enxuto.
- Conceito: componente orquestrador simples.

#### Linha 7
`export default App`

- O que e: torna App exportacao padrao.
- Conceito: modularizacao ES Modules.

---

## Sessao 4 - Dados separados da interface

Arquivo: src/components/calendar/calendarData.js

```js
export const CALENDAR_TITLE = 'Abril de 2026'

export const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

export const CALENDAR_CELLS = [
  null, null, null, 1, 2, 3, 4,
  5, 6, 7, 8, 9, 10, 11,
  12, 13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23, 24, 25,
  26, 27, 28, 29, 30, null, null,
]
```

### Explicacao didatica

- `CALENDAR_TITLE`: texto do cabecalho.
- `WEEK_DAYS`: nomes dos dias da semana.
- `CALENDAR_CELLS`: grade fixa do mes.
- Conceito principal: separar dados de apresentacao.

---

## Sessao 5 - Componente de cabecalho (props)

Arquivo: src/components/calendar/CalendarHeader.jsx

```jsx
function CalendarHeader({ title }) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  )
}

export default CalendarHeader
```

### Explicacao linha por linha

#### Linha 1
`function CalendarHeader({ title })`

- O que e: componente com desestruturacao de props.
- Conceito: props (entrada de dados do componente).

#### Linha 4
`<h1>{title}</h1>`

- O que e: renderizacao dinamica de valor.
- Conceito: interpolacao JSX.

---

## Sessao 6 - Componente container (children)

Arquivo: src/components/calendar/CalendarCard.jsx

```jsx
function CalendarCard({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  )
}

export default CalendarCard
```

### Explicacao linha por linha

#### Linha 1
`function CalendarCard({ title, children })`

- O que e: componente com props e children.
- Conceito: children = conteudo interno da tag.

#### Linha 5
`<div>{children}</div>`

- O que e: ponto onde o conteudo interno sera encaixado.
- Conceito: composicao flexivel.

Exemplo mental:

```jsx
<CalendarCard title="Calendario">
  <p>Conteudo interno</p>
</CalendarCard>
```

Nesse caso, `<p>Conteudo interno</p>` chega como children.

---

## Sessao 7 - Linha de dias da semana (map + key)

Arquivo: src/components/calendar/WeekDaysRow.jsx

```jsx
function WeekDaysRow({ weekDays }) {
  return (
    <ul>
      {weekDays.map((day) => (
        <li key={day}>{day}</li>
      ))}
    </ul>
  )
}

export default WeekDaysRow
```

### Explicacao linha por linha

#### Linha 1
`function WeekDaysRow({ weekDays })`

- O que e: recebe array por props.
- Conceito: dados sobem no pai, descem por props.

#### Linha 4
`weekDays.map((day) => ...)`

- O que e: transforma array em elementos JSX.
- Conceito: renderizacao de lista.

#### Linha 5
`<li key={day}>{day}</li>`

- O que e: item da lista com key unica.
- Conceito: key (identidade de cada item para reconciliacao React).

---

## Sessao 8 - Grade do calendario (map + key com indice)

Arquivo: src/components/calendar/CalendarGrid.jsx

```jsx
function CalendarGrid({ cells }) {
  return (
    <ol>
      {cells.map((value, index) => (
        <li key={`cell-${index}`}>
          {value ?? ''}
        </li>
      ))}
    </ol>
  )
}

export default CalendarGrid
```

### Explicacao linha por linha

#### Linha 1
`function CalendarGrid({ cells })`

- O que e: recebe grade por props.
- Conceito: componente de apresentacao puro.

#### Linha 4
`cells.map((value, index) => ...)`

- O que e: percorre cada celula da grade.
- Conceito: renderizacao orientada a dados.

#### Linha 5
`key={`cell-${index}`}`

- O que e: key baseada em indice.
- Conceito: key obrigatoria em listas.
- Observacao didatica: aqui pode usar indice porque grade e estatica para aula inicial.

#### Linha 6
`{value ?? ''}`

- O que e: mostra valor ou vazio.
- Conceito: operador de coalescencia nula para fallback.

---

## Sessao 9 - Montando a pagina com composicao

Arquivo: src/components/calendar/CalendarPage.jsx

```jsx
import CalendarCard from './CalendarCard'
import CalendarGrid from './CalendarGrid'
import CalendarHeader from './CalendarHeader'
import WeekDaysRow from './WeekDaysRow'
import { CALENDAR_CELLS, CALENDAR_TITLE, WEEK_DAYS } from './calendarData'

function CalendarPage() {
  return (
    <div>
      <CalendarHeader title={CALENDAR_TITLE} />

      <CalendarCard title="Calendario">
        <WeekDaysRow weekDays={WEEK_DAYS} />
        <CalendarGrid cells={CALENDAR_CELLS} />
      </CalendarCard>

      <CalendarCard title="Objetivo da aula">
        <p>
          Nesta etapa, praticamos componentizacao, props, children e key.
        </p>
      </CalendarCard>
    </div>
  )
}

export default CalendarPage
```

### Explicacao didatica por bloco

#### Imports

- Cada import puxa um bloco reutilizavel.
- Conceito: arquitetura por composicao.

#### `<CalendarHeader title={CALENDAR_TITLE} />`

- Conceito: props simples (string).

#### `<CalendarCard title="Calendario"> ... </CalendarCard>`

- Conceito: children em uso real.
- Dentro do card entram dois componentes filhos.

#### `<WeekDaysRow weekDays={WEEK_DAYS} />`

- Conceito: props com array.

#### `<CalendarGrid cells={CALENDAR_CELLS} />`

- Conceito: props com estrutura de dados para lista.

---

## Sessao 9.1 - Mostrar hoje (dia e dia da semana)

Objetivo desta melhoria:

- mostrar o texto "Hoje: Qua, dia 15" (exemplo)
- destacar o numero do dia atual na grade
- destacar tambem o dia da semana atual no cabecalho
- sem persistencia e sem salvar nada no navegador

### 1) Capturar data atual em `CalendarPage`

Arquivo: `src/components/calendar/CalendarPage.jsx`

```jsx
const today = new Date()
const currentDayOfMonth = today.getDate()
const currentWeekDayIndex = today.getDay()
const currentWeekDayLabel = WEEK_DAYS[today.getDay()]
```

Explicacao:

- `new Date()` pega data/hora atual do navegador.
- `getDate()` retorna dia do mes (1 a 31).
- `getDay()` retorna indice do dia da semana (0=Dom ... 6=Sab).
- usamos esse indice para pegar o texto em `WEEK_DAYS`.

### 2) Destacar so quando mes/ano baterem

```jsx
const isCurrentMonthView =
  today.getMonth() === CALENDAR_MONTH_INDEX &&
  today.getFullYear() === CALENDAR_YEAR
```

Explicacao:

- evita destacar "hoje" quando a grade exibida for de outro mes/ano.
- assim a regra fica correta para evolucoes futuras.

### 3) Passar props para cabecalho e grade

```jsx
<WeekDaysRow
  weekDays={WEEK_DAYS}
  todayWeekDayIndex={isCurrentMonthView ? currentWeekDayIndex : null}
/>

<CalendarGrid
  cells={CALENDAR_CELLS}
  todayDayNumber={isCurrentMonthView ? currentDayOfMonth : null}
/>
```

Explicacao:

- `todayWeekDayIndex` marca o dia da semana atual no cabecalho.
- `todayDayNumber` marca o dia numerico atual na grade.
- quando nao for mes atual, enviamos `null` para nao destacar nada.

### 4) Mostrar texto didatico de "hoje"

```jsx
<p className="mt-3 text-sm text-ink/85" aria-live="polite">
  Hoje: {currentWeekDayLabel}, dia {currentDayOfMonth}
</p>
```

Explicacao:

- ajuda o aluno a confirmar visualmente o calculo de data.
- `aria-live="polite"` melhora anuncio para leitores de tela.

### 5) Logica no `WeekDaysRow` (cabecalho)

Arquivo: `src/components/calendar/WeekDaysRow.jsx`

```jsx
const isTodayWeekDay = index === todayWeekDayIndex
```

Explicacao:

- compara o indice da coluna com o indice do dia atual.
- quando der `true`, aplica classe de destaque.

### 6) Logica no `CalendarGrid` (numero do dia)

Arquivo: `src/components/calendar/CalendarGrid.jsx`

```jsx
const isToday = value !== null && value === todayDayNumber
```

Explicacao:

- ignora celulas vazias (`null`).
- destaca somente a celula com numero igual ao dia atual.

---

## Sessao 10 - Conceitos que voce deve falar em voz alta

### 1) Root

"Root e onde o React desenha tudo no HTML."

### 2) Componente

"Componente e funcao que retorna interface (JSX)."

### 3) Props

"Props sao parametros do componente."

### 4) Children

"Children e o conteudo entre abrir e fechar a tag do componente."

### 5) Key

"Key e identidade unica para lista renderizada com map."

### 6) Sem hooks nesta fase

"Nesta primeira versao nao usamos hooks para reduzir carga cognitiva."

---

## Sessao 11 - Como conduzir em sala (roteiro rapido)

1. Rodar projeto com `npm run dev`.
2. Mostrar `main.jsx` (root).
3. Mostrar `App.jsx` (simples e curto).
4. Mostrar `CalendarPage` (composicao).
5. Mostrar `CalendarCard` (children).
6. Mostrar `WeekDaysRow` e `CalendarGrid` (map + key).
7. Fechar com recapitulacao dos conceitos.

---

## Sessao 12 - Evolucao futura (aula 2)

Quando a turma estiver pronta, voce pode introduzir hooks para:

- trocar mes atual
- navegar mes anterior/proximo
- destacar dia atual
- filtrar eventos

Nesta branch, isso foi propositalmente adiado para manter didatica de iniciantes.

Fim.
