# Vinotha S — Python Full Stack Developer Portfolio

A responsive, high-performance developer portfolio built with React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start (Local Setup in VS Code)

> **Note on `GEMINI_API_KEY`:** 
> This portfolio is a standalone web application. **You DO NOT need a `GEMINI_API_KEY`** to run this portfolio. You can completely ignore or skip that instruction!

### 1. Prerequisites
- [Node.js](https://nodejs.org) (v18 or higher recommended)

### 2. Running the React App
Open your terminal in the project root directory and run:

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Open the displayed URL (usually `http://localhost:3000` or `http://localhost:5173`) in your browser.

---

## 🌐 Alternative: Zero-Node Static HTML Version
If you prefer not to use `npm` or Node.js at all, a complete standalone HTML/CSS/JS version is ready in the `/portfolio` folder:

1. Open `/portfolio` in VS Code.
2. Open `index.html` with the **Live Server** extension (or double-click `portfolio/index.html` to open directly in any browser).

---

## 📸 Updating Your Profile Photo
- **Interactive UI**: Click the camera/upload icon directly on the avatar in the hero section to upload your photo immediately.
- **Permanent Asset**:
  - For React app: Place your image at `public/images/profile.png`
  - For Static HTML: Place your image at `portfolio/images/profile.png`

---

## 🛠️ Build for Production / GitHub Pages
To create a production-ready build:
```bash
npm run build
```
The output will be generated in the `dist` folder.
