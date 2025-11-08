import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

type FAQ = { id: string; q: string; a: string }

const faqs: FAQ[] = [
  {
    id: 'objetivo',
    q: 'Qual é o objetivo principal da ZypherX?',
    a: 'A ZypherX foi criada para digitalizar e centralizar o atendimento de pacientes do Hospital das Clínicas, facilitando a gestão de dados clínicos e o acesso rápido a informações de saúde em ambiente seguro e acessível.',
  },
  {
    id: 'acessibilidade',
    q: 'Como o sistema auxilia pessoas com dificuldade no uso de tecnologia?',
    a: 'A interface da ZypherX foi projetada com foco em usabilidade, utilizando contrastes adequados, textos claros e estrutura simplificada. Além disso, é totalmente responsiva, permitindo acesso fácil por diferentes dispositivos.',
  },
  {
    id: 'integracao',
    q: 'A plataforma está integrada ao sistema Java da Sprint anterior?',
    a: 'Sim. A ZypherX consome a API desenvolvida na disciplina Domain Driven Design Using Java, garantindo a integração total entre o front-end React e o backend Java hospedado externamente.',
  },
  {
    id: 'seguranca',
    q: 'Como os dados dos pacientes são protegidos?',
    a: 'A aplicação segue boas práticas de segurança, com autenticação de acesso à API, criptografia nas conexões e políticas de controle de dados em conformidade com a LGPD.',
  },
  {
    id: 'vercel',
    q: 'Como o sistema é disponibilizado online?',
    a: 'O deploy da aplicação é realizado na plataforma Vercel, garantindo alta disponibilidade e integração direta com o repositório GitHub da equipe.',
  },
  {
    id: 'colaboracao',
    q: 'Quem participou no desenvolvimento do projeto?',
    a: 'O projeto foi desenvolvido pelos alunos Gabriel Ambrósio Saraiva, Felipe Wiclif Leal da Silva e Paulo Cesar Oliveira Andrade, turma 1TDSPY, na Sprint 4 de Front-End Design Engineering da FIAP.',
  },
]

export default function FAQ() {
  const [ativo, setAtivo] = useState<string | null>(null)
  const toggle = (id: string) => setAtivo(ativo === id ? null : id)

  return (
    <section className="card p-8 md:p-12 max-w-4xl mx-auto animate-fadeIn">
      {/* Cabeçalho */}
      <div className="flex items-center justify-center mb-6">
        <HelpCircle size={32} className="text-brand-400 mr-2" />
        <h2 className="text-3xl font-extrabold">Perguntas Frequentes (FAQ)</h2>
      </div>
      <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-10">
        Aqui estão as principais dúvidas sobre o funcionamento da plataforma <b>ZypherX</b>.  
        Clique em uma pergunta para visualizar sua resposta.
      </p>

      {/* FAQ Lista */}
      <div className="space-y-4">
        {faqs.map((faq) => {
          const aberto = ativo === faq.id
          return (
            <div
              key={faq.id}
              className={`border border-neutral-800 rounded-2xl bg-neutral-900/50 hover:border-brand-500 transition-all duration-300 p-5 ${
                aberto ? 'shadow-md shadow-brand-500/10' : ''
              }`}
            >
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggle(faq.id)}
              >
                <h3
                  className={`text-lg font-semibold ${
                    aberto ? 'text-brand-400' : 'text-neutral-200'
                  }`}
                >
                  {faq.q}
                </h3>
                {aberto ? (
                  <ChevronUp size={22} className="text-brand-400" />
                ) : (
                  <ChevronDown size={22} className="text-neutral-400" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  aberto ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <footer className="mt-10 text-center text-neutral-500 text-sm">
        <p>Hospital das Clínicas – Unidade Digital | Projeto ZypherX 2025 • FIAP</p>
      </footer>
    </section>
  )
}