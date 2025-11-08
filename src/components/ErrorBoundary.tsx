
import React from 'react'

type Props = { children: React.ReactNode }
type State = { hasError: boolean; error?: any }

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props); this.state = { hasError: false }
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error }
  }
  componentDidCatch(error: any, info: any) {
    console.error('Erro capturado pelo ErrorBoundary:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <section className="card p-6 md:p-10">
          <h2 className="text-2xl font-bold">Algo deu errado</h2>
          <p className="muted mt-2">Atualize a página ou retorne à Home.</p>
          <pre className="mt-4 whitespace-pre-wrap text-xs bg-neutral-950/60 p-3 rounded-lg border border-neutral-800 overflow-auto">{String(this.state.error)}</pre>
        </section>
      )
    }
    return this.props.children
  }
}
