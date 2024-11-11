import { useRef, useState } from 'react';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import './index.css';
import ParticleWrapper from './particleWrapper.tsx';
import ParticleWrapperProps, { ParticalFadeState } from './types/ParticleWrapperProps.ts';
import React from 'react';


function Login(props: ParticleWrapperProps) {
  const [enteredInvalidInfo, setEnteredInvalidInfo] = useState(false);
  const setParticleFade = props.fadeStateController[1];
  const [redirecting, setRedirecting] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginPanelRef = useRef<HTMLDivElement>(null);
  const adminLinkRef = useRef<HTMLDivElement>(null);

  function authenticate() {
    setParticleFade(ParticalFadeState.FadingOut);

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    loginPanelRef.current?.classList.add("animate__animated", "animate__fadeOut")
    adminLinkRef.current?.classList.add("animate__animated", "animate__fadeOut")

    setTimeout(() => {
      setRedirecting(true);
    }, 1000);
  }

  if (redirecting) return <Navigate to={"/dashboard"} />

  return (
        <ParticleWrapper fadeStateController={props.fadeStateController}>
            <div ref={loginPanelRef} className='flex flex-col gap-12 h-screen items-center justify-center w-1/3'>
              <h1 className='text-6xl text-white font-bold self-center'>Student Login</h1>
              <div className='p-12 bg-slate-200 flex rounded-md flex-col gap-12 w-full'>
                { enteredInvalidInfo ?
                  <h1 className='text-red-500 text-center'>Invalid username/password.</h1>
                  :
                  null
                }
                <input className='w-full p-1' type='text' placeholder='Login Number' />
                <input className='w-full p-1' type='text' placeholder='Password' />
                <button
                  className='bg-indigo-400 hover:bg-indigo-500 p-4 rounded-md'
                  onClick={authenticate}
                >
                  Login
                </button>
              </div>
            </div>
            <button
              className='absolute bottom-0 mb-4 text-blue-300 w-full text-center text-xl italic underline'
            >
              <Link to={"/admin"} ref={adminLinkRef}>
              Are you a teacher?
              </Link>
            </button>
        </ParticleWrapper>
  )
}

export default Login;
