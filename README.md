🎵 ZingMP3 Clone — Next.js 15

A modern music streaming app built with Next.js 15, TypeScript, TailwindCSS, and Zustand.

✨ Features
🎧 Audio Player

Persistent playback across pages

Full controls: play, pause, next, previous, volume

Playback modes: shuffle, repeat (one/all)

Interactive progress bar with preview

Real-time visualization of the current track

🎨 User Interface

Modern design with glass effect and gradients

Smooth animations with Framer Motion

Responsive layout (mobile, tablet, desktop)

Multiple themes: dark, light, violet

Intuitive UI inspired by modern streaming platforms

📚 Content Management

Personal library with playlists

Favorites system with sync

Live search with advanced filtering

Radio stations with continuous streaming

Genre-based categories

🛠 Technical Architecture

State management with Zustand

Strict TypeScript for robustness

Next.js 15 optimizations (App Router, Server Components)

Performance-focused with lazy loading

SEO-friendly with dynamic metadata

🚀 Quick Start
Prerequisites

Node.js 18+

npm, yarn, or pnpm

1. Clone the repo
   git clone https://github.com/your-username/zingmp3-nextjs-clone.git
   cd zingmp3-nextjs-clone

2. Install dependencies
   npm install

# or

yarn install

# or

pnpm install

3. Run development server
   npm run dev

# or

yarn dev

# or

pnpm dev

4. Open in browser

Visit http://localhost:3000

📁 Project Structure
src/
├── app/ # Next.js 15 App Router
│ ├── layout.tsx # Main layout with player
│ ├── page.tsx # Home page
│ ├── search/page.tsx # Search page
│ ├── library/page.tsx # User library
│ ├── favorites/page.tsx # Favorites
│ ├── radio/page.tsx # Radio stations
│ ├── providers.tsx # App providers (e.g. toasts)
│ └── globals.css # Global styles
├── components/ # Reusable components
│ ├── MusicPlayer.tsx # Main audio player
│ ├── Sidebar.tsx # Side navigation
│ ├── Header.tsx # Top navigation bar
│ └── ui/ # Base UI components
├── store/ # Zustand stores
│ └── musicStore.ts # Main music store
├── hooks/ # Custom hooks
├── utils/ # Utility functions
└── types/ # TypeScript types

🎯 Technologies Used
Core

Next.js 15
— React framework with App Router

TypeScript
— Static typing

TailwindCSS
— Utility-first CSS

Zustand
— State management

UI / UX

Framer Motion
— Animations

Headless UI
— Accessible UI primitives

Heroicons
— SVG icons

React Hot Toast
— Notifications

Audio

Web Audio API — Native audio processing

HTML5 Audio — Media playback

AudioContext — Advanced audio handling

⚙️ Configuration
Environment variables

Create a .env.local file:

# API Configuration

NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_AUDIO_BASE_URL=https://your-audio-cdn.com

# Feature flags

NEXT_PUBLIC_ENABLE_RADIO=true
NEXT_PUBLIC_ENABLE_DOWNLOADS=false

Theme customization

Edit tailwind.config.js to add custom colors:

theme: {
extend: {
colors: {
primary: {
// your custom colors
}
}
}
}

🎵 Audio Integration
Supported audio sources

Local files (MP3, WAV, OGG)

Remote URLs with CORS

Streaming via REST API

Live radio streams

Example using the store
import { useMusicStore } from '@/store/musicStore';

function MyComponent() {
const {
currentSong,
isPlaying,
playSong,
togglePlayPause
} = useMusicStore();

const handlePlay = () => {
playSong(mySong, myPlaylist, index);
};

return (
<button onClick={handlePlay}>
{isPlaying ? 'Pause' : 'Play'}
</button>
);
}

📱 Responsive Design

The app is fully responsive with optimized breakpoints:

Mobile: < 768px

Tablet: 768px — 1024px

Desktop: > 1024px

🚀 Performance Optimizations
Next.js 15 Features

App Router for optimal routing

Server Components by default

Streaming SSR for fast first paint

Automatic code splitting

Audio Optimizations

Lazy loading of audio assets

Preload metadata for smooth UX

Audio buffer management

Cross-fade between tracks

🔧 Available Scripts

# Development

npm run dev # Dev server
npm run build # Production build
npm run start # Production server
npm run lint # ESLint
npm run type-check # TypeScript type checking

📈 Roadmap
v2.0

User authentication

Cloud sync for playlists

AI-powered recommendations

Offline mode with cache

Social sharing for playlists

v2.1

Real-time audio visualizer

Graphical equalizer

Offline downloads

Synchronized lyrics

Karaoke mode

🤝 Contributing

Fork the repo

Create a feature branch: git checkout -b feature/AmazingFeature

Commit changes: git commit -m 'Add AmazingFeature'

Push to your branch: git push origin feature/AmazingFeature

Open a Pull Request

📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

👨‍💻 Built with ❤️

Inspired by modern streaming platforms — this ZingMP3 clone pushes the boundaries of web audio using the latest React and Next.js technologies.

⭐ If you like this project, please give it a star!
