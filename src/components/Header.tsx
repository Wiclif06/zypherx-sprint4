
import { NavLink, useLocation } from 'react-router-dom'
import { SkipLink } from '@/components/SkipLink'

export function Header({ onGoHome }: { onGoHome: () => void }) {
  const loc = useLocation()
  const items = [
    { href: '/', label: 'Home' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/integrantes', label: 'Integrantes' },
    { href: '/faq', label: 'FAQ' },
    { href: '/pacientes', label: 'Pacientes' },
    { href: '/contato', label: 'Contato' },
  ]
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <SkipLink/>
      <div className="container-responsive flex items-center justify-between py-4">
        <button onClick={onGoHome} className="text-xl font-bold tracking-tight hover:text-brand-400 transition" aria-label="Ir para Home">
          ZypherX
        </button>
        <nav className="flex items-center gap-2 text-sm" aria-label="Principal">
          {items.map(({href,label})=>{
            const active = loc.pathname === href || (href !== '/' && loc.pathname.startsWith(href))
            return (
              <NavLink key={href} to={href} className={`btn ${active ? 'border-brand-500' : ''}`} aria-current={active ? 'page' : undefined}>
                {label}
              </NavLink>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
