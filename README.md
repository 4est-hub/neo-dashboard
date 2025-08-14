# NASA Near-Earth Objects Viewer

A small project that fetches and displays Near-Earth Objects (NEOs) from NASA's public API. Built with **React**, **TypeScript**, and a **Fastify** server.

## 🚀 How to Run the Project

**⚠️ Requred! Environment Variables**

Fallback 'DEMO_KEY' is not working. You'll need to create a .env file at the root and use your own NASA API Key.

```
NASA_API_KEY=your_key
```

If no key is provided, the project will use NASA’s demo key, which has a limited request quota.

1. **Install dependencies**  
   ```bash
   npm install
   ```

2. **Start the Fastify server** (backend)  
   ```bash
   npm run dev:server
   ```

3. **Start the React app** (frontend)  
   ```bash
   npm run dev
   ```

## ⚙️ Project Boilerplate

This project uses **React** with **TypeScript** for the frontend, **Fastify** for the backend server.

## 💡 Why These Choices?

- **HTML date picker**: Using the native HTML date picker means no extra dependencies, faster loading, and following browser conventions.
- **Minimal dependencies**: No need for libraries like Moment.js or Lodash for this scale of app. Sorting, date handling, and other features were implemented manually.
- **Did Not Use CSS precompiler**: This is a smaller project, but would use SCSS or Tailwind for maintainability in larger projects.

## 🛠 Linting & Formatting

- ESLint is configured for **React**, **React Hooks**, and **TypeScript**.
- Prettier default overrides:
  - Single quotes (`'`)

## 📋 What I Didn’t Get To

- Fixing all linting errors
- Adding server-side caching for NASA API requests
- Move utils to utils folder
- Improve server error handling, currently it always throws a 500 for any issue

## 📂 Project Structure

```
project-root/
├── src/
│   ├── server/     # Fastify backend
│   ├── types/      # Shared TypeScript types
│   ├── components/ # React UI components
│   ├── App.tsx     # Main React app
│   └── ...
├── .env.example    # Example environment variables
├── package.json
└── README.md
```
