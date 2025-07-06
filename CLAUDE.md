# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

以降、あらゆるコミュニケーションやドキュメント、コメントなどは、すべて日本語で出力してください。

## Project Overview

This is a health dashboard application with a Ruby on Rails 8.0 API backend. The project is currently backend-only, configured as an API-only Rails application designed to serve data to a separate frontend application.

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

## Architecture

### Backend Structure
- **Rails API-only application** using Rails 8.0
- **Database**: SQLite3 (development), configurable for production
- **Background jobs**: Solid Queue (runs in Puma process via SOLID_QUEUE_IN_PUMA)
- **Caching**: Solid Cache
- **Deployment**: Kamal for containerized deployment

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
└── health-dashboard.code-workspace  # VS Code workspace
```

## Development Notes

- The application is configured for production-like settings by default, with environment-specific overrides
- CORS configuration exists but is commented out - enable when integrating with frontend
- The project uses Solid Queue for background jobs, running within the Puma process
- Kamal configuration is set up for containerized deployment with placeholder values
