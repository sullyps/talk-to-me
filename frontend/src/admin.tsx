import { useState } from 'react';
import AdminDisplayTab from "./types/AdminDisplayTab";
import ParticleWrapper from './particleWrapper';
import './index.css';
import ParticleWrapperProps from './types/ParticleWrapperProps';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';


// Admin functionality
// Buttons for "adding students", "removing students", "setting student names/passes"
// Watch student video history
// Contact Developer button?

// TODO: Add sign-in to this page

// Developer Note: Search for sections here with AdminDisplayTag enum

/* ORIGINAL:
    <div className='h-screen w-screen bg-black flex justify-center items-center flex-row gap-12'>
      <h1
        className='text-6xl underline text-blue-200 hover:text-blue-300 font-bold text-ceter align-middle cursor-pointer'
        onClick={() => setCurrentDisplayTab(AdminDisplayTab.Students)}
      >
        {"<Students>"}
      </h1>
      <h1
        className='text-6xl underline text-blue-200 hover:text-blue-300 font-bold text-ceter align-middle cursor-pointer'
        onClick={() => setCurrentDisplayTab(AdminDisplayTab.Classes)}
      >
        {"<Classes>"}
      </h1>
      </div>
*/

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
