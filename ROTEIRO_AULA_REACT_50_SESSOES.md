# Roteiro de Aula React em 50 Sessoes (Login -> Dashboard)

## Objetivo deste arquivo

Este roteiro foi escrito para voce dar aula de forma didatica, em passos curtos, com fala guiada, como se explicasse para iniciantes absolutos.

Importante:
- Nao precisa alterar o projeto atual para usar este roteiro.
- A ordem didatica aqui comeca pela tela de login.
- Depois evolui para dashboard e galeria.
- Cada sessao tem: objetivo, acao, fala sugerida.

---

## Mapa rapido do projeto atual (para voce se localizar)

Arquivos principais:
- `src/main.jsx`: ponto de entrada (root)
- `src/App.jsx`: orquestrador de estado e fluxo
- `src/components/layout/AppShell.jsx`: casca visual (header/main/footer)
- `src/components/auth/AuthPanel.jsx`: formulario de login/cadastro
- `src/components/ui/FormField.jsx`: campo de formulario reutilizavel
- `src/components/ui/Card.jsx`: container reutilizavel com `children`
- `src/components/media/AddMediaForm.jsx`: formulario de cadastro de midia
- `src/components/media/MediaGallery.jsx`: listagem de midias com `map` e `key`

Conceitos que ja estao no projeto:
- Componentizacao
- Props
- Children
- Hooks (`useState`, `useEffect`, `useMemo`)
- Renderizacao condicional
- Lista com `map` + `key`
- Acessibilidade basica (`label`, `aria-live`, foco visivel)

---

## Como conduzir a aula

Formato sugerido:
1. Abra o arquivo do passo.
2. Leia o objetivo em voz alta.
3. Mostre o codigo relacionado.
4. Fale o "por que" antes do "como".
5. So depois execute e demonstre.

Tempo medio por sessao:
- 3 a 6 minutos

Tempo total:
- 2 aulas longas ou 3 aulas medias

---

## Sessao 01 - O que vamos construir

Objetivo:
- Dar contexto do produto final.

Acao:
- Mostrar a aplicacao pronta rapidamente (sem explicar codigo ainda).

Fala sugerida:
- "Hoje vamos construir um portal com login simples e biblioteca de imagens e videos."
- "Primeiro vamos montar login. Depois evoluimos para dashboard."

---

## Sessao 02 - O que e React

Objetivo:
- Definir React em linguagem simples.

Acao:
- Explicar: React = biblioteca para criar interface com componentes.

Fala sugerida:
- "React e como montar uma casa com blocos reutilizaveis."

---

## Sessao 03 - O que e componente

Objetivo:
- Introduzir componente como funcao que retorna JSX.

Acao:
- Mostrar `AuthPanel`, `FormField`, `Card`.

Fala sugerida:
- "Cada componente tem uma responsabilidade unica."

---

## Sessao 04 - O que e root

Objetivo:
- Explicar inicio da aplicacao.

Acao:
- Abrir `src/main.jsx`.

Fala sugerida:
- "Aqui esta a raiz da aplicacao. O React injeta tudo dentro da div root do HTML."
- "`createRoot(...).render(<App />)` significa: renderize o componente principal na raiz."

---

## Sessao 05 - StrictMode

Objetivo:
- Explicar por que `StrictMode` existe.

Acao:
- Mostrar `StrictMode` em `main.jsx`.

Fala sugerida:
- "StrictMode ajuda a detectar problemas de desenvolvimento."

---

## Sessao 06 - Estrategia didatica da aula

Objetivo:
- Deixar claro que vamos por camadas.

Acao:
- Escrever no quadro: Layout -> Login -> Validacao -> Dashboard.

Fala sugerida:
- "A gente nao comeca pelo mais complexo. Comeca pelo fluxo minimo."

---

## Sessao 07 - Primeiro bloco visual: AppShell

Objetivo:
- Entender componente estrutural.

Acao:
- Abrir `AppShell.jsx`.

Fala sugerida:
- "Esse componente nao decide regra de negocio. Ele so organiza a pagina."

---

## Sessao 08 - Children na pratica (parte 1)

Objetivo:
- Definir `children`.

Acao:
- Mostrar `children` em `AppShell`.

Fala sugerida:
- "`children` e o conteudo que voce coloca entre a abertura e fechamento do componente."
- "E como uma caixa que recebe qualquer conteudo dentro."

---

## Sessao 09 - Children na pratica (parte 2)

