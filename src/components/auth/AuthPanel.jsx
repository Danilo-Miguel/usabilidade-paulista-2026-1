import Card from '../ui/Card'
import FormField from '../ui/FormField'

function AuthPanel({
  mode,
  form,
  message,
  onChange,
  onSubmit,
  onModeChange,
}) {
  const isRegister = mode === 'register'

  return (
    <Card
      title={isRegister ? 'Criar conta' : 'Entrar na conta'}
      description="Fluxo simplificado para praticar formularios controlados com React."
      tone="highlight"
    >
      <form className="grid gap-4" onSubmit={onSubmit}>
        {isRegister ? (
          <FormField
            id="name"
            label="Nome completo"
            value={form.name}
            onChange={onChange}
            placeholder="Ex.: Ana Souza"
            required
          />
        ) : null}

        <FormField
          id="email"
          label="E-mail"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="voce@exemplo.com"
          required
        />

        <FormField
          id="password"
          label="Senha"
          type="password"
          value={form.password}
          onChange={onChange}
          placeholder="No minimo 4 caracteres"
          required
          helpText="Projeto de aula: sem criptografia e sem backend."
        />

        <button
          type="submit"
          className="rounded-xl bg-ocean px-4 py-2 text-sm font-semibold text-sand transition hover:brightness-110 focus-visible:ring-4 focus-visible:ring-sun/60"
        >
          {isRegister ? 'Cadastrar' : 'Entrar'}
        </button>

        <button
          type="button"
          onClick={onModeChange}
          className="rounded-xl border border-ocean/40 px-4 py-2 text-sm font-semibold text-ocean transition hover:bg-ocean/10 focus-visible:ring-4 focus-visible:ring-sun/60"
        >
          {isRegister
            ? 'Ja tem conta? Clique para entrar'
            : 'Nao tem conta? Clique para cadastrar'}
        </button>

        <p className="text-sm text-ink" role="status" aria-live="polite">
          {message}
        </p>
      </form>
    </Card>
  )
}

export default AuthPanel
