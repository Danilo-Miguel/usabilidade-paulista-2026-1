# Portal Didatico React: Biblioteca de Videos e Imagens

Este projeto foi pensado para aula introdutoria de React com foco em:

- componentizacao
- props
- children
- fragments
- keys
- hooks (`useState`, `useEffect`, `useMemo`)
- acessibilidade e usabilidade
- CSS utilitario com Tailwind

## 1. Objetivo do projeto

Criar um portal simples onde a pessoa pode:

- cadastrar conta
- fazer login
- adicionar imagem ou video por URL
- listar e remover suas midias

Tudo com estado local, sem backend, para priorizar os fundamentos de React.

## 2. Conceitos de usabilidade e acessibilidade usados

- Mobile first: estilos base para telas pequenas, com `sm:` para telas maiores.
- Contraste: paleta com texto escuro sobre fundo claro e botoes com contraste alto.
- Feedback: mensagens com `role="status"` e `aria-live="polite"`.
- Formularios acessiveis: todos os campos com `label` + `htmlFor`.
- Navegacao por teclado: foco visual com `focus-visible:ring-*`.
- Midia acessivel: imagem exige texto alternativo descritivo.

## 3. Psicologia das cores (resumo didatico)

Paleta definida no `tailwind.config.js`:

- `ocean` (`#174d59`): transmite confianca e estabilidade (acoes principais).
- `sand` (`#f6f1e9`): fundo claro e acolhedor para leitura prolongada.
- `sun` (`#ffc857`): destaque de foco e elementos de atencao.
- `teal` (`#2a9d8f`): acao positiva (botao salvar).
- `coral` (`#d1495b`): acao destrutiva (remover).

## 4. Estrutura de pastas

```txt
src/
  components/
    auth/
      AuthPanel.jsx
    layout/
      AppShell.jsx
    media/
      AddMediaForm.jsx
      MediaGallery.jsx
    ui/
      Card.jsx
      FormField.jsx
  App.jsx
  index.css
```

## 5. Passo a passo de construcao (para reproduzir em sala)

### Passo 1: criar o projeto React

```bash
npm create vite@latest . -- --template react --force
npm install
```

Explique em aula:

- Vite gera ambiente moderno com hot reload.
- React fica em arquivos `.jsx` com componentes.
- `main.jsx` e o ponto de entrada que renderiza `<App />`.

### Passo 2: instalar e configurar Tailwind

```bash
npm install -D tailwindcss@3.4.14 postcss@8.4.49 autoprefixer@10.4.20
npx tailwindcss init -p
```

Editar `tailwind.config.js`:

- `content` aponta para `index.html` e todos os arquivos do `src`.
- `extend` define cores, fontes e sombra customizadas.

Editar `src/index.css`:

- incluir `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`
- criar base de tipografia e `box-sizing`.

### Passo 3: criar componentes de base (componentizacao)

1. `Card.jsx`
- componente visual reutilizavel
- recebe `title`, `description`, `children`, `tone`
- demonstra como `children` permite inserir qualquer conteudo dentro do card

2. `FormField.jsx`
- componente de campo com `label`, `input`, `helpText`
- recebe props como `id`, `value`, `onChange`, `required`
- evita repetir o mesmo bloco de formulario

3. `AppShell.jsx`
- layout principal da pagina
- recebe `title`, `subtitle` e `children`
- organiza header, conteudo e footer

### Passo 4: criar fluxo de autenticacao (simples)

Arquivo: `App.jsx` + `AuthPanel.jsx`

O que mostrar didaticamente:

- `useState` para controlar:
  - lista de usuarios
  - usuario logado
  - formulario de login/cadastro
  - mensagens de status
- renderizacao condicional:
  - se nao tem usuario logado -> mostra `AuthPanel`
  - se tem usuario logado -> mostra dashboard
- `props` para enviar dados/funcoes do `App` para `AuthPanel`

### Passo 5: persistencia local com `useEffect`

No `App.jsx`:

- salvar usuarios no `localStorage` quando `users` muda
- salvar midias no `localStorage` quando `mediaItems` muda
- salvar/remover sessao quando `currentUser` muda

Explicacao de gancho (`hook`):

- `useEffect` observa dependencias
- quando dependencia muda, o efeito roda

### Passo 6: cadastrar imagem e video

Componentes: `AddMediaForm.jsx` e `MediaGallery.jsx`

O que praticar:

- formulario controlado para titulo, tipo, URL, descricao e alt text
- validacao simples:
  - se tipo = imagem, exigir alt text mais descritivo
- adicionar novo item com `crypto.randomUUID()`
- remover item por id

### Passo 7: `keys` e lista dinamica

No `MediaGallery.jsx`:

- `items.map(...)`
- cada `<li>` recebe `key={item.id}`

Mensagem didatica:

- keys ajudam o React a identificar cada elemento da lista
- evita comportamentos estranhos na renderizacao

### Passo 8: `Fragment` na pratica

No `App.jsx`:

- uso de `<>...</>` para agrupar blocos sem criar div extra
- uso de `<Fragment key={...}>` no mapa de estatisticas

## 6. Relacao com WCAG (introducao)

Este projeto trabalha praticas alinhadas com WCAG:

- Perceptivel:
  - texto alternativo para imagens
  - contraste adequado
- Operavel:
  - foco visivel em componentes interativos
  - todos os controles acessiveis por teclado
- Compreensivel:
  - labels claros e mensagens de feedback
- Robusto:
  - HTML semantico (header, main, section, form, ul, li)

## 7. Como rodar

```bash
npm install
npm run dev
```

Acesse a URL mostrada no terminal (normalmente `http://localhost:5173`).

## 8. Roteiro de explicacao em aula (sugestao rapida)

1. Mostrar estrutura de pastas e responsabilidade de cada componente.
2. Explicar `App` como componente "orquestrador" (estado global da pagina).
3. Mostrar props descendo para componentes filhos.
4. Mostrar `children` em `Card` e `AppShell`.
5. Mostrar `map + key` em `MediaGallery`.
6. Mostrar `Fragment` em blocos sem wrapper extra.
7. Simular cadastro, login, add/remocao de midia e recarregar pagina para provar persistencia.
8. Fechar conectando cada decisao com acessibilidade/usabilidade.

## 9. Limites intencionais deste projeto

Para manter simplicidade didatica:

- sem backend
- sem JWT
- sem hash de senha
- sem upload real de arquivo (apenas URL)

Esses pontos podem virar evolucao em aulas futuras.
