import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

// Layouts
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';

// Common Components
import ProtectedRoute from '../components/common/ProtectedRoute';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Main Pages
import Dashboard from '../pages/dashboard/Dashboard';
import UserList from '../pages/users/UserList';
import UserDetail from '../pages/users/UserDetail';
import UserForm from '../pages/users/UserForm';
import Profile from '../pages/profile/Profile';
import NotFound from '../pages/NotFound';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.USERS} element={<UserList />} />
          <Route path={ROUTES.USER_DETAIL} element={<UserDetail />} />
          <Route path={ROUTES.USER_CREATE} element={<UserForm />} />
          <Route path={ROUTES.USER_EDIT} element={<UserForm />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
        </Route>
      </Route>

      {/* 404 Route */}
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
