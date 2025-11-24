# Legal Refund Quiz Landing Page

## Overview

This is a high-conversion landing page and quiz application for a US-based legal firm specializing in recovering money from financial scammers (crypto exchanges, brokers, online casinos, and financial pyramids). The application uses a single-page quiz flow to collect lead information and assess recovery probability, with a focus on premium fintech design and trust-building.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript as the primary UI framework
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight React Router alternative)
- Tailwind CSS for utility-first styling with custom design system

**UI Component Library**
- shadcn/ui component library built on Radix UI primitives
- Custom components following the "new-york" style variant
- Design tokens defined in CSS variables for theming
- Glassmorphism effects, gradient buttons, and smooth animations per design guidelines

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management
- React Hook Form with Zod validation for form handling
- Local component state for UI interactions (quiz progress, exit intent popup)

**Design System**
- Custom color scheme: Deep sapphire (#0A2540), bright cyan (#00D4FF), purple (#6E56CF)
- Typography: Inter for headings/body, Manrope for buttons
- Border radius: 16-24px for premium feel
- Hover effects with scale transformations and shadow enhancements
- Mobile-first responsive design

**Key Features**
- 6-step quiz flow with progress tracking and time estimation
- Exit-intent popup to re-engage leaving users
- Rotating case study carousel on hero section
- Real-time application counter
- Dynamic recovery probability calculation based on quiz answers
- Mobile-optimized with conditional image placement

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server
- Custom development/production server setup with Vite integration in dev mode
- Static file serving for production builds

**API Structure**
- RESTful endpoint: `POST /api/leads` for quiz submission
- Request validation using Zod schemas shared between client and server
- Lead data persisted to both in-memory storage and file system (`leads_log.txt`)
- Webhook integration with Make.com for lead processing

**Data Storage**
- In-memory storage implementation (`MemStorage` class) for development
- Drizzle ORM configured for PostgreSQL (schema defined but not actively used)
- File-based logging for lead tracking and debugging
- Schema defined for users and leads with Zod validation

**Session Management**
- Express session middleware configured
- PostgreSQL session store setup (connect-pg-simple)

### External Dependencies

**Third-Party Services**
- Make.com webhook (`https://hook.eu2.make.com/mjdxoefdh8c4itgjpirwchafiyhaqixk`) for lead distribution
- Webhook receives: email, name, phone, IP, landing source, quiz answers

**Database**
- PostgreSQL via Neon serverless driver (`@neondatabase/serverless`)
- Connection configured via `DATABASE_URL` environment variable
- Drizzle ORM for schema management and migrations

**Design Assets**
- Google Fonts: Inter (weights 400, 600, 700, 800) and Manrope (weight 700)
- Static images for quiz steps and hero section stored in `attached_assets/`

**Development Tools**
- Replit-specific plugins for runtime error overlay, cartographer, and dev banner
- TypeScript with strict mode enabled
- ESBuild for production bundling

**Key Design Decisions**
1. **Dual Storage Strategy**: In-memory storage for quick development iteration, with infrastructure for PostgreSQL when needed for production scale
2. **Shared Schema**: Zod schemas in `/shared` directory enable type-safe validation on both client and server
3. **Russian Language**: All content in Russian targeting Russian-speaking victims of financial fraud in the US
4. **Mobile-First Quiz**: Step images conditionally rendered between question and answers on mobile, alongside on desktop
5. **No Authentication**: Public-facing lead generation flow requires no user accounts