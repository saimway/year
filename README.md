# New Year Countdown Application

## Overview

This is a New Year countdown web application that displays an animated countdown timer to midnight and triggers a celebration with fireworks and motivational messages when the new year arrives. The app features an elegant gold and dark theme with smooth animations, confetti effects, and a 5-minute celebration mode before resetting for the next year.

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

## Deployment on Vercel

1. **Prerequisites**: Ensure you have the [Vercel CLI](https://vercel.com/docs/cli) installed or use the Vercel dashboard.

2. **Configuration**: The project is configured for Vercel deployment. Ensure your `vercel.json` (if present) or Vercel project settings point to the correct output directory (`dist/public` for frontend). Since this project uses a custom Express server, you might need to adapt it for Serverless Functions or deploy the frontend separately if the backend logic is minimal or can be refactored.

   *Note: If you are deploying as a full-stack application on Vercel, typically you would use Next.js or adapt the Express server to Vercel Serverless Functions. As this project is structured with a custom Express server, deploying to Vercel might require configuring a `vercel.json` to handle the server-side code or deploying the frontend as a static site and the backend elsewhere (like Render, Railway, or Heroku).*

   *For a static frontend deployment on Vercel:*
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`

3. **Environment Variables**: Set any necessary environment variables in the Vercel dashboard.

## Local Development

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

4.  **Start Production Server**:
    ```bash
    npm start
    ```
