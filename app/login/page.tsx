'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      router.push('/');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-white rounded-2xl shadow-xl p-6'>
        <h1 className='font-semibold text-2xl text-center'>Login</h1>

        <form onSubmit={handleSubmit} className='mt-6 flex flex-col gap-y-4'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='border px-2 py-1'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='border px-2 py-1'
          />

          <button
            type='submit'
            className='mt-4 bg-black text-white rounded-lg py-2'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
