
import { Link } from 'react-router-dom'

const faqs = [
  { id: 'api', q: 'Como configurar a API Java pública?', a: 'Defina VITE_API_URL no .env apontando para a URL externa.' },
  { id: 'deploy', q: 'Como fazer deploy na Vercel?', a: 'Conecte o repositório no painel da Vercel e configure as variáveis .env.' },
  { id: 'crud', q: 'Como testar o CRUD?', a: 'Acesse /pacientes e utilize o formulário para criar/editar/remover.' },
]

export default function FAQ() {
  return (
    <section className="card p-6 md:p-10">
      <h2 className="text-2xl font-bold">FAQ</h2>
      <ul className="mt-4 space-y-3">
        {faqs.map(f => (
          <li key={f.id} className="card p-4">
            <div className="font-semibold">{f.q}</div>
            <p className="muted mt-1">{f.a}</p>
            <Link to={`/faq/${f.id}`} className="btn mt-3">Analisar Respota</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
