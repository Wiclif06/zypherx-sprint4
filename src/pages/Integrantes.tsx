import { useState } from 'react'
import { UserCircle2, MapPin, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react'
import type { Integrante } from '@/types'

const integrantes: (Integrante & {
  idade: number
  curso: string
  unidade: string
})[] = [
  {
    nome: 'Gabriel Ambrósio Saraiva',
    rm: '566552',
    turma: '1TDSPY',
    role: 'Estudante',
    idade: 23,
    curso: 'Análise e Desenvolvimento de Sistemas',
    unidade: 'FIAP – Unidade Paulista',
  },
  {
    nome: 'Felipe Wiclif Leal da Silva',
    rm: '563901',
    turma: '1TDSPY',
    role: 'Estudante',
    idade: 19,
    curso: 'Análise e Desenvolvimento de Sistemas',
    unidade: 'FIAP – Unidade Paulista',
  },
  {
    nome: 'Paulo Cesar Oliveira Andrade',
    rm: '563299',
    turma: '1TDSPY',
    role: 'Estudante',
    idade: 21,
    curso: 'Análise e Desenvolvimento de Sistemas',
    unidade: 'FIAP – Unidade Paulista',
  },
]

export default function Integrantes() {
  const [aberto, setAberto] = useState<string | null>(null)

  return (
    <section className="card p-6 md:p-10 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-4">👥 Integrantes do Projeto</h2>
      <p className="text-center text-neutral-400 mb-8">
        Conheça os responsáveis pelo desenvolvimento do sistema <span className="text-brand-400 font-semibold">ZypherX</span>
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrantes.map((i) => (
          <div
            key={i.rm}
            className="border border-neutral-800 rounded-2xl bg-neutral-900/60 p-6 hover:border-brand-500 transition-all duration-300 shadow-lg"
          >
            <div className="flex flex-col items-center text-center">
              <UserCircle2 size={72} className="text-brand-400 mb-2" />
              <h3 className="text-xl font-semibold">{i.nome}</h3>
              <p className="text-sm text-neutral-400">RM: {i.rm} • Turma: {i.turma}</p>
              <p className="text-sm text-brand-400 font-medium mt-1">Cargo: {i.role}</p>

              <button
                onClick={() => setAberto(aberto === i.rm ? null : i.rm)}
                className="mt-3 text-sm flex items-center gap-1 text-brand-300 hover:text-brand-400 transition"
              >
                {aberto === i.rm ? (
                  <>
                    Ocultar detalhes <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    Ver detalhes <ChevronDown size={16} />
                  </>
                )}
              </button>
            </div>

            {aberto === i.rm && (
              <div className="mt-4 border-t border-neutral-800 pt-3 text-sm text-neutral-300 animate-slideUp">
                <p className="flex items-center gap-2 mb-1">
                  <GraduationCap size={16} className="text-brand-400" />
                  <span>Curso: {i.curso}</span>
                </p>
                <p className="flex items-center gap-2 mb-1">
                  <MapPin size={16} className="text-brand-400" />
                  <span>Unidade: {i.unidade}</span>
                </p>
                <p className="flex items-center gap-2">
                  <UserCircle2 size={16} className="text-brand-400" />
                  <span>Idade: {i.idade} anos</span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}