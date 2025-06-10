# Editor.io

A modern in-browser **HTML/CSS/JS + Markdown** editor with live preview, theming, and persistence.

---

## 🚀 Features

* 🧠 Live editing and instant preview for:

  * HTML, CSS, and JavaScript
  * Markdown with GitHub-flavored rendering
* 🎨 Theme support for the editor (light/dark + more coming)
* 💾 Autosave with toggle: save to `localStorage` or remote database
* 👤 User authentication powered by Clerk
* 📥 Import / 📤 Download markdown files

---

## 🛠️ Tech Stack

Built using modern web tools:

* **Next.js 15** (App Router)
* **TailwindCSS** & **shadcn/ui** (UI components)
* **Clerk** (auth)
* **Prisma + PostgreSQL** (DB for saved code snippets)
* **CodeMirror 6** via `@uiw/react-codemirror`
* **react-syntax-highlighter**, **github-markdown-css** (Markdown display)

---

## 🧪 Local Development

```bash
# 1. Clone the repo
$ git clone https://github.com/daanish04/editor.io.git
$ cd editor.io

# 2. Install dependencies
$ npm install

# 3. Set up environment
$ cp .env.example .env.local
# fill in env values (Clerk, DB, etc.)

# 4. Generate Prisma Client
$ npx prisma generate

# 5. Run dev server
$ npm run dev
```
---

## 🔐 Auth & Environment

Ensure the following environment variables are set in your `.env.local` file:

### 📄 `.env.example`

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/signin
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup

# Prisma + Database (PostgreSQL assumed)
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
DIRECT_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
```

---

## 📦 Deployment

Live: [editor-io-nine.vercel.app](https://editor-io-nine.vercel.app/)


