
import { useParams, useNavigate } from 'react-router-dom'

const detalhes: Record<string, { title: string; body: string }> = {
  api: { title: 'Configuração da API',

    body: 'No dashboard da Vercel, importe o repositório, defina as variáveis, e faça o deploy. Inclua a URL no README.' },
  crud: { title: 'Testando o CRUD',
    body: 'Acesse /pacientes para listar, criar, editar e excluir registros, com feedback de sucesso/erro.' }
}

export default function FAQDetalhe() {
  const { id } = useParams()
  const nav = useNavigate()
  const data = id ? detalhes[id] : undefined

  return (
    <section className="card p-6 md:p-10">
      {!data ? (
        <div>
          <div className="text-xl font-semibold">Pergunta não encontrada.</div>
          <button className="btn mt-4" onClick={() => nav('/faq')}>Voltar ao FAQ</button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold">{data.title}</h2>
          <p className="muted mt-2 max-w-3xl">{data.body}</p>
          <button className="btn mt-4" onClick={() => nav('/faq')}>Voltar ao FAQ</button>
        </div>
      )}
    </section>
  )
}
