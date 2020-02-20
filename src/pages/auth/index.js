import React, { useState, useContext } from 'react';

import AuthImg from './undraw_authentication_fsn5.svg';
import { AppContext } from '../../contexts';
import { Redirect } from 'react-router-dom';

const useInput = (props, labelText) => {
  const [value, setValue] = useState('');
  const input = (
    <>
      <label className='text-xs text-gray-700 font-bold'>{labelText}</label>
      <input
        {...props}
        value={value}
        onChange={e => setValue(e.target.value)}
        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
      />
    </>
  );
  return [value, input];
};

const Auth = () => {
  const { setUserData } = useContext(AppContext);

  const [authComplete, setAuthComplete] = useState(false);
  const [authState, setAuthState] = useState('login');
  const [firstName, firstNameInput] = useInput(
    { type: 'text', placeholder: 'First Name' },
    'First Name'
  );
  const [lastName, lastNameInput] = useInput(
    { type: 'text', placeholder: 'Last Name' },
    'Last Name'
  );
  const [email, emailInput] = useInput(
    { type: 'email', placeholder: 'Email' },
    'Email'
  );
  const [password, passwordInput] = useInput(
    { type: 'password', placeholder: 'Password' },
    'Password'
  );

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      name: {
        first: firstName,
        last: lastName
      },
      email: email,
      password: password
    };

    try {
      const response = await (
        await fetch('http://localhost:8080/v1/auth/init', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
      ).json();

      setUserData(response);
      setAuthComplete(true);
    } catch (err) {
      console.log(err);
    }
  };

  return authComplete ? (
    <Redirect to='/' />
  ) : (
    <div className='w-11/12 sm:w-4/5 md:w-1/3 mx-auto'>
      <div className='mt-20 flex flex-col items-center justify-center'>
        <img src={AuthImg} alt='Login first' className='h-32 max-w-full' />
        <h2 className='text-xl mt-4 font-semibold text-gray-700 capitalize'>
          {authState}
        </h2>
      </div>

      <form className='px-5 py-6 w-4/5 mx-auto' onSubmit={handleSubmit}>
        {authState === 'signup' && (
          <>
            <div className='flex'>
              <div className=''>{firstNameInput}</div>
              <div className='ml-4'>{lastNameInput}</div>
            </div>
          </>
        )}
        <div>{emailInput}</div>
        <div className='mt-3'>{passwordInput}</div>
        <div className='mt-4 flex justify-center'>
          <button className='w-1/2 py-2 text-base text-white bg-purple-700 shadow-lg font-bold hover:bg-purple-600'>
            Submit
          </button>
        </div>
        <div className='mt-2'>
          {authState === 'signup' ? (
            <p className='text-sm text-gray-600 font-semibold'>
              Already have an account?{' '}
              <button
                className='ml-1 text-purple-600 text-base text-bold'
                onClick={e => setAuthState('login')}
                type='button'
              >
                Login
              </button>
            </p>
          ) : (
            <p className='text-sm text-gray-600 font-semibold'>
              Don't have an account?{' '}
              <button
                className='ml-1 text-purple-600 text-base text-bold'
                onClick={e => setAuthState('signup')}
                type='button'
              >
                Register
              </button>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Auth;
