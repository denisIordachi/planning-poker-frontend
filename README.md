# Planning Poker Estimation Tool

A real‑time, responsive Planning Poker app with ✨3D card flips✨, dark/light theme toggle, and collaborative voting built with modern frontend technologies.

---

## 🎯 Features

* **Create & Join Rooms**: Spin up a new room or join via a shareable URL.
* **Real‑Time Voting**: Live updates powered by Socket.io.
* **3D Flip Animations**: Framer Motion–driven card flips with upright text.
* **Dark & Light Mode**: Class-based toggle with preference saved in `localStorage`.
* **Responsive Layout**: Adaptive grid (2 columns on xs, 3 on sm, 4 on md+).
* **Name Validation**: Disables actions until a display name is entered.

---

## 🚀 Tech Stack

* **React 18** + **TypeScript**
* **Vite** (dev server & build)
* **Tailwind CSS v4** (`darkMode: 'class'`)
* **Framer Motion** (animations)
* **Socket.io-client** (realtime)
* **React Router v6** (routing)

---

## 🏗️ Project Structure

```
planning-poker-frontend/
├── public/                 # Static assets & index.html
├── src/
│   ├── components/         # <Lobby />, <RoomPage />
│   ├── contexts/           # RoomContext (Socket.io logic)
│   ├── types.ts            # TS types (Room, User)
│   ├── App.tsx             # Layout, theme toggle, routes
│   ├── main.tsx            # Root render, global CSS import
│   └── index.css           # Tailwind directives & global resets
├── tailwind.config.cjs     # Tailwind config
├── postcss.config.cjs      # PostCSS plugins
├── package.json
└── README.md               # This file
```

---

## 🛠️ Setup & Development

1. **Clone & Install**

   ```bash
   git clone https://github.com/denisIordachi/planning-poker-frontend.git
   cd planning-poker-frontend
   npm install
   ```

2. **Start Frontend**

   ```bash
   npm run dev
   ```

   Opens at [http://localhost:5173](http://localhost:5173).

3. **Build for Production**

   ```bash
   npm run build
   ```

   Output in `dist/` ready to deploy.

---

## 🔧 Backend Setup (Separate Repo)

A companion backend repo (`planning-poker-backend`) handles Socket.io server logic. To set it up:

```bash
git clone https://github.com/denisIordachi/planning-poker-backend.git
cd planning-poker-backend
npm install
npm run dev   # starts server on configured port
```

Then point the frontend to the server via `.env`:

```
VITE_SOCKET_URL=http://localhost:4000
```

---

## ⚙️ Configuration

* **Socket URL**: `import.meta.env.VITE_SOCKET_URL` (defaults to `http://localhost:4000`).
* **Theme**: stored under `localStorage.theme` (`'light'` or `'dark'`).

---

## 🤝 Contributing

Contributions welcome! Please open issues or PRs, follow code style, and include clear commit messages.

---

## 📄 License

[MIT](LICENSE) © Denis Iordachi
