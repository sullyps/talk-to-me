import { createRoot } from 'react-dom/client';
import Login from './login.tsx';
import Admin from './admin.tsx';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Dashboard from './dashboard.tsx';
import ParticlesContainer from './particleWrapper.tsx';
import React, { useState } from 'react';
import { ParticalFadeState } from './types/ParticleWrapperProps.ts';
import Students from './students.tsx';

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
              <Route path='dashboard' element={<Dashboard fadeStateController={fadeStateController} />} />
              <Route path='admin' element={<Admin fadeStateController={fadeStateController} />}>
                  <Route path='students' element={<Students fadeStateController={fadeStateController} />} />
              </Route>
              <Route path='particlesTest' element={<ParticlesContainer fadeStateController={fadeStateController} />} />
          </Routes>
      </BrowserRouter>
    );
}


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
