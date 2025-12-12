'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [userData, setUserData] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user');
      const data = await res.json();

      if (!res.ok) {
        window.location.href = '/login';
      } else {
        setUserData(data.user.email);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className='flex flex-col justify-center items-center gap-6 h-screen'>
      <h1 className='text-2xl font-semibold'>Sign in as {userData}</h1>
      <button
        type='button'
        onClick={async () => {
          const res = await fetch('/api/logout', { method: 'POST' });
          const data = await res.json();
          if (res.ok) {
            alert(data.message);
            window.location.href = '/login';
          } else {
            alert('Logout failed');
          }
        }}
        className='bg-red-500 text-white rounded-lg py-2 px-4'
      >
        Logout
      </button>
    </div>
  );
}
