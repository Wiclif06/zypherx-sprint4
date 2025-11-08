import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="card p-6 md:p-10 text-center space-y-4">
      <h2 className="text-3xl font-bold text-brand-400">Página não encontrada</h2>

      <p className="text-neutral-400">
        Ops... o conteúdo que você tentou acessar não existe ou foi movido. <br />
        Verifique o endereço digitado ou volte para a página inicial.
      </p>

      <Link to="/" className="inline-flex items-center gap-2 mx-auto btn mt-4">
        {/* Ícone seta (SVG inline) */}
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 19l-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </svg>
        Voltar para a Home
      </Link>

      <div className="pt-6 border-t border-neutral-800 text-sm text-neutral-500">
        ZypherX • Sistema de Gestão Hospitalar © {new Date().getFullYear()}
      </div>
    </section>
  )
}