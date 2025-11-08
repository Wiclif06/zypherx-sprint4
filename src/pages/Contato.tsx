
import { useState } from 'react'

type FormState = { nome: string; email: string; mensagem: string }
export default function Contato() {
  const [state, setState] = useState<FormState>({ nome: '', email: '', mensagem: '' })
  const [status, setStatus] = useState<'idle'|'enviando'|'ok'|'erro'>('idle')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('enviando')
    try {
      // exemplo: enviar para backend futuramente
      await new Promise(r => setTimeout(r, 500))
      setStatus('ok')
      setState({ nome: '', email: '', mensagem: '' })
    } catch {
      setStatus('erro')
    }
  }

  return (
    <section className="card p-6 md:p-10 max-w-2xl">
      <h2 className="text-2xl font-bold">Contato</h2>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="label">Nome Completo</label>
          <input className="input" value={state.nome} onChange={e => setState(s=>({...s, nome:e.target.value}))} required />
        </div>
        <div>
          <label className="label">Email</label>
          <input type="email" className="input" value={state.email} onChange={e => setState(s=>({...s, email:e.target.value}))} required />
        </div>
        <div>
          <label className="label">Mensagem</label>
          <textarea className="input min-h-[120px]" value={state.mensagem} onChange={e => setState(s=>({...s, mensagem:e.target.value}))} required />
        </div>
        <button className="btn" type="submit" disabled={status==='enviando'}>
          {status==='enviando' ? 'Enviando...' : 'Enviar'}
        </button>
        {status==='ok' && <p className="text-green-400">Mensagem enviada com sucesso!</p>}
        {status==='erro' && <p className="text-red-400">Ocorreu um erro ao enviar a imagem, por gentileza tente novamente.</p>}
      </form>
    </section>
  )
}
