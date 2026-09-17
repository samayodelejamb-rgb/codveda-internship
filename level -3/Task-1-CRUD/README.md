# NoteBuddy

A full-stack note-taking app — create, edit, search, favorite, and trash notes.

Built as a Level 3 Advanced Web Development task: React frontend, Express/Node backend, full CRUD. Notes are stored in a local JSON file on the server (`server/data/notes.json`) — no external database to set up.

## Stack

- **Frontend:** React (Vite), Axios
- **Backend:** Node.js, Express
- **Storage:** local JSON file

## Project Structure

```text
NoteBuddy/
├── client/
│   ├── src/
│   │   ├── api/notes.js
│   │   ├── components/
│   │   ├── utils/time.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── server/
│   ├── data/notes.json
│   ├── models/Note.js
│   ├── controllers/notesController.js
│   ├── routes/notes.js
│   ├── store.js
│   ├── seed.js
│   └── server.js
│
└── README.md
```

## Setup

Requires Node 18+. No database installation needed.

**Backend**

```bash
cd server
npm install
copy .env.example .env
npm run dev
```

Runs on `http://localhost:5000`. Optionally seed sample data:

```bash
node seed.js
```

**Frontend**

In a second terminal:

```bash
cd client
npm install
copy .env.example .env
npm run dev
```

Runs on `http://localhost:5173`.

## API

Base URL: `/api/notes`

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/` | List notes — `?view=all\|favorites\|trash&search=text` |
| GET | `/:id` | Get one note |
| POST | `/` | Create a note |
| PUT | `/:id` | Update title/content |
| PATCH | `/:id/favorite` | Toggle favorite |
| PATCH | `/:id/trash` | Move to trash |
| PATCH | `/:id/restore` | Restore from trash |
| DELETE | `/:id` | Permanently delete |
