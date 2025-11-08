
import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <section className="card p-6 md:p-10">
      <h2 className="text-2xl font-bold">Página não encontrada</h2>
      <p className="muted mt-2">O caminho informado não existe. Utilize o menu para navegar.</p>
      <Link to="/" className="btn mt-4">Voltar para Home</Link>
    </section>
  )
}
