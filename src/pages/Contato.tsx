import { useState } from 'react'

type FormState = { nome: string; email: string; mensagem: string }
type Status = 'idle' | 'enviando' | 'ok' | 'erro'

const ENDPOINT = 'https://formsubmit.co/ajax/felipewicliflealdasilva@gmail.com'

export default function Contato() {
  const [state, setState] = useState<FormState>({ nome: '', email: '', mensagem: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [erro, setErro] = useState<string | null>(null)

  const validar = () => {
    if (!state.nome.trim() || !state.email.trim() || !state.mensagem.trim()) {
      setErro('Preencha todos os campos antes de enviar.')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
      setErro('Informe um e-mail válido.')
      return false
    }
    setErro(null)
    return true
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validar()) return
    setStatus('enviando')

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: state.nome,
          email: state.email,
          message: state.mensagem,
          _subject: 'Contato • ZypherX',
          _template: 'table'
        })
      })

      if (!res.ok) throw new Error('Falha no envio')

      setStatus('ok')
      setState({ nome: '', email: '', mensagem: '' })
      setTimeout(() => setStatus('idle'), 3000)
    } catch (e) {
      setStatus('erro')
    }
  }

  return (
    <section className="card p-6 md:p-10 max-w-2xl mx-auto animate-fadeIn">
      <h2 className="text-3xl font-bold mb-2">Entre em Contato</h2>
      <p className="muted mb-6">Preencha o formulário abaixo e entraremos em contato o quanto antes.</p>

      <form className="space-y-5" onSubmit={onSubmit}>
        <div>
          <label className="label">Nome Completo</label>
          <input
            className="input"
            placeholder="Ex: Felipe Wiclif Leal da Silva"
            value={state.nome}
            onChange={e => setState(s => ({ ...s, nome: e.target.value }))}
            required
          />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="exemplo@zypherx.com"
            value={state.email}
            onChange={e => setState(s => ({ ...s, email: e.target.value }))}
            required
          />
        </div>

        <div>
          <label className="label">Mensagem</label>
          <textarea
            className="input min-h-[120px]"
            placeholder="Digite sua mensagem..."
            value={state.mensagem}
            onChange={e => setState(s => ({ ...s, mensagem: e.target.value }))}
            required
          />
        </div>

        {erro && <p className="text-red-400 text-sm">{erro}</p>}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button className="btn" type="submit" disabled={status === 'enviando'}>
            {status === 'enviando' ? 'Enviando...' : 'Enviar Mensagem'}
          </button>
          <button type="button" className="btn" onClick={() => setState({ nome: '', email: '', mensagem: '' })}>
            Limpar
          </button>
        </div>

        {status === 'ok' && <div className="text-green-400 mt-3 animate-slideUp">Mensagem enviada com sucesso!</div>}
        {status === 'erro' && <div className="text-red-400 mt-3 animate-slideUp">Ocorreu um erro. Tente novamente.</div>}
      </form>
    </section>
  )
}