# Guia de CSS com Foco em Acessibilidade e Usabilidade

## 📚 Índice
1. [Por que não usar pixels (px)?](#por-que-não-usar-pixels)
2. [Unidades de medida recomendadas](#unidades-de-medida)
3. [Propriedades CSS voltadas para acessibilidade](#propriedades-acessibilidade)
4. [Propriedades CSS voltadas para usabilidade](#propriedades-usabilidade)
5. [Boas práticas gerais](#boas-praticas)

---

## Por que não usar pixels (px)? {#por-que-não-usar-pixels}

### ❌ Problemas com pixels (px)

Pixels são unidades **absolutas** e **fixas**, o que causa diversos problemas:

1. **Não respeita as preferências do usuário**
   - Usuários com deficiência visual podem configurar um tamanho de fonte maior no navegador
   - Pixels ignoram completamente essa configuração
   - Exemplo: se o usuário definir fonte maior, texto em `px` permanece pequeno

2. **Dificulta a responsividade**
   - Não se adapta automaticamente a diferentes tamanhos de tela
   - Requer mais media queries e ajustes manuais

3. **Problemas de zoom**
   - Quando o usuário dá zoom na página, elementos em `px` podem quebrar o layout
   - Elementos podem ficar desproporcionais

4. **Não é escalável**
   - Em telas de alta resolução (Retina, 4K), pixels podem parecer muito pequenos
   - Não acompanha a escala do sistema operacional

### ✅ O que usar no lugar?

- **`rem`** (root em) - recomendado para tamanhos de fonte e espaçamentos
- **`em`** - para espaçamentos relativos ao elemento pai
- **`%`** - para larguras e layouts fluidos
- **`vw/vh`** - para elementos que devem ocupar porcentagem da viewport
- **`ch`** - para largura de textos (1ch = largura do caractere "0")

---

## Unidades de medida recomendadas {#unidades-de-medida}

### 🎯 **rem** (Root EM)

- Relativo ao tamanho da fonte do elemento raiz (`<html>`)
- Padrão dos navegadores: `1rem = 16px`
- **Quando usar**: tamanhos de fonte, padding, margin, gaps

```css
/* ✅ BOM - Respeita preferências do usuário */
html {
    font-size: 100%; /* Usa o padrão do navegador (geralmente 16px) */
}

body {
    font-size: 1rem; /* 16px padrão, mas se ajusta se usuário mudar */
}

h1 {
    font-size: 2.5rem; /* 40px padrão, mas escalável */
}

p {
    margin-bottom: 1.5rem; /* 24px padrão */
}
```

**Vantagem**: Se o usuário configurar fonte maior (ex: 20px), TUDO escala proporcionalmente.

---

### 📏 **em**

- Relativo ao tamanho da fonte do **elemento pai**
- **Quando usar**: padding/margin internos que devem escalar com o conteúdo

```css
/* ✅ BOM - Botão que cresce junto com a fonte */
button {
    font-size: 1rem;
    padding: 0.5em 1em; /* Padding proporcional ao tamanho da fonte */
}
```

**Cuidado**: `em` é composto (multiplica com valores dos pais), pode complicar.

---

### 📊 **%** (Porcentagem)

- Relativo ao elemento pai
- **Quando usar**: larguras, heights, layouts flexíveis

```css
/* ✅ BOM - Layout fluido */
.container {
    width: 90%; /* Ocupa 90% da largura do pai */
    max-width: 1200px; /* Mas não mais que 1200px */
    margin: 0 auto; /* Centraliza */
}
```

---

### 🖥️ **vw/vh** (Viewport Width/Height)

- Relativo ao tamanho da janela do navegador
- `1vw` = 1% da largura da viewport
- `1vh` = 1% da altura da viewport
- **Quando usar**: hero sections, elementos que devem sempre preencher a tela

```css
/* ✅ BOM - Seção hero full screen */
.hero {
    height: 100vh; /* Altura total da tela */
    width: 100vw; /* Largura total da tela */
}
```

**Cuidado**: `vw` pode causar scroll horizontal. Use `100%` quando possível.

---

### 📝 **ch** (Character Width)

- Baseado na largura do caractere "0" da fonte atual
- **Quando usar**: limitar largura de linhas de texto para legibilidade

```css
/* ✅ BOM - Linha de texto ideal */
p {
    max-width: 65ch; /* Máximo 65 caracteres por linha */
}
```

**Por quê?** Linhas muito longas dificultam a leitura (olhos cansam de ir de um lado a outro).

---

## Propriedades CSS voltadas para acessibilidade {#propriedades-acessibilidade}

### 1. **Contraste de cores**

```css
/* ✅ BOM - Contraste forte (mínimo 4.5:1 para texto normal) */
body {
    background-color: #ffffff;
    color: #212121;
}

/* ❌ RUIM - Contraste fraco */
body {
    background-color: #e0e0e0;
    color: #cccccc; /* Difícil de ler */
}
```

**Ferramenta**: Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) para verificar.

---

### 2. **Focus visível** (para navegação por teclado)

```css
/* ✅ BOM - Indica claramente onde está o foco */
a:focus,
button:focus,
input:focus {
    outline: 3px solid #0066cc;
    outline-offset: 2px;
}

/* ❌ PÉSSIMO - Remove indicador de foco */
*:focus {
    outline: none; /* NUNCA faça isso sem alternativa! */
}
```

**Por quê?** Usuários que navegam por teclado (Tab) precisam ver onde estão.

---

### 3. **Tamanhos mínimos de toque**

```css
/* ✅ BOM - Botões grandes o suficiente para toque */
button,
a {
    min-height: 44px; /* Recomendação WCAG */
    min-width: 44px;
    padding: 0.75rem 1.5rem;
}
```

**Por quê?** Usuários com dificuldades motoras ou em dispositivos touch precisam de alvos grandes.

---

### 4. **Espaçamento adequado**

```css
/* ✅ BOM - Espaçamento respirável */
p {
    line-height: 1.6; /* 1.5 no mínimo para WCAG */
    margin-bottom: 1.5rem;
}

h2 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    line-height: 1.3;
}
```

**Por quê?** Facilita leitura para pessoas com dislexia e baixa visão.

---

### 5. **Textos ocultos para leitores de tela**

```css
/* ✅ BOM - Esconde visualmente mas mantém para leitores de tela */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}

/* ❌ RUIM - Remove do DOM completamente */
.hidden {
    display: none; /* Leitores de tela não veem */
}
```

---

### 6. **Prefers-reduced-motion** (respeita preferência do usuário)

```css
/* Animações normais */
.card {
    transition: transform 0.3s ease;
}

.card:hover {
    transform: scale(1.05);
}

/* ✅ BOM - Remove animações para quem tem sensibilidade */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

**Por quê?** Pessoas com distúrbios vestibulares podem ter tonturas com animações.

---

### 7. **Prefers-color-scheme** (modo escuro)

```css
/* Tema claro (padrão) */
:root {
    --bg-color: #ffffff;
    --text-color: #212121;
}

/* ✅ BOM - Respeita preferência de tema escuro */
@media (prefers-color-scheme: dark) {
    :root {
        --bg-color: #212121;
        --text-color: #ffffff;
    }
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
}
```

---

## Propriedades CSS voltadas para usabilidade {#propriedades-usabilidade}

### 1. **Feedback visual em interações**

```css
/* ✅ BOM - Usuário sabe que pode clicar */
button,
a {
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;
}

button:hover {
    background-color: #0056b3;
}

button:active {
    transform: scale(0.98); /* Feedback de clique */
}
```

---

### 2. **Estados desabilitados claros**

```css
/* ✅ BOM - Fica óbvio que está desabilitado */
button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #cccccc;
}
```

---

### 3. **Largura máxima de conteúdo**

```css
/* ✅ BOM - Evita linhas muito longas */
.content {
    max-width: 70ch; /* ou 800px */
    margin: 0 auto;
    padding: 0 1rem;
}
```

**Por quê?** Linhas muito longas dificultam a leitura (ideal: 50-75 caracteres).

---

### 4. **Scroll suave**

```css
/* ✅ BOM - Navegação suave entre âncoras */
html {
    scroll-behavior: smooth;
}

/* Mas respeita preferência do usuário */
@media (prefers-reduced-motion: reduce) {
    html {
        scroll-behavior: auto;
    }
}
```

---

### 5. **Responsividade fluida**

```css
/* ✅ BOM - Imagens responsivas */
img {
    max-width: 100%;
    height: auto;
    display: block;
}

/* ✅ BOM - Layout flexível */
.container {
    width: min(90%, 1200px); /* Usa função min() */
    margin-inline: auto; /* Centraliza */
    padding-inline: 1rem;
}
```

---

### 6. **Áreas de clique maiores**

```css
/* ✅ BOM - Aumenta área clicável sem mudar visual */
a {
    position: relative;
    display: inline-block;
}

a::after {
    content: '';
    position: absolute;
    top: -10px;
    right: -10px;
    bottom: -10px;
    left: -10px;
}
```

---

## Boas práticas gerais {#boas-praticas}

### ✅ Checklist de acessibilidade CSS

- [ ] Use `rem` para tamanhos de fonte
- [ ] Contraste mínimo 4.5:1 (texto normal) e 3:1 (texto grande)
- [ ] **NUNCA** remova `outline: none` sem alternativa
- [ ] Botões e links com mínimo 44x44px
- [ ] `line-height` mínimo de 1.5
- [ ] Implemente `prefers-reduced-motion`
- [ ] Implemente `prefers-color-scheme`
- [ ] Use unidades relativas (`rem`, `em`, `%`)
- [ ] Max-width para textos (50-75 caracteres)
- [ ] Feedbacks visuais em estados hover/focus/active

---

### 📐 Escala de tamanhos sugerida (usando `rem`)

```css
/* Sistema de tipografia escalável */
:root {
    --text-xs: 0.75rem;   /* 12px */
    --text-sm: 0.875rem;  /* 14px */
    --text-base: 1rem;    /* 16px */
    --text-lg: 1.125rem;  /* 18px */
    --text-xl: 1.25rem;   /* 20px */
    --text-2xl: 1.5rem;   /* 24px */
    --text-3xl: 1.875rem; /* 30px */
    --text-4xl: 2.25rem;  /* 36px */
    --text-5xl: 3rem;     /* 48px */
}
```

---

### 🎨 Sistema de cores com variáveis

```css
:root {
    /* Cores primárias */
    --primary: #0066cc;
    --primary-hover: #0056b3;
    
    /* Cores neutras */
    --gray-50: #f9fafb;
    --gray-900: #111827;
    
    /* Cores semânticas */
    --success: #10b981;
    --warning: #f59e0b;
    --error: #ef4444;
    
    /* Texto */
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
}

/* Modo escuro */
@media (prefers-color-scheme: dark) {
    :root {
        --text-primary: #f9fafb;
        --text-secondary: #d1d5db;
    }
}
```

---

## 🎓 Resumo Final

### Use SEMPRE:
- `rem` para fontes e espaçamentos
- `%` para larguras
- `vw/vh` para elementos fullscreen
- Contraste adequado (4.5:1 mínimo)
- Focus visível
- Media queries para `prefers-reduced-motion` e `prefers-color-scheme`

### EVITE:
- `px` para fontes
- Remover `outline` sem alternativa
- Animações excessivas
- Áreas de toque pequenas
- Linhas de texto muito longas
- Contrastes baixos

---

**Próximos passos**: Agora vamos aplicar esses conceitos nos arquivos HTML progressivamente! 🚀
