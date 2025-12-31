# replit.md

## Overview

This is a New Year countdown web application that displays an animated countdown timer to midnight and triggers a celebration with fireworks and motivational messages when the new year arrives. The app features an elegant gold and dark theme with smooth animations, confetti effects, and a 5-minute celebration mode before resetting for the next year.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for smooth transitions, canvas-confetti for fireworks
- **Date Handling**: date-fns for robust date calculations

The frontend follows a component-based architecture with:
- Pages in `client/src/pages/`
- Reusable UI components in `client/src/components/ui/`
- Feature components in `client/src/components/`
- Custom hooks in `client/src/hooks/`
- Path aliases: `@/` for client/src, `@shared/` for shared code

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **Build Tool**: Vite for frontend, esbuild for server bundling
- **API Design**: RESTful endpoints defined in `shared/routes.ts`

The server uses a simple architecture:
- `server/index.ts` - Express app setup and middleware
- `server/routes.ts` - API route registration
- `server/storage.ts` - Data layer with in-memory storage (MemStorage class)
- `server/vite.ts` - Development server with Vite HMR integration
- `server/static.ts` - Production static file serving

### Data Storage
- **Schema Definition**: Drizzle ORM with PostgreSQL dialect (`shared/schema.ts`)
- **Current Implementation**: In-memory storage with seeded motivational messages
- **Database Ready**: Configured for PostgreSQL via `DATABASE_URL` environment variable

The `messages` table stores motivational text displayed during celebrations. The storage layer implements an `IStorage` interface allowing easy swap between MemStorage and database-backed storage.

### Shared Code
- `shared/schema.ts` - Drizzle table definitions and Zod validation schemas
- `shared/routes.ts` - Type-safe API route definitions with Zod response schemas

## External Dependencies

### Database
- **PostgreSQL**: Configured via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema management and migrations (`drizzle-kit push` for schema sync)
- **Migrations**: Output to `./migrations` directory

### Frontend Libraries
- **Radix UI**: Headless component primitives (dialogs, menus, tooltips, etc.)
- **Lucide React**: Icon library
- **Google Fonts**: Cinzel, Inter, Playfair Display, DM Sans, Geist Mono, Fira Code

### Development Tools
- **Vite**: Development server with HMR
- **Replit Plugins**: Runtime error overlay, cartographer, dev banner (development only)

### Build Configuration
- Frontend builds to `dist/public`
- Server bundles to `dist/index.cjs` with specific dependencies bundled (see `script/build.ts` allowlist)
- TypeScript configured with bundler module resolution and path aliases