# TaskFlow - Project Management Application

A modern, full-stack project management and task tracking application built with Laravel, React (Inertia.js), and Tailwind CSS. TaskFlow enables teams to collaborate seamlessly by managing projects, organizing tasks on interactive boards, and tracking team progress.

## 📸 Features

- **Team Management** - Create and manage multiple teams with collaborative workspace
- **Project Management** - Organize projects within teams with detailed descriptions
- **Kanban Boards** - Drag-and-drop boards for visual task management
- **Card Management** - Create, assign, and track tasks with detailed information
- **User Authentication** - Secure login with Fortify and two-factor authentication
- **Modern UI** - Beautiful, responsive interface with dark mode support using Tailwind CSS
- **Real-time Updates** - Smooth interactions with Inertia.js
- **API-First Architecture** - RESTful API built on Laravel

## 🛠️ Tech Stack

### Backend

- **Laravel 12.0** - Modern PHP framework for backend development
- **PHP 8.2+** - Server-side programming language
- **SQLite/Database** - Data persistence
- **Laravel Fortify** - Authentication scaffolding with two-factor support

### Frontend

- **React 19** - UI library for building interactive components
- **Inertia.js 2.1** - Server-side rendering framework for Laravel + React
- **TypeScript 5.7** - Type-safe JavaScript
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Vite 5** - Next-generation frontend build tool
- **Lucide React** - Beautiful icon library

### UI Components & Libraries

- **shadcn/ui** - High-quality, reusable React components
- **Radix UI** - Low-level UI primitive components
- **dnd-kit** - Drag-and-drop functionality
- **HeadlessUI** - Unstyled, accessible components

## 📋 Main Dependencies

### PHP Dependencies (composer.json)

```
- laravel/framework: ^12.0
- inertiajs/inertia-laravel: ^2.0
- laravel/fortify: ^1.30
- laravel/tinker: ^2.10.1
- laravel/wayfinder: ^0.1.9
```

### Development Dependencies (PHP)

```
- pestphp/pest: ^4.1 (Testing framework)
- laravel/sail: ^1.41 (Docker development environment)
- laravel/pint: ^1.18 (Code formatting)
- fakerphp/faker: ^1.23 (Data generation)
```

### Node.js Dependencies (package.json)

```
Core:
- react: ^19.0.0
- react-dom: ^19.0.0
- @inertiajs/react: ^2.1.4
- typescript: ^5.7.2

Styling & UI:
- tailwindcss: ^4.0.0
- @tailwindcss/vite: ^4.1.11
- lucide-react: ^0.475.0
- class-variance-authority: ^0.7.1
- clsx: ^2.1.1
- tailwind-merge: ^3.0.1

Build Tools:
- vite: (via laravel-vite-plugin)
- laravel-vite-plugin: ^2.0
- @vitejs/plugin-react: ^4.6.0

Component Libraries:
- @radix-ui/* (Various UI primitives)
- @headlessui/react: ^2.2.0
- input-otp: ^1.4.2

Interactions:
- @dnd-kit/core: ^6.3.1
- @dnd-kit/sortable: ^10.0.0
- tailwindcss-animate: ^1.0.7

Development:
- eslint: ^9.17.0
- prettier: ^3.4.2
- concurrently: ^9.0.1
```

## 🚀 Installation

### Prerequisites

- **PHP 8.2+** with common extensions (OpenSSL, PDO, Mbstring, Tokenizer)
- **Node.js 18+** and npm or yarn
- **Composer** (PHP package manager)
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/ist14k/laravel--task-flow.git
cd laravel--task-flow
```

### Step 2: Install PHP Dependencies

```bash
composer install
```

### Step 3: Install Node.js Dependencies

```bash
npm install
```

### Step 4: Environment Configuration

Copy the example environment file and generate an application key:

```bash
cp .env.example .env
php artisan key:generate
```

Update your `.env` file with your configuration:

```env
APP_NAME="TaskFlow"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
# DB_DATABASE=/path/to/database.sqlite

