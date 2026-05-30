# VOX.IA — Site institucional

Site de apresentação da **VOX.IA** (voxiatec.com.br) — Edge AI e dispositivos com IA integrada.
Single-page em **React + Vite**, pronto para deploy na Vercel.

---

## 🚀 Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

```bash
npm run build     # gera a pasta dist/
npm run preview   # testa o build de produção localmente
```

---

## ☁️ Deploy na Vercel

### Opção A — via Git (recomendado)

1. Suba o projeto para um repositório no GitHub/GitLab.
2. Em [vercel.com](https://vercel.com) → **Add New → Project** → importe o repositório.
3. A Vercel detecta o Vite automaticamente. Confirme:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. **Deploy.** A cada `git push` o site reimplanta sozinho.

### Opção B — via CLI

```bash
npm i -g vercel
vercel          # primeiro deploy (preview)
vercel --prod   # publica em produção
```

---

## 🌐 Configurar o domínio voxiatec.com.br

1. No painel do projeto na Vercel: **Settings → Domains → Add**.
2. Adicione `voxiatec.com.br` **e** `www.voxiatec.com.br`.
3. A Vercel mostra os registros DNS. No painel do seu provedor do domínio (.br):

| Tipo  | Nome  | Valor                  |
|-------|-------|------------------------|
| A     | `@`   | `76.76.21.21`          |
| CNAME | `www` | `cname.vercel-dns.com` |

> ⚠️ Os valores exatos são os que a **própria Vercel exibir** na hora — use sempre os de lá, pois podem mudar. Se preferir, você pode apontar os **nameservers** do domínio para a Vercel em vez dos registros A/CNAME.

4. Defina `voxiatec.com.br` como domínio principal e o `www` como redirect (ou vice-versa).
5. O certificado SSL (HTTPS) é emitido automaticamente. Propagação de DNS leva de alguns minutos a algumas horas.

---

## ✏️ O que personalizar

Tudo está em **`src/App.jsx`** (conteúdo + estilo embutidos). Pontos rápidos:

- **E-mail:** constante `EMAIL` no topo do componente (já em `gustavorodrigues@voxiatec.com.br`).
- **LinkedIn / GitHub:** seção "Fundador" — troque os `href="https://..."` pelos seus links reais.
- **Produtos / textos:** seções `produtos`, `tese`, `tecnologia`.
- **Cores e fontes:** bloco `CSS` no topo do `App.jsx` (variáveis em `:root`).
- **Imagem de prévia (Open Graph):** adicione um `og:image` em `index.html` quando tiver uma arte de compartilhamento.

---

Feito por Gustavo Rodrigues · CTO & Founder, VOX.IA