Objetivo:
- Reforcar reutilizacao.

Acao:
- Mostrar `children` em `Card.jsx`.

Fala sugerida:
- "Com `Card`, eu reutilizo o mesmo visual para varios conteudos diferentes."

---

## Sessao 10 - Props: conceito basico

Objetivo:
- Explicar props como parametros.

Acao:
- Mostrar props `title`, `description`, `tone` em `Card`.

Fala sugerida:
- "Props sao entradas do componente. Igual argumento de funcao."

---

## Sessao 11 - Primeira tela funcional: Login

Objetivo:
- Entrar no fluxo principal da aula.

Acao:
- Abrir `AuthPanel.jsx` e destacar campos.

Fala sugerida:
- "Agora vamos focar no login. O resto vem depois."

---

## Sessao 12 - Componentes da tela de login

Objetivo:
- Listar o que existe so no login.

Acao:
- Mostrar composicao:
  - `Card`
  - `FormField` (email)
  - `FormField` (senha)
  - botoes
  - mensagem de status

Fala sugerida:
- "Nao criamos tudo separado. Criamos o suficiente para ficar simples e reutilizavel."

---

## Sessao 13 - FormField: por que ele existe

Objetivo:
- Mostrar eliminacao de repeticao.

Acao:
- Abrir `FormField.jsx`.

Fala sugerida:
- "Sem `FormField`, eu repetiria label + input + classe varias vezes."

---

## Sessao 14 - Props do FormField

Objetivo:
- Explicar cada prop de forma objetiva.

Acao:
- Explicar: `id`, `label`, `type`, `value`, `onChange`, `placeholder`, `required`, `helpText`.

Fala sugerida:
- "`value` e `onChange` transformam o campo em controlado pelo React."

---

## Sessao 15 - Campo controlado

Objetivo:
- Entender estado no formulario.

Acao:
- Ir para `App.jsx`, estado `authForm`.

Fala sugerida:
- "Quem manda no valor do input e o estado, nao o DOM sozinho."

---

## Sessao 16 - useState (login)

Objetivo:
- Explicar hook principal.

Acao:
- Mostrar `useState` para `authForm`, `authMode`, `authMessage`.

Fala sugerida:
- "`useState` guarda memoria do componente entre renderizacoes."

---

## Sessao 17 - onChange e atualizacao parcial

Objetivo:
- Entender como um input atualiza apenas seu campo.

Acao:
- Mostrar `handleAuthFormChange`.

Fala sugerida:
- "Usamos `name` do input para saber qual chave atualizar."

---

## Sessao 18 - submit do login

Objetivo:
- Explicar evento `onSubmit`.

Acao:
- Mostrar `handleAuthSubmit`.

Fala sugerida:
- "`event.preventDefault()` evita recarregar a pagina."

---

## Sessao 19 - prevencao de erros no login

Objetivo:
- Relacionar com Nielsen (heuristica 5).

Acao:
- Mostrar validacoes de email/senha/nome.

Fala sugerida:
- "A melhor mensagem de erro e aquela que evita o erro antes."

---

## Sessao 20 - confirmacao de criar usuario

Objetivo:
- Mostrar seguranca de acao.

Acao:
- Mostrar `window.confirm` no fluxo de cadastro.

Fala sugerida:
- "Antes de acao critica, confirmamos intencao do usuario."

---

## Sessao 21 - feedback de erro e recuperacao

Objetivo:
- Nielsen: diagnosticar e recuperar.

Acao:
- Mostrar mensagens em `authMessage`.

Fala sugerida:
- "Erro bom diz o que aconteceu e o que fazer agora."

---

## Sessao 22 - modo login x cadastro

Objetivo:
- Explicar alternancia de estado.

Acao:
- Mostrar `authMode` e `handleModeChange`.

Fala sugerida:
- "Um estado simples muda toda a interface renderizada."

---

## Sessao 23 - renderizacao condicional

Objetivo:
- Entender `? :` no JSX.

Acao:
- Mostrar `isRegister ? ... : null` no `AuthPanel`.

Fala sugerida:
- "Se esta cadastrando, mostro nome. Se nao, escondo."

---

## Sessao 24 - acessibilidade de formulario

Objetivo:
- Entender `label` conectado ao input.

Acao:
- Mostrar `htmlFor` e `id` no `FormField`.

Fala sugerida:
- "Leitor de tela entende melhor quando label e input estao conectados."

---

## Sessao 25 - aria-live e status

