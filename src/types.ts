
// Tipos básicos exigidos no critério
export type ID = string | number;
export interface Integrante {
  nome: string;
  rm: string;
  turma: string;
  role?: 'Dev' | 'Design' | 'PM' | 'Data' | 'QA'; // Union type
}

export type Status = 'ativo' | 'inativo'; // Union

export interface Paciente {
  id: ID;
  nome: string;
  idade: number;
  email: string;
  status: Status;
}

// Intersection type: recurso com timestamps
export type WithTimestamps<T> = T & { createdAt: string; updatedAt: string };

export interface ApiList<T> { items: T[]; total: number; }
