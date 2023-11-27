'use client';

import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

type ProviderProps = {
  children: React.ReactNode;
}

export function Provider({
  children
}: ProviderProps) {
  return (
    <SessionProvider>
      <ToastContainer
        position='top-right'
        theme='dark'
        hideProgressBar={false}
        style={{
          maxWidth: '420px',
          width: 'max-content'
        }}
        pauseOnHover
        closeOnClick
      />

      {children}
    </SessionProvider>
  );
}