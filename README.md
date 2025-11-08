
ZypherX — Front-End Design Engineering — Sprint 4

SPA construída com React + Vite + TypeScript e TailwindCSS (apenas), com rotas estáticas e dinâmicas, tipagem avançada, e CRUD consumindo API via `fetch` nativo (sem Axios).

Atenção: Para cumprir a Sprint 4, publique a API Java (DDD) externamente e defina a variável `VITE_API_URL` no `.env` deste projeto.

Como rodar

1) Instalar dependências
npm install
npx json-server --watch db.json --port 3001

2) Duplicar .env.example -> .env e ajustar a URL
cp .env.example .env

3) Executar
npm run dev

Integração com API (Java DDD)

- Serviço central: `src/services/api.ts` com CRUD de Pacientes (`GET/POST/PUT/DELETE`).  
- Sem Axios (apenas `fetch`).  
- Tratamento de erros e feedback ao usuário.  

Páginas obrigatórias
- Home (`/`)
- Sobre (`/sobre`)
- Integrantes (`/integrantes`) — com Nome, RM e Turma
- FAQ (`/faq`) e rota dinâmica em `/faq/:id`
- Contato (`/contato`)

Página extra: Pacientes (`/pacientes`) — demonstra a integração com API.

Integrantes

- Gabriel Ambrósio Saraiva — RM 566552 — Turma 1TDSPY
- Felipe Wiclif Leal da Silva — RM 563901 — Turma 1TDSPY
- Paulo Cesar Oliveira Andrade — RM 563299 — Turma 1TDSPY

Link do GitHub: https://github.com/Wiclif06/zypherx-sprint4
Video do Sistema: https://youtu.be/nq5JTSTPzMo

Acessibilidade & Usabilidade
Contrast ratio alto (tema dark), foco visível, semântica, feedback textual em operações.
Layout fluido com `container-responsive` e cards.

Estrutura de pastas

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
