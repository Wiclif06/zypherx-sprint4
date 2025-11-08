
export interface Consulta {
  data: string
  sintomas: string[]
  observacoes: string
}

export interface Paciente {
  id?: number
  nome: string
  cpf: string
  idade: number
  email: string
  status: 'ativo' | 'inativo'
  historico: Consulta[]
}
