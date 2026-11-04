# Parmanand Jha — Personal Portfolio & Green Flag Club

A modern, high-performance personal portfolio website built for **Parmanand Jha**, Class 12 Computer Science student at Arniko Awasiya Secondary School, Biratnagar, Nepal, and Founder of the **Green Flag Club**.

---

## 🚀 Features

- **Modern Dark Aesthetic**: Sleek typography (Inter, Instrument Serif, JetBrains Mono) with ambient glow effects and a custom chemical litmus gradient.
- **Interactive Litmus Test (Philosophy)**: An interactive pH simulator reflecting Parmanand's motto of balancing curiosity and challenge like a chemical equilibrium.
- **Academic Stats & GPA Trajectory**: Dynamic SVG charts and animated counters showcasing his academic progression:
  - Class 10 (SEE): `3.60 GPA`
  - Class 11 (+2 Science): `3.82 GPA`
  - Class 12 (Target): `3.96 GPA`
  - Harvard CS50 Web Development coursework
- **3-Chapter Journey Timeline**: Clean roadmap covering foundation, current coursework (6 subjects), and upcoming graduation in Chaitra 2083 B.S.
- **Green Flag Club Showcase**: Dedicated section outlining the student tech initiative (coding workshops, hackathons, and AI mentorship — strictly software).
- **Embedded Portfolio Assistant**: A secure, fast, in-browser Q&A bot answering visitor questions without requiring external API keys.
- **Quick Contact Actions**: Direct email launch, one-click email copy with clipboard feedback, and social links.
- **Modern Web Standards**: Built with progressive enhancement, IME-safe inputs, high-priority LCP hero image loading, and smooth responsive layout.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Bundler**: [Vite 5](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📦 Project Structure

```text
parmanand-portfolio/
├── public/
│   └── image.png             # Hero & profile portrait
├── src/
│   ├── components/
│   │   ├── About.tsx         # Philosophy & interactive litmus test
│   │   ├── AskBot.tsx        # Client-side portfolio Q&A assistant
│   │   ├── Club.tsx          # Green Flag Club overview & roadmap
│   │   ├── Contact.tsx       # Contact buttons & social cards
│   │   ├── Footer.tsx        # Footer navigation
│   │   ├── Hero.tsx          # Hero section with portrait & ticker
│   │   ├── Journey.tsx       # 3-chapter timeline & subject breakdown
│   │   ├── Nav.tsx           # Floating sticky navbar with mobile menu
│   │   ├── SectionHeading.tsx# Reusable section headers
│   │   └── Stats.tsx         # GPA graph & animated stat counters
│   ├── data.ts               # Content, links, subjects, and bot Q&A knowledge base
│   ├── hooks.ts              # Intersection observer & count-up animations
│   ├── index.css             # Tailwind layers, gradients, and scroll effects
│   ├── main.tsx              # React DOM entry point
│   └── App.tsx               # Main layout orchestrator
├── index.html                # HTML entry point with meta tags & fonts
├── tailwind.config.js        # Custom colors, fonts, and animation configs
├── tsconfig.json             # TypeScript compiler settings
└── package.json              # Project dependencies & scripts
```

---

## 💻 Getting Started Locally

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
This checks types and creates an optimized static build in the `dist/` folder.

---

## 🌐 How to Deploy Online (Free)

### Method 1: Netlify Drop (Fastest — 2 Minutes, No Git Required)
1. Run `npm run build` to generate the `dist` folder.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist/` folder into the upload box.
4. Your website is instantly live with a free `.netlify.app` URL!

---

### Method 2: Vercel with GitHub (Recommended for Automatic Updates)
1. Initialize Git in the project root:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Parmanand Jha portfolio"
   git branch -M main
   ```
2. Create a new repository on [GitHub](https://github.com/new) named `parmanand-portfolio`.
3. Push your repository:
   ```bash
   git remote add origin https://github.com/parmanandjha/parmanandjha.portfolio.git
   git push -u origin main
   ```
4. Sign in to [Vercel](https://vercel.com/) with GitHub.
5. Click **Add New** → **Project**, select `parmanand-portfolio`, and click **Deploy**.
6. Every time you push changes to GitHub, Vercel will rebuild and update your site automatically!

---

## ✏️ How to Update Content

All main texts, links, and bot knowledge are centralized in:
👉 [`src/data.ts`](src/data.ts)

- Update personal details (email, LinkedIn, Instagram) under `PROFILE`.
- Update subjects, GPAs, or CS50 topics under `SUBJECTS`, `GPA_TRAJECTORY`, and `CS50_TOPICS`.
- Add or modify chatbot responses under `INTENTS`.

---

## 👤 Author

**Parmanand Jha**
- GitHub: [github.com/parmanandjha](https://github.com/parmanandjha)
- Repository: [github.com/parmanandjha/parmanandjha.portfolio](https://github.com/parmanandjha/parmanandjha.portfolio)
- School: Arniko Awasiya Secondary School, Biratnagar, Nepal
- Email: [parmanandjha030@gmail.com](mailto:parmanandjha030@gmail.com)
- Instagram: [@org.parmanand](https://www.instagram.com/org.parmanand)
