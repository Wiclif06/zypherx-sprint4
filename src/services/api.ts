
import type { Paciente } from '@/types'

const BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:3001'

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init
  })
  if (!res.ok) throw new Error(`Erro ${res.status}`)
  return res.status === 204 ? (undefined as unknown as T) : (await res.json() as T)
}

export const PacientesAPI = {
  list: async () => {
    const data = await http<Paciente[]>('/pacientes')
    return { items: data, total: data.length }
  },
  get: (id: number | string) => http<Paciente>(`/pacientes/${id}`),
  create: (payload: Omit<Paciente,'id'>) => http<Paciente>('/pacientes', { method:'POST', body: JSON.stringify(payload) }),
  update: (id: number | string, payload: Partial<Paciente>) => http<Paciente>(`/pacientes/${id}`, { method:'PUT', body: JSON.stringify(payload) }),
  remove: (id: number | string) => http<void>(`/pacientes/${id}`, { method:'DELETE' }),
}
