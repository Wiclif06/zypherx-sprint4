
import { Routes, Route, useNavigate } from 'react-router-dom'
<Route path="/pacientes" element={<Pacientes />} />
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import Home from '@/pages/Home'
import Sobre from '@/pages/Sobre'
import Integrantes from '@/pages/Integrantes'
import FAQ from '@/pages/FAQ'
import FAQDetalhe from '@/pages/FAQDetalhe'
import Contato from '@/pages/Contato'
import Pacientes from '@/pages/Pacientes'
import NotFound from '@/pages/NotFound'

export default function App() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100">
      <Header onGoHome={() => navigate('/')} />
      <main id="conteudo-principal" className="flex-1 container-responsive py-8 space-y-8">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/sobre" element={<Sobre/>} />
            <Route path="/integrantes" element={<Integrantes/>} />
            <Route path="/faq" element={<FAQ/>} />
            <Route path="/faq/:id" element={<FAQDetalhe/>} />
            <Route path="/contato" element={<Contato/>} />
            <Route path="/pacientes" element={<Pacientes/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}