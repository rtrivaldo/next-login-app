'use client';

export default function Home() {
  return (
    <div className='flex justify-center items-center h-screen'>
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
