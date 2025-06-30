
# 🔮 Descobridor de Idades

Uma aplicação simples feita com **SvelteKit** que estima a idade de uma pessoa com base em seu nome, utilizando a [API Agify.io](https://agify.io/).

> Projeto desenvolvido como parte de um teste técnico.

---

## 📺 Demonstração

🖥️ [Acesse o app em produção (Vercel)](https://sveltekit-agify.vercel.app/)

---

## ✨ Funcionalidades

- Input de texto para digitar o nome da pessoa.
- Consulta automática à API (com **debounce de 1 segundo**).
- Exibição da idade estimada de forma visual e animada.
- A URL é atualizada dinamicamente com a query `?name=`, permitindo compartilhamento direto do resultado.
- Feedback de carregamento com animação de **spinner**.
- Estilização customizada com CSS puro (sem bibliotecas externas).

---

## 🧪 Como testar localmente

```bash
# Clone o repositório
git clone https://github.com/luisdandolini/sveltekit-agify.git

# Acesse a pasta do projeto
cd sveltekit-agify

# Instale as dependências
npm install

# Rode a aplicação
npm run dev
