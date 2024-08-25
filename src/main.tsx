// src/main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import App from './pages/Home/Home';
import AdminCurso from './pages/Admin-curso/AdminCurso';
import AdminUser from './pages/Admin-user/AdminUser';
import EditUser from './pages/Admin-user/EditUser';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/home" element={<App />} />
        <Route path="/admin-curso" element={<AdminCurso />} />
        <Route path="/admin-user" element={<AdminUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  </StrictMode>,
);
