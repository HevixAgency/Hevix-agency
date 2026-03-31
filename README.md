# Hevix Agency - Landing Page

Uma landing page moderna para a Hevix Agency com formulário de leads integrado ao Supabase.

## 🚀 Deploy no Vercel

### 1. Configuração do Supabase
1. Crie um projeto no [Supabase](https://supabase.com)
2. Crie a tabela `leads` com as seguintes colunas:
   - `id` (uuid, primary key, default: gen_random_uuid())
   - `nome` (text)
   - `empresa` (text)
   - `whatsapp` (text)
   - `email` (text)
   - `faturamento` (text)
   - `desafio` (text)
   - `created_at` (timestamp, default: now())

### 2. Deploy no Vercel
1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente:
   - `SUPABASE_URL` = URL do seu projeto Supabase
   - `SUPABASE_SERVICE_KEY` = Service Role Key (não anon key)
3. Deploy automático

### 3. Estrutura do Projeto
```
/app
  /api/lead.ts          # API serverless para leads
  /src
    /sections/LeadForm.tsx  # Formulário de leads
    /App.tsx               # App principal
```

## 🛠️ Desenvolvimento Local

```bash
npm install
npm run dev
```

## 📋 Funcionalidades

- ✅ Formulário responsivo com validação
- ✅ Integração com Supabase via API serverless
- ✅ Animações GSAP
- ✅ Design moderno com Tailwind CSS
- ✅ TypeScript completo
- ✅ Deploy pronto para Vercel

## 🔧 Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- GSAP
- Vercel Functions

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