Objetivo:
- Comunicar mensagens para tecnologias assistivas.

Acao:
- Mostrar `<p role="status" aria-live="polite">`.

Fala sugerida:
- "Assim o leitor de tela anuncia mudancas sem interromper de forma agressiva."

---

## Sessao 26 - quando o login termina

Objetivo:
- Entender troca de tela apos autenticar.

Acao:
- Mostrar bloco condicional em `App.jsx`:
  - sem usuario => `AuthPanel`
  - com usuario => area autenticada

Fala sugerida:
- "A tela muda porque o estado `currentUser` mudou."

---

## Sessao 27 - ponte para dashboard

Objetivo:
- Conectar login ao proximo modulo.

Acao:
- Mostrar card de boas-vindas.

Fala sugerida:
- "Agora que temos sessao, destravamos funcionalidades."

---

## Sessao 28 - confirmacao de logout

Objetivo:
- Prevenir perda de contexto.

Acao:
- Mostrar `window.confirm` no logout.

Fala sugerida:
- "Sair sem querer e frustrante. Confirmacao evita isso."

---

## Sessao 29 - resumo estatistico

Objetivo:
- Introduzir `useMemo`.

Acao:
- Mostrar `dashboardStats`.

Fala sugerida:
- "`useMemo` evita recalcular sem necessidade."

---

## Sessao 30 - Fragment: conceito

Objetivo:
- Definir `Fragment`.

Acao:
- Mostrar import e uso no map de stats.

Fala sugerida:
- "Fragment agrupa elementos sem criar div extra no HTML."

---

## Sessao 31 - key: conceito

Objetivo:
- Definir `key` em lista.

Acao:
- Mostrar `key={stat.label}` e `key={item.id}`.

Fala sugerida:
- "Key e identidade unica do item para o React reconciliar corretamente."

---

## Sessao 32 - key: erro comum

Objetivo:
- Evitar uso errado.

Acao:
- Explicar por que nao usar indice do array quando item pode ser removido.

Fala sugerida:
- "Indice muda quando remove item. Isso pode confundir a UI."

---

## Sessao 33 - formulario de midia

Objetivo:
- Evoluir para CRUD simples.

Acao:
- Abrir `AddMediaForm.jsx`.

Fala sugerida:
- "Mesmo padrao do login: campos controlados e validacao."

---

## Sessao 34 - validacoes de imagem

Objetivo:
- Usabilidade + acessibilidade.

Acao:
- Mostrar regras: alt text minimo, URL direta, aviso Pixabay.

Fala sugerida:
- "Nao basta funcionar. Tem que ser utilizavel e acessivel."

---

## Sessao 35 - validacao de video (YouTube)

Objetivo:
- Restringir para experiencia previsivel.

Acao:
- Mostrar `toYouTubeEmbedUrl`.

Fala sugerida:
- "Escopo pequeno melhora confiabilidade para aula."

---

## Sessao 36 - confirmacao de salvar midia

Objetivo:
- Heuristica de prevencao de erros.

Acao:
- Mostrar confirmacao no `handleAddMedia`.

Fala sugerida:
- "Perguntar antes de salvar evita acao acidental."

---

## Sessao 37 - confirmacao de remover midia

Objetivo:
- Evitar perda de dados.

Acao:
- Mostrar confirmacao no `handleRemoveMedia`.

Fala sugerida:
- "Remocao e destrutiva. Sempre confirme."

---

## Sessao 38 - listagem da galeria

Objetivo:
- Entender render dinamica de itens.

Acao:
- Mostrar `MediaGallery.jsx` com `items.map`.

Fala sugerida:
- "Dados entram por props, tela nasce do map."

---

## Sessao 39 - fallback de imagem quebrada

Objetivo:
- Melhorar recuperacao de erro.

Acao:
- Mostrar `brokenImageIds` e `onError`.

Fala sugerida:
- "Em vez de quebrar silenciosamente, mostramos orientacao clara."

---

## Sessao 40 - leitor assistido ativar/desativar

Objetivo:
- Acessibilidade para baixa visao/cegueira.

Acao:
- Mostrar estado `isReaderModeEnabled`.

Fala sugerida:
- "A pessoa escolhe ligar ou desligar leitura assistida."

---

## Sessao 41 - leitura por voz

Objetivo:
- Entender `speechSynthesis`.

Acao:
- Mostrar `handleReadMedia` e `SpeechSynthesisUtterance`.

