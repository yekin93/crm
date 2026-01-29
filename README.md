# CRM Application

Modern, enterprise-grade Customer Relationship Management (CRM) system with React + TypeScript frontend and Spring Boot backend.

## 🚀 Project Overview

This is a full-stack CRM application designed with production-ready, enterprise standards.

### Technology Stack

**Frontend:**
- React 18+ with TypeScript
- Vite for build tooling
- Ant Design UI framework
- React Router v6 for routing
- Axios for API calls
- Context API for state management

**Backend:**
- Spring Boot (to be integrated)
- REST API
- JWT authentication

## 📁 Project Structure

```
crm/
├── frontend/              # React + TypeScript frontend application
│   ├── src/
│   │   ├── api/          # API layer with Axios configuration
│   │   ├── components/   # Reusable React components
│   │   ├── context/      # React Context providers
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Page components
│   │   ├── routes/       # Route configuration
│   │   ├── styles/       # Global styles
│   │   ├── types/        # TypeScript type definitions
│   │   └── utils/        # Utility functions
│   ├── public/           # Static assets
│   ├── Dockerfile        # Docker configuration
│   ├── nginx.conf        # Nginx configuration for production
│   └── package.json      # Dependencies and scripts
└── README.md
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

**Development:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🔐 Features

### Authentication
- JWT token-based authentication
- Login and registration pages
- Protected routes
- Automatic token refresh
- Secure logout

### User Management
- User list with pagination and search
- Create, read, update, delete (CRUD) operations
- User roles (Admin, Manager, User)
- User status management

### UI/UX Features
- Dark/Light theme toggle
- Responsive design (mobile-first)
- Loading states
- Error boundaries
- Form validation
- Ant Design components

### Pages
- **Login**: User authentication
- **Register**: New user registration
- **Dashboard**: Overview with statistics
- **User List**: Paginated user management
- **User Detail**: View user information
- **User Form**: Create/edit users
- **Profile**: User profile and password change
- **404**: Not found page

## 🐳 Docker Deployment

Build and run the frontend with Docker:

```bash
cd frontend
docker build -t crm-frontend .
docker run -p 80:80 crm-frontend
```

## 📚 Documentation

For detailed frontend documentation, see [frontend/README.md](frontend/README.md)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:1905/api
VITE_APP_NAME=CRM Application
VITE_TOKEN_KEY=crm_auth_token
```

## 🎯 Code Quality

- TypeScript strict mode enabled
- ESLint with TypeScript rules
- React best practices
- Proper error handling
- Loading states for async operations

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1920px and above)
- Tablet (768px - 1919px)
- Mobile (320px - 767px)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Ant Design for the UI components
- React team for the amazing framework
- Vite for the blazing fast build tool
