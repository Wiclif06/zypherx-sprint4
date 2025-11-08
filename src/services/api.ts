
import type { ApiList, ID, Paciente, WithTimestamps } from '@/types'

const BASE_URL = import.meta.env.VITE_API_URL as string | undefined
const USE_MOCK = (import.meta.env.VITE_USE_MOCK ?? 'false') === 'true'

// util
async function http<T>(path: string, init?: RequestInit): Promise<T> {
  if (!BASE_URL && !USE_MOCK) {
    throw new Error('VITE_API_URL não configurada e modo mock desativado. Configure o .env ou ative VITE_USE_MOCK=true.')
  }
  if (USE_MOCK) return mockFetch<T>(path, init)

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Erro ${res.status} – ${res.statusText} ${text}`)
  }
  if (res.status === 204) return undefined as unknown as T
  return res.json() as Promise<T>
}

// CRUD Pacientes — exemplo para avaliação
export const PacientesAPI = {
  list: () => http<ApiList<WithTimestamps<Paciente>>>('/pacientes'),
  get: (id: ID) => http<WithTimestamps<Paciente>>(`/pacientes/${id}`),
  create: (payload: Omit<Paciente, 'id'>) =>
    http<WithTimestamps<Paciente>>('/pacientes', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  update: (id: ID, payload: Partial<Paciente>) =>
    http<WithTimestamps<Paciente>>(`/pacientes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),
  remove: (id: ID) =>
    http<void>(`/pacientes/${id}`, { method: 'DELETE' })
}

// ---------------- MOCK (para desenvolvimento sem backend) ----------------
// Este mock deve ser DESATIVADO em produção para cumprir a Sprint 4
type Any = any
const mockDB: { pacientes: Any[] } = {
  pacientes: [
    { id: 1, nome: 'Ana Souza', idade: 29, email: 'ana@exemplo.com', status: 'ativo', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 2, nome: 'Carlos Lima', idade: 42, email: 'carlos@exemplo.com', status: 'ativo', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 3, nome: 'Mariana Alves', idade: 35, email: 'mariana@exemplo.com', status: 'inativo', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  ]
}

async function mockFetch<T>(path: string, init?: RequestInit): Promise<T> {
  await new Promise(r => setTimeout(r, 200)) // simular latência
  const url = new URL(path, 'http://mock.local')
  const [, recurso, id] = url.pathname.split('/')

  if (recurso === 'pacientes') {
    if (!id) {
      if (!init || init.method === undefined || init.method === 'GET') {
        return { items: mockDB.pacientes, total: mockDB.pacientes.length } as T
      }
      if (init.method === 'POST' && init.body) {
        const payload = JSON.parse(init.body.toString())
        const novo = { id: Date.now(), ...payload, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
        mockDB.pacientes.push(novo)
        return novo as T
      }
    } else {
      const idx = mockDB.pacientes.findIndex(p => String(p.id) == String(id))
      if (idx < 0) throw new Error('Paciente não encontrado (mock)')
      if (!init || init.method === 'GET') {
        return mockDB.pacientes[idx] as T
      }
      if (init.method === 'PUT' && init.body) {
        const payload = JSON.parse(init.body.toString())
        mockDB.pacientes[idx] = { ...mockDB.pacientes[idx], ...payload, updatedAt: new Date().toISOString() }
        return mockDB.pacientes[idx] as T
      }
      if (init.method === 'DELETE') {
        mockDB.pacientes.splice(idx, 1)
        return undefined as T
      }
    }
  }
  throw new Error('Recurso mock não mapeado: ' + path)
}
