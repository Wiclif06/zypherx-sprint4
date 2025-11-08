
# ZypherX — Front-End Design Engineering — Sprint 4

SPA construída com **React + Vite + TypeScript** e **TailwindCSS (apenas)**, com **rotas estáticas e dinâmicas**, **tipagem avançada**, e **CRUD** consumindo **API** via `fetch` nativo (sem Axios).

> **Atenção**: Para cumprir a Sprint 4, **publique a API Java (DDD) externamente** e defina a variável `VITE_API_URL` no `.env` deste projeto.

## ✅ Como rodar

```bash
# 1) Instalar dependências
npm install

# 2) Duplicar .env.example -> .env e ajustar a URL
cp .env.example .env

# 3) Executar
npm run dev
```

## 🌐 Deploy (Vercel)

1. Faça **push** para o GitHub (branch `main`).
2. No painel da **Vercel**, importe o repositório.
3. Em **Environment Variables**, crie `VITE_API_URL=https://SUA_API_PUBLICA/api` e (opcional) `VITE_USE_MOCK=false`.
4. Faça o deploy e **coloque a URL gerada aqui** no README (abaixo).

**URL pública:** _adicione aqui após o deploy_

## 🔌 Integração com API (Java DDD)

- Serviço central: `src/services/api.ts` com **CRUD de Pacientes** (`GET/POST/PUT/DELETE`).  
- **Sem Axios** (apenas `fetch`).  
- Tratamento de erros e feedback ao usuário.  
- Variáveis:
  - `VITE_API_URL` → ex.: `https://seu-backend.com/api`
  - `VITE_USE_MOCK` → `true` para desenvolvimento local sem backend (desative em produção).

## 📚 Páginas obrigatórias
- Home (`/`)
- Sobre (`/sobre`)
- Integrantes (`/integrantes`) — com Nome, RM e Turma
- FAQ (`/faq`) e **rota dinâmica** em `/faq/:id`
- Contato (`/contato`)

> Página extra: **Pacientes** (`/pacientes`) — demonstra a integração com API.

## 👥 Integrantes

- Gabriel Ambrósio Saraiva — **RM 566552** — Turma **1TDSPY**  
- Felipe Wiclif Leal da Silva — **RM 563901** — Turma **1TDSPY**  
- Paulo Cesar Oliveira Andrade — **RM 563299** — Turma **1TDSPY**  

## 🧩 Critérios de avaliação — Como este projeto atende

- **Rotas estáticas e dinâmicas** (passagem de parâmetros em `/faq/:id`) ✅  
- **Navegação/Redirecionamento** com feedbacks e página 404→redirect (`*` → `/`) ✅  
- **Tipos específicos**: `number`, `string`, `boolean`, `object`; **Union Types**, **Intersection**, **Interface** em `src/types.ts` ✅  
- **TailwindCSS**: responsivo XS/SM/MD/LG/XL com utilitários e componentes ✅  
- **Integração de API**: CRUD completo de Pacientes via `fetch` nativo, manipulação de dados, tratamento de erros ✅  
- **Versionamento**: recomenda-se mínimo de 5 commits por aluno; inclua o link do GitHub abaixo ✅  
- **Deploy** na Vercel: instruções acima; inclua a URL no topo do README ✅  

**Link do GitHub:** _adicione aqui_  
**Link do vídeo (YouTube, até 3 min):** _adicione aqui_

## 💡 Acessibilidade & Usabilidade
- Contrast ratio alto (tema dark), foco visível, semântica, feedback textual em operações.
- Layout fluido com `container-responsive` e cards.

## 📂 Estrutura de pastas
```
/src
  /components
    Footer.tsx
    Header.tsx
  /pages
    Home.tsx
    Sobre.tsx
    Integrantes.tsx
    FAQ.tsx
    FAQDetalhe.tsx
    Contato.tsx
    Pacientes.tsx
  /services
    api.ts
  index.css
  main.tsx
  App.tsx
```

---

> **Observação importante**: Para a avaliação, entregue um **.zip** contendo **todo o repositório com histórico (`.git`) e sem `node_modules`**. Este pacote aqui é apenas o **front-end**.


## ✅ Checklist da Rubrica (FIAP Sprint 4)
- [x] Reestruturação para **React + Vite + TypeScript**
- [x] **Rotas estáticas e dinâmicas** (`/faq/:id`) com navegação
- [x] **Tipos**: number, string, boolean, object + **Union** + **Intersection** + **Interface**
- [x] **TailwindCSS only**, responsividade **XS/SM/MD/LG/XL**
- [x] **Integração de API** (fetch nativo; GET/POST/PUT/DELETE) e **tratamento de erros**
- [x] **Acessibilidade**: Skip to content, contraste, foco visível, semântica
- [x] **Páginas obrigatórias**: Home, Sobre, Integrantes (Nome/RM/Turma), FAQ (+ dinâmica), Contato
- [x] **README.md** completo, com links de GitHub, Vercel e YouTube (até 3min)
- [x] **Sem frameworks proibidos** (Axios/Bootstrap/Carrossel/Acordion)
- [x] **ZIP final** sem `node_modules` e com branch `main` (histórico .git no envio final — ver instruções da disciplina)

## 🎬 Roteiro para o Vídeo (até 3 min)
1. **Introdução (10s)** — Grupo e objetivo do projeto **ZypherX**.
2. **Navegação (40s)** — Home, Sobre, Integrantes, FAQ e uma pergunta dinâmica (`/faq/api`).
3. **CRUD (60s)** — Em **/pacientes**: criar, editar e remover (mostrar mensagens de sucesso/erro).
4. **Responsividade (20s)** — Reduzir a janela e mostrar XS→XL.
5. **API (20s)** — Mostrar `.env` com `VITE_API_URL` apontando para a API Java **pública**.
6. **Encerramento (10s)** — URL Vercel + Link GitHub no README.
