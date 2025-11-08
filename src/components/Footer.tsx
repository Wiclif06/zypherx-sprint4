
export function Footer() {
  return (
    <footer className="mt-10 border-t border-neutral-800 bg-neutral-950">
      <div className="container-responsive py-8 text-sm text-neutral-400 grid md:grid-cols-3 gap-8">
        <div>
          <div className="text-neutral-200 font-semibold">ZypherX</div>
          <p className="mt-2">HC Digital — Sprint 4 (Front-End Design Engineering). SPA com React + Vite + TypeScript + Tailwind.</p>
        </div>
        <div>
          <div className="text-neutral-200 font-semibold">Páginas obrigatórias</div>
          <ul className="mt-2 space-y-1">
            <li>Home</li>
            <li>Integrantes</li>
            <li>Sobre</li>
            <li>FAQ (com rota dinâmica)</li>
            <li>Contato</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-800 text-center py-4 text-xs text-neutral-500">
        © {new Date().getFullYear()} ZypherX. Todos os direitos reservados.
      </div>
    </footer>
  )
}
