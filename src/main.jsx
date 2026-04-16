// Importa StrictMode para alertas extras em desenvolvimento.
import { StrictMode } from 'react'
// Importa a funcao que cria a raiz React no DOM.
import { createRoot } from 'react-dom/client'
// Importa os estilos globais.
import './index.css'
// Importa o componente raiz da aplicacao.
import App from './App.jsx'

// Seleciona a div#root do index.html e monta a aplicacao React nela.
createRoot(document.getElementById('root')).render(
  // StrictMode envolve a app para boas praticas em desenvolvimento.
  <StrictMode>
    {/* App e o primeiro componente exibido na tela. */}
    <App />
  </StrictMode>,
)
