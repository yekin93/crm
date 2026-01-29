# CRM Frontend Application

Modern, production-ready React + TypeScript frontend application for CRM system with Spring Boot backend.

## 🚀 Features

- **Modern Stack**: React 18+ with TypeScript and Vite
- **UI Framework**: Ant Design (antd) - Latest version
- **Routing**: React Router v6 with protected routes
- **State Management**: React Context API with custom hooks
- **API Integration**: Axios with interceptors
- **Authentication**: JWT token-based authentication
- **Theme**: Dark/Light mode support
- **Responsive**: Mobile-first design
- **Type Safe**: Full TypeScript coverage with strict mode
- **Code Quality**: ESLint configuration

## 📋 Technology Stack

- **React**: 18.2.0
- **TypeScript**: 5.3.3
- **Vite**: 5.0.11
- **Ant Design**: 5.12.8
- **React Router**: 6.21.0
- **Axios**: 1.6.5

## 📁 Project Structure

```
frontend/
├── public/                     # Static assets
├── src/
│   ├── api/                   # API layer
│   │   ├── axios.config.ts    # Axios configuration
│   │   ├── endpoints.ts       # API endpoints
│   │   ├── auth.api.ts        # Auth API calls
│   │   └── user.api.ts        # User API calls
│   ├── types/                 # TypeScript types
│   ├── context/               # React Context providers
│   ├── hooks/                 # Custom hooks
│   ├── components/            # Reusable components
│   ├── pages/                 # Page components
│   ├── utils/                 # Utility functions
│   ├── styles/                # Global styles
│   └── routes/                # Route configuration
├── Dockerfile                 # Docker configuration
├── nginx.conf                 # Nginx configuration
└── package.json               # Dependencies
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.development .env
```

4. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Authentication

The application uses JWT token-based authentication:

- Tokens are stored in localStorage
- Automatic token injection via Axios interceptors
- Auto-logout on token expiration
- Protected routes for authenticated users

## 🎨 Features

### Pages

- **Login**: User authentication with email and password
- **Register**: New user registration
- **Dashboard**: Overview with statistics and recent activities
- **User List**: Paginated user list with search and filters
- **User Detail**: View user details
- **User Form**: Create/Edit user
- **Profile**: User profile management and password change
- **404**: Not found page

### Components

- **MainLayout**: Dashboard layout with sidebar and header
- **AuthLayout**: Authentication pages layout
- **ProtectedRoute**: Route guard for authenticated users
- **LoadingSpinner**: Loading indicator
- **ErrorBoundary**: Error handling wrapper

## 🐳 Docker

### Build Docker Image

```bash
docker build -t crm-frontend .
```

### Run Docker Container

```bash
docker run -p 80:80 crm-frontend
```

The application will be available at `http://localhost`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:1905/api
VITE_APP_NAME=CRM Application
VITE_TOKEN_KEY=crm_auth_token
```

### API Configuration

The backend API base URL is configured in `src/api/axios.config.ts`:

```typescript
baseURL: import.meta.env.VITE_API_BASE_URL
```

## 🎯 Code Quality

- TypeScript strict mode enabled
- ESLint for code linting
- Proper error boundaries
- Loading states for async operations
- Form validation with custom validators

## 📱 Responsive Design

- Mobile-first approach
- Ant Design Grid system
- Responsive breakpoints
- Collapsible sidebar on mobile

## 🌙 Theme Support

- Light/Dark mode toggle
- Theme preference saved to localStorage
- Ant Design ConfigProvider integration

## 🔗 Backend Integration

This frontend is designed to work with a Spring Boot backend API running on `http://localhost:1905/api`.

### API Endpoints

- **Auth**: `/api/auth/login`, `/api/auth/register`, `/api/auth/logout`
- **Users**: `/api/users` (GET, POST, PUT, DELETE)
- **Profile**: `/api/profile` (GET, PUT)

## 📚 Documentation

For more information about the technologies used:

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Ant Design Documentation](https://ant.design/)
- [React Router Documentation](https://reactrouter.com/)

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.
