import { useState } from 'react';
import AdminDisplayTab from "./types/AdminDisplayTab.ts";
import ParticleWrapper from './particleWrapper.tsx';
import './index.css';
import ParticleWrapperProps, { ParticalFadeState } from './types/ParticleWrapperProps.ts';
import { Link } from 'react-router-dom';
import React from 'react';


function Admin(props: ParticleWrapperProps) {
  const [
    currentDisplayTab,
    setCurrentDisplayTab
  ] = useState<AdminDisplayTab>(AdminDisplayTab.Unopened);

  return (
    <ParticleWrapper
      fadeStateController={props.fadeStateController}
    >
      <div className='h-screen w-screen'>
      <h1 className='w-screen text-center text-white absolute text-5xl py-12 font-semibold'>Administration Control</h1>
        <div className='h-screen w-screen flex justify-center items-center flex-row gap-12 z-10'>
          <div className='flex flex-row gap-48 text-5xl text-blue-200 font-bold'>
              <Link
                  to={"/admin/students"}
                  onClick={() =>
                    props.fadeStateController[1](ParticalFadeState.FadingOut)
                  }
                  className='hover:text-blue-300 italic underline'
              >
              Students
              </Link>
              <Link
                  to={"/admin/classes"}
                  className='hover:text-blue-300 italic underline'
              >
                Classes
              </Link>
          </div>
        </div>
      </div>
    </ParticleWrapper>
  )
}

export default Admin;