Fala sugerida:
- "Lemos titulo, tipo, texto alternativo e descricao."

---

## Sessao 42 - parar leitura

Objetivo:
- Controle do usuario.

Acao:
- Mostrar `handleStopReading`.

Fala sugerida:
- "Acessibilidade tambem e controle e autonomia."

---

## Sessao 43 - persistencia no navegador

Objetivo:
- Explicar `localStorage` com `useEffect`.

Acao:
- Mostrar efeitos que salvam users, media e session.

Fala sugerida:
- "Sem backend, mas com persistencia local para experiencia completa."

---

## Sessao 44 - separar responsabilidades

Objetivo:
- Consolidar arquitetura.

Acao:
- Mostrar que `App` orquestra e componentes exibem.

Fala sugerida:
- "Regra no App, apresentacao nos componentes."

---

## Sessao 45 - mobile first no Tailwind

Objetivo:
- Explicar estrategia de CSS responsivo.

Acao:
- Mostrar classes base e `sm:`.

Fala sugerida:
- "Primeiro celular, depois expandimos para telas maiores."

---

## Sessao 46 - foco visivel

Objetivo:
- Acessibilidade teclado.

Acao:
- Mostrar `focus-visible:ring-4` nos botoes/inputs.

Fala sugerida:
- "Quem navega por teclado precisa ver onde esta o foco."

---

## Sessao 47 - semantica HTML

Objetivo:
- Mostrar estrutura compreensivel.

Acao:
- Apontar `header`, `main`, `section`, `form`, `ul`, `li`.

Fala sugerida:
- "Semantica ajuda SEO, manutencao e acessibilidade."

---

## Sessao 48 - revisao de props por componente

Objetivo:
- Fechar com checklist de API interna.

Acao:
- Revisar rapidamente:
  - `AppShell(title, subtitle, children)`
  - `Card(title, description, children, tone)`
  - `FormField(id, label, type, value, onChange, placeholder, required, helpText)`
  - `AuthPanel(mode, form, message, onChange, onSubmit, onModeChange)`
  - `AddMediaForm(form, onChange, onSubmit, message)`
  - `MediaGallery(items, onRemove, isReaderModeEnabled, onReadItem, onStopReading, currentlyReadingMediaId)`

Fala sugerida:
- "Se voce sabe as props, voce sabe usar o componente."

---

## Sessao 49 - revisao de conceitos-chave

Objetivo:
- Consolidar fundamentos.

Acao:
- Checklist final no quadro:
  - root
  - componente
  - props
  - children
  - estado
  - efeito
  - condicional
  - key

Fala sugerida:
- "Esses conceitos se repetem em qualquer app React."

---

## Sessao 50 - encerramento e proxima aula

Objetivo:
- Fechar com direcao de evolucao.

Acao:
- Sugerir backlog futuro:
  - backend real
  - senha com hash
  - upload de arquivo
  - filtros de busca
  - testes

Fala sugerida:
- "Hoje dominamos base solida. Proxima aula: evolucao para arquitetura completa."

---

## Bloco extra: explicacao curta para perguntas comuns

### O que e `children`?
`children` e o conteudo interno de um componente.
Exemplo mental:
- `<Card>MEU CONTEUDO</Card>`
- `MEU CONTEUDO` chega no componente como `children`.

### O que e `key`?
`key` e um identificador unico em listas React.
Sem `key` correta, o React pode atualizar item errado na tela.

### O que e root?
Root e o ponto de montagem do React no HTML.
Sem root, nao existe onde renderizar `App`.

### Por que separar em componentes?
Para:
- reutilizar
- reduzir repeticao
- facilitar leitura
- manter manutencao simples

---

## Script relampago de 5 minutos (inicio de aula)

"Turma, hoje vamos construir uma interface React por camadas. Primeiro login, depois dashboard.
No React, tudo e componente. Componente recebe props. Props sao parametros.
Quando queremos passar conteudo interno, usamos children.
A aplicacao comeca no root, em `main.jsx`, com `createRoot(...).render(<App />)`.
No login, vamos treinar campo controlado com estado e validacao.
Depois disso, destravamos dashboard, lista com map, e key.
No final, vamos ver acessibilidade pratica com leitura assistida e mensagens de erro claras."

---

## Dica para converter em PDF

Opcao simples:
1. Abra este arquivo no VS Code.
2. Use extensao de Markdown para exportar em PDF.
3. Ou imprima para PDF pelo preview de Markdown.

Fim.
