Planning Poker Estimation Tool

A real‑time, responsive Planning Poker app with 3D card flips, dark/light theme toggle, and collaborative voting built with modern frontend technologies.



🎯 Features

-Create & Join Rooms: Instantly spin up a new room or join via a shareable URL.
-Real‑Time Voting: Socket‑powered live updates as team members cast their cards.
-3D Flip Animations: Beautiful Framer Motion–driven card‑flip effect with upright text on both faces.
-Dark & Light Mode: Class‑based theme toggle with persistent preference in localStorage.
-Name Validation: Prevents room creation/join without entering a display name.



🚀 Tech Stack

-Framework: React 18 + TypeScript
-Bundler: Vite
-Styling: Tailwind CSS v4 (darkMode: 'class')
-Animations: Framer Motion
-Realtime: Socket.io-client
-Routing: React Router v6



🏗️ Project Structure

planning-poker-frontend/
├── public/                # Static assets & index.html
├── src/
│   ├── pages/        # <Lobby /> and <RoomPage />
│   ├── contexts/
│   │   └── RoomContext.tsx # Socket.io context + join/create logic
│   ├── types.ts           # Shared TS types (Room, User)
│   ├── App.tsx            # Layout, theme toggle, Routes
│   ├── main.tsx           # Root render, global CSS import
│   └── index.css          # Tailwind directives + global resets
├── postcss.config.cjs     # PostCSS plugins (tailwindcss, autoprefixer)
├── package.json
└── README.md              # <-- You are here

🛠️ Setup & Development

Clone & Install

1. git clone <repo-url>
2. yarn install
3. run backend service: yarn dev
4. run this project: yarn dev



Theme Persistence
Theme preference stored under localStorage.theme ('light' | 'dark').