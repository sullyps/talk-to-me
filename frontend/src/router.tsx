import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Login from './login.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  </BrowserRouter>,
  </StrictMode>
)
