import { createRoot } from 'react-dom/client';
import Login from './login.tsx';
import Admin from './admin.tsx';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Dashboard from './dashboard.tsx';
import ParticlesContainer from './particleWrapper.tsx';
import React, { useState } from 'react';
import { ParticalFadeState } from './types/ParticleWrapperProps.ts';
import Students from './students.tsx';
import Classes from './classes.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginGoogle from './loginGoogle.tsx';


//backgroundFadeOut top level state here?

// TODO: Pass fadeStateController using react context instead of
// passing state down to each component in router
// -> More clean and consise code: Follows React's best practices

function App() {
  const fadeStateController =
    useState<ParticalFadeState>(ParticalFadeState.Invisible);

    return (
      <BrowserRouter basename='/'>
          <Routes>
              <Route path='/' element={<Login fadeStateController={fadeStateController} />} />
              <Route path='login' element={<Login fadeStateController={fadeStateController} />} />
              <Route path='loginGoogle' element={<LoginGoogle fadeStateController={fadeStateController} />} />
              <Route path='dashboard' element={<Dashboard fadeStateController={fadeStateController} />} />
              <Route path='admin' element={<Admin fadeStateController={fadeStateController} />} />
              <Route path='admin/students' element={<Students fadeStateController={fadeStateController} />} />
              <Route path='classes' element={<Classes fadeStateController={fadeStateController} />} />
              <Route path='particlesTest' element={<ParticlesContainer fadeStateController={fadeStateController} />} />
          </Routes>
      </BrowserRouter>
    );
}


//@ts-ignore (supresses document possibly not existing)
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