MAIL_DRIVER=log
```

### Step 5: Create Database

```bash
touch database/database.sqlite
php artisan migrate
```

### Step 6: Seed Sample Data (Optional)

```bash
php artisan db:seed
```

## 📖 Running the Application

### Development Mode

Start the development server with hot module reloading:

```bash
composer run dev
```

This command runs:

- Laravel development server (port 8000)
- Vite development server for frontend compilation
- Queue listener
- Log tail

Or run them separately:

**Terminal 1 - Laravel Server:**

```bash
php artisan serve
```

**Terminal 2 - Frontend Build (Vite):**

```bash
npm run dev
```

**Terminal 3 (Optional) - Queue:**

```bash
php artisan queue:listen --tries=1
```

### Production Build

Build assets for production:

```bash
npm run build
```

### SSR Mode (Server-Side Rendering)

For production SSR setup:

```bash
composer run dev:ssr
```

## 🧪 Testing

Run the test suite:

```bash
composer test
```

Run specific tests:

```bash
php artisan test --filter=TestClassName
```

## 📝 Available Commands

### Build & Development

```bash
npm run dev          # Development build with hot reload
npm run build        # Production build
npm run build:ssr    # SSR build for production
npm run format       # Format code with Prettier
npm run lint         # Fix linting issues with ESLint
npm run types        # Check TypeScript types
```

### Laravel Artisan

```bash
php artisan serve              # Start development server
php artisan migrate            # Run database migrations
php artisan db:seed            # Seed database with sample data
php artisan tinker             # Interactive shell
php artisan pint               # Format PHP code
php artisan test               # Run tests
```

## 📁 Project Structure

```
laravel--task-flow/
├── app/
│   ├── Http/
│   │   ├── Controllers/        # API & web controllers
│   │   ├── Middleware/         # Middleware classes
│   │   └── Requests/           # Form requests
│   ├── Mail/                   # Mailable classes
│   ├── Models/                 # Eloquent models
│   │   ├── User.php
│   │   ├── Team.php
│   │   ├── Project.php
│   │   ├── Board.php
│   │   ├── Card.php
│   │   └── TeamInvitation.php
│   └── Providers/              # Service providers
├── database/
│   ├── migrations/             # Database migrations
│   ├── factories/              # Model factories for testing
│   └── seeders/                # Database seeders
├── resources/
│   ├── js/
│   │   ├── pages/              # React page components
│   │   ├── components/         # Reusable React components
│   │   └── layouts/            # Layout components
│   ├── css/                    # Tailwind CSS
│   └── views/                  # Blade templates
├── routes/
│   ├── web.php                 # Web routes
│   ├── auth.php                # Authentication routes
│   └── console.php             # Console commands
├── tests/
│   ├── Feature/                # Feature tests
│   └── Unit/                   # Unit tests
├── public/                     # Public assets
├── storage/                    # Logs and cache
├── vendor/                     # Composer dependencies
├── node_modules/               # npm dependencies
├── tailwind.config.ts          # Tailwind configuration
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── composer.json               # PHP dependencies
└── package.json                # Node.js dependencies
```

## 🔧 Configuration

### Tailwind CSS

Configuration file: `tailwind.config.ts`

- Uses modern Tailwind CSS v4.0
- Includes custom gradients and animations
- Dark mode support enabled

### Vite

Configuration file: `vite.config.ts`

- React plugin enabled for JSX transformation
- Laravel Vite plugin for asset management
- Hot module replacement for development

### TypeScript

Configuration file: `tsconfig.json`

- Strict mode enabled
- React JSX support
- Module resolution for aliases (@/)

## 🌐 Environment Setup

### .env Configuration

```env
APP_NAME=TaskFlow
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite

MAIL_DRIVER=log
MAIL_FROM_ADDRESS=hello@example.com
```

### Database

- SQLite for development (lightweight, file-based)
- Supports MySQL, PostgreSQL for production
- Migrations version controlled in `database/migrations/`

## 🚢 Deployment

### Using Sail (Docker)

```bash
./vendor/bin/sail up -d
```

### Traditional Server

1. Install dependencies: `composer install --no-dev`
2. Build frontend: `npm run build`
3. Set permissions: `chmod -R 775 storage bootstrap/cache`
4. Configure `.env` for production
5. Generate key: `php artisan key:generate`
6. Run migrations: `php artisan migrate --force`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open-sourced software licensed under the [MIT license](LICENSE).

## 📧 Support

For support, email [your-email@example.com] or open an issue on [GitHub Issues](https://github.com/ist14k/laravel--task-flow/issues).

## 🙌 Acknowledgments

- [Laravel](https://laravel.com) - The PHP framework
- [React](https://react.dev) - UI library
- [Inertia.js](https://inertiajs.com) - Modern monolithic framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [shadcn/ui](https://shadcn-ui.com) - Beautiful React components
- [Radix UI](https://www.radix-ui.com) - Primitives for building design systems

---

**Built with ❤️ by [Your Name]**
