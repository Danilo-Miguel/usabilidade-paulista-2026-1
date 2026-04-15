import { Fragment, useEffect, useMemo, useState } from 'react'
import AppShell from './components/layout/AppShell'
import AuthPanel from './components/auth/AuthPanel'
import AddMediaForm from './components/media/AddMediaForm'
import MediaGallery from './components/media/MediaGallery'
import Card from './components/ui/Card'
import { toYouTubeEmbedUrl } from './utils/youtube'
import { isLikelyDirectImageUrl, isPixabayPageUrl } from './utils/image'

const EMPTY_AUTH_FORM = {
  name: '',
  email: '',
  password: '',
}

const EMPTY_MEDIA_FORM = {
  title: '',
  type: 'image',
  url: '',
  description: '',
  altText: '',
}

function App() {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('react-library-users')
    return storedUsers ? JSON.parse(storedUsers) : []
  })

  const [currentUser, setCurrentUser] = useState(() => {
    const storedSession = localStorage.getItem('react-library-session')
    return storedSession ? JSON.parse(storedSession) : null
  })

  const [mediaItems, setMediaItems] = useState(() => {
    const storedMedia = localStorage.getItem('react-library-media')
    return storedMedia ? JSON.parse(storedMedia) : []
  })

  const [authMode, setAuthMode] = useState('login')
  const [authForm, setAuthForm] = useState(EMPTY_AUTH_FORM)
  const [authMessage, setAuthMessage] = useState('Use um e-mail para entrar ou criar conta.')

  const [mediaForm, setMediaForm] = useState(EMPTY_MEDIA_FORM)
  const [mediaMessage, setMediaMessage] = useState('')
  const [isReaderModeEnabled, setIsReaderModeEnabled] = useState(false)
  const [currentlyReadingMediaId, setCurrentlyReadingMediaId] = useState(null)

  const isSpeechAvailable = typeof window !== 'undefined' && 'speechSynthesis' in window

  useEffect(() => {
    localStorage.setItem('react-library-users', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem('react-library-media', JSON.stringify(mediaItems))
  }, [mediaItems])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('react-library-session', JSON.stringify(currentUser))
      return
    }

    localStorage.removeItem('react-library-session')
  }, [currentUser])

  useEffect(() => {
    return () => {
      if (isSpeechAvailable) {
        window.speechSynthesis.cancel()
      }
    }
  }, [isSpeechAvailable])

  const userMediaItems = useMemo(() => {
    if (!currentUser) return []

    return mediaItems.filter((item) => item.ownerId === currentUser.id)
  }, [currentUser, mediaItems])

  const dashboardStats = useMemo(
    () => [
      { label: 'Total de midias', value: userMediaItems.length },
      {
        label: 'Imagens',
        value: userMediaItems.filter((item) => item.type === 'image').length,
      },
      {
        label: 'Videos',
        value: userMediaItems.filter((item) => item.type === 'video').length,
      },
    ],
    [userMediaItems],
  )

  function handleAuthFormChange(event) {
    const { name, value } = event.target
    setAuthForm((previousState) => ({
      ...previousState,
      [name]: value,
    }))
  }

  function handleAuthSubmit(event) {
    event.preventDefault()

    const trimmedName = authForm.name.trim()
    const trimmedEmail = authForm.email.trim()
    const trimmedPassword = authForm.password.trim()

    if (!trimmedEmail || !trimmedPassword) {
      setAuthMessage('Preencha e-mail e senha para continuar.')
      return
    }

    if (trimmedPassword.length < 4) {
      setAuthMessage('A senha precisa ter ao menos 4 caracteres.')
      return
    }

    if (authMode === 'register') {
      if (trimmedName.length < 3) {
        setAuthMessage('Digite um nome com pelo menos 3 caracteres.')
        return
      }

      const userAlreadyExists = users.some((user) => user.email === trimmedEmail)

      if (userAlreadyExists) {
        setAuthMessage('Esse e-mail ja foi cadastrado. Tente entrar.')
        return
      }

      const shouldCreateUser = window.confirm(
        `Deseja realmente criar a conta para ${trimmedEmail}?`,
      )

      if (!shouldCreateUser) {
        setAuthMessage('Criacao de conta cancelada.')
        return
      }

      const newUser = {
        id: crypto.randomUUID(),
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      }

      setUsers((previousUsers) => [...previousUsers, newUser])
      setCurrentUser(newUser)
      setAuthForm(EMPTY_AUTH_FORM)
      setAuthMessage('Conta criada com sucesso. Bem-vinda(o)!')
      return
    }

    const matchedUser = users.find(
      (user) => user.email === trimmedEmail && user.password === trimmedPassword,
    )

    if (!matchedUser) {
      setAuthMessage('Credenciais invalidas. Confira e tente de novo.')
      return
    }

    setCurrentUser(matchedUser)
    setAuthForm(EMPTY_AUTH_FORM)
    setAuthMessage(`Login concluido. Ola, ${matchedUser.name}.`)
  }

  function handleModeChange() {
    setAuthMode((previousMode) =>
      previousMode === 'login' ? 'register' : 'login',
    )
    setAuthMessage('Modo alterado. Preencha os campos para continuar.')
  }

  function handleMediaFormChange(event) {
    const { name, value } = event.target
    setMediaForm((previousState) => {
      const nextState = {
        ...previousState,
        [name]: value,
      }

      // Quando trocar para video, limpamos o alt text porque ele nao e usado nesse tipo.
      if (name === 'type' && value === 'video') {
        nextState.altText = ''
      }

      return nextState
    })
  }

  function handleAddMedia(event) {
    event.preventDefault()

    const normalizedTitle = mediaForm.title.trim()
    const normalizedUrl = mediaForm.url.trim()
    const normalizedDescription = mediaForm.description.trim()
    const normalizedAltText = mediaForm.altText.trim()

    if (!normalizedTitle || !normalizedUrl || !normalizedDescription) {
      setMediaMessage('Preencha titulo, URL e descricao para salvar a midia.')
      return
    }

    if (mediaForm.type === 'image' && normalizedAltText.length < 8) {
      setMediaMessage('Para imagem, descreva melhor: minimo de 8 caracteres no texto alternativo.')
      return
    }

    if (mediaForm.type === 'image' && isPixabayPageUrl(normalizedUrl)) {
      setMediaMessage('No Pixabay, use a URL direta da imagem (cdn.pixabay.com), nao a pagina da foto.')
      return
    }

    if (mediaForm.type === 'image' && !isLikelyDirectImageUrl(normalizedUrl)) {
      setMediaMessage('Use um link direto da imagem (terminando em .jpg, .png, .webp, etc).')
      return
    }

    if (mediaForm.type === 'video' && !toYouTubeEmbedUrl(normalizedUrl)) {
      setMediaMessage('Cole uma URL valida do YouTube (youtube.com/watch ou youtu.be).')
      return
    }

    const duplicatedUrl = userMediaItems.some((item) => item.url === normalizedUrl)
    const saveConfirmationMessage = duplicatedUrl
      ? 'Ja existe uma midia com esta URL. Deseja salvar mesmo assim?'
      : 'Deseja realmente salvar esta midia?'

    const shouldSaveMedia = window.confirm(saveConfirmationMessage)

    if (!shouldSaveMedia) {
      setMediaMessage(
        duplicatedUrl
          ? 'Cadastro cancelado para evitar duplicidade.'
          : 'Salvamento cancelado.',
      )
      return
    }

    const newMedia = {
      id: crypto.randomUUID(),
      ownerId: currentUser.id,
      ...mediaForm,
      title: normalizedTitle,
      url: normalizedUrl,
      description: normalizedDescription,
      altText: normalizedAltText,
      createdAt: new Date().toISOString(),
    }

    setMediaItems((previousMediaItems) => [newMedia, ...previousMediaItems])
    setMediaForm(EMPTY_MEDIA_FORM)
    setMediaMessage('Midia adicionada com sucesso.')
  }

  function handleRemoveMedia(mediaId) {
    const shouldRemove = window.confirm('Tem certeza de que deseja remover esta midia?')

    if (!shouldRemove) {
      setMediaMessage('Remocao cancelada.')
      return
    }

    setMediaItems((previousMediaItems) =>
      previousMediaItems.filter((item) => item.id !== mediaId),
    )
    setMediaMessage('Midia removida com sucesso.')
  }

  function handleLogout() {
    const shouldLogout = window.confirm('Deseja realmente encerrar sua sessao?')

    if (!shouldLogout) {
      setMediaMessage('Logout cancelado.')
      return
    }

    if (isSpeechAvailable) {
      window.speechSynthesis.cancel()
    }

    setCurrentUser(null)
    setIsReaderModeEnabled(false)
    setCurrentlyReadingMediaId(null)
    setMediaMessage('Sessao encerrada.')
  }

  function handleToggleReaderMode() {
    const nextState = !isReaderModeEnabled
    setIsReaderModeEnabled(nextState)

    if (!nextState && isSpeechAvailable) {
      window.speechSynthesis.cancel()
      setCurrentlyReadingMediaId(null)
    }

    if (nextState && !isSpeechAvailable) {
      setMediaMessage('Este navegador nao suporta leitura por voz.')
      return
    }

    setMediaMessage(nextState ? 'Leitura assistida ativada.' : 'Leitura assistida desativada.')
  }

  function handleReadMedia(item) {
    if (!isSpeechAvailable) {
      setMediaMessage('Este navegador nao suporta leitura por voz.')
      return
    }

    const parts = [
      `Titulo: ${item.title}.`,
      `Tipo: ${item.type === 'image' ? 'imagem' : 'video'}.`,
      item.type === 'image' ? `Texto alternativo: ${item.altText}.` : '',
      `Descricao: ${item.description}.`,
    ].filter(Boolean)

    const utterance = new SpeechSynthesisUtterance(parts.join(' '))
    utterance.lang = 'pt-BR'
    utterance.rate = 1

    utterance.onend = () => {
      setCurrentlyReadingMediaId(null)
    }

    utterance.onerror = () => {
      setCurrentlyReadingMediaId(null)
      setMediaMessage('Nao foi possivel reproduzir a leitura da descricao.')
    }

    window.speechSynthesis.cancel()
    setCurrentlyReadingMediaId(item.id)
    window.speechSynthesis.speak(utterance)
  }

  function handleStopReading() {
    if (!isSpeechAvailable) return

    window.speechSynthesis.cancel()
    setCurrentlyReadingMediaId(null)
    setMediaMessage('Leitura interrompida.')
  }

  return (
    <AppShell
      title="Biblioteca de videos e imagens"
      subtitle="Projeto mobile-first para praticar componentes, props, hooks, fragments e fundamentos de acessibilidade em React."
    >
      {!currentUser ? (
        <AuthPanel
          mode={authMode}
          form={authForm}
          message={authMessage}
          onChange={handleAuthFormChange}
          onSubmit={handleAuthSubmit}
          onModeChange={handleModeChange}
        />
      ) : (
        <>
          <Card
            title={`Bem-vinda(o), ${currentUser.name}`}
            description="Area autenticada usando estado local e renderizacao condicional."
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-ink/80">
                Seu e-mail: <strong>{currentUser.email}</strong>
              </p>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-ocean/40 px-4 py-2 text-sm font-semibold text-ocean transition hover:bg-ocean/10 focus-visible:ring-4 focus-visible:ring-sun/60"
              >
                Sair
              </button>
            </div>
          </Card>

          <Card
            title="Acessibilidade: leitura assistida"
            description="Ative para ler em voz alta os textos das midias e apoiar pessoas com baixa visao ou cegueira."
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-ink/80">
                Estado atual: <strong>{isReaderModeEnabled ? 'Ativado' : 'Desativado'}</strong>
              </p>
              <button
                type="button"
                onClick={handleToggleReaderMode}
                aria-pressed={isReaderModeEnabled}
                className="rounded-xl border border-ocean/40 px-4 py-2 text-sm font-semibold text-ocean transition hover:bg-ocean/10 focus-visible:ring-4 focus-visible:ring-sun/60"
              >
                {isReaderModeEnabled ? 'Desativar leitor' : 'Ativar leitor'}
              </button>
            </div>
          </Card>

          <Card
            title="Resumo rapido"
            description="Fragment evita elementos extras no DOM ao montar pares de dados."
          >
            <dl className="grid gap-3 sm:grid-cols-3">
              {dashboardStats.map((stat) => (
                <Fragment key={stat.label}>
                  <div className="rounded-xl bg-sand p-3 text-center">
                    <dt className="text-xs uppercase tracking-[0.12em] text-ink/65">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 font-heading text-2xl text-ocean">{stat.value}</dd>
                  </div>
                </Fragment>
              ))}
            </dl>
          </Card>

          <AddMediaForm
            form={mediaForm}
            onChange={handleMediaFormChange}
            onSubmit={handleAddMedia}
            message={mediaMessage}
          />

          <MediaGallery
            items={userMediaItems}
            onRemove={handleRemoveMedia}
            isReaderModeEnabled={isReaderModeEnabled}
            onReadItem={handleReadMedia}
            onStopReading={handleStopReading}
            currentlyReadingMediaId={currentlyReadingMediaId}
          />
        </>
      )}
    </AppShell>
  )
}

export default App
