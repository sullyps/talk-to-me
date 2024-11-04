import { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import './index.css';


function Login() {
  const [enteredInvalidInfo, setEnteredInvalidInfo] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function authenticate() {
   localStorage.setItem("username", username);
   localStorage.setItem("password", password);

   // TODO: Connect to auth server
   // IF invalid info -> setEnteredInvalidInfo(true);

   console.log('redirecting...');
   navigate('/dashboard');
  }

  return (
    <div className='h-screen w-screen bg-black flex justify-center items-center flex-col gap-12'>
      <h1 className='text-6xl text-white font-bold text-ceter align-middle'>Login</h1>
      <div className='p-12  bg-slate-200 flex rounded-md flex-col gap-12 w-1/3'>
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
  )
}

export default Login;
