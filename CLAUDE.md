# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

以降、あらゆるコミュニケーションやドキュメント、コメントなどは、すべて日本語で出力してください。

## Project Overview

This is a health dashboard application with a Ruby on Rails 8.0 API backend and a React Router v7 SSR frontend. The backend is configured as an API-only Rails application that serves data to the React frontend via internal server-to-server communication.

## Development Commands

### Backend (Rails API)
```bash
# From the backend/ directory
bundle install                    # Install dependencies
bin/rails server                  # Start development server
bin/rails console                 # Interactive Rails console
bin/rails db:create              # Create database
bin/rails db:migrate             # Run migrations
bin/rails db:seed               # Seed database
bin/rails test                   # Run tests
```

### Code Quality
```bash
# From the backend/ directory
bundle exec rubocop              # Run linter
bundle exec rubocop -a          # Auto-fix linting issues
bundle exec brakeman             # Security analysis
```

### Deployment
```bash
# From the backend/ directory
bin/kamal deploy                 # Deploy with Kamal
bin/kamal console               # Remote console
bin/kamal logs                  # View logs
bin/kamal shell                 # Remote shell
```

### Frontend (React Router v7 SSR)
```bash
# From the frontend/ directory
npm install                     # Install dependencies
npm run dev                     # Start development server (SSR mode)
npm run build                   # Build for production
npm start                       # Start production server
npm run typecheck              # Type checking
```

## Architecture

### Backend Structure
- **Rails API-only application** using Rails 8.0
- **Database**: SQLite3 (development), configurable for production
- **Background jobs**: Solid Queue (runs in Puma process via SOLID_QUEUE_IN_PUMA)
- **Caching**: Solid Cache
- **Deployment**: Kamal for containerized deployment

### Frontend Structure
- **React Router v7** with Server-Side Rendering (SSR)
- **Build tool**: Vite with React Router dev tools
- **Styling**: Tailwind CSS
- **TypeScript**: Full TypeScript support
- **API communication**: Custom API client for server-to-server calls

### Key Configuration
- SSL/TLS forced in production
- Health check endpoint at `/up`
- Tagged logging with request IDs
- Japanese comments in some configuration files

### Dependencies
- **Rails 8.0** - Web framework
- **Puma** - Web server
- **SQLite3** - Database
- **Solid Queue** - Background jobs
- **Solid Cache** - Caching
- **Kamal** - Deployment
- **Thruster** - HTTP/2 proxy (deployment)
- **RuboCop** - Code linting
- **Brakeman** - Security analysis

## Working Directory Structure

```
health-dashboard/
├── backend/          # Rails API application
│   ├── app/         # Application code
│   ├── config/      # Configuration files
│   ├── db/          # Database files and schemas
│   ├── lib/         # Library code
│   └── ...
├── frontend/        # React Router v7 SSR application
│   ├── app/         # Application code
│   │   ├── lib/     # Utility functions (API client)
│   │   ├── routes/  # Route components
│   │   └── ...
│   ├── public/      # Static assets
│   └── ...
└── health-dashboard.code-workspace  # VS Code workspace
```

## Development Notes

### Backend
- The application is configured for production-like settings by default, with environment-specific overrides
- CORS configuration is not needed since frontend-backend communication is server-to-server
- The project uses Solid Queue for background jobs, running within the Puma process
- Kamal configuration is set up for containerized deployment with placeholder values

### Frontend
- React Router v7 runs in SSR mode by default (`ssr: true` in react-router.config.ts)
- API calls are made from the SSR server to the backend, not from the browser
- Environment variable `API_BASE_URL` can be set to configure backend URL (default: http://localhost:3000)
- TypeScript is fully configured with React Router type generation

### Development Workflow
1. Start backend: `cd backend && bin/rails server` (port 3000 by default)
2. Start frontend: `cd frontend && npm run dev` (port 5173 by default)
3. Frontend will attempt to connect to backend via server-side API calls
