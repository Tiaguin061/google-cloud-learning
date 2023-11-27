'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Client() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin?callbackUrl=/client')
    },
  });

  const isLoading = status === 'loading';

  if (isLoading) {
    return 'loading...';
  }

  return (
    <div>
      <h1 className='text-xl font-bold'>Página com segurança</h1>
      <span className="text-blue">
        Client Auth - {session?.user?.name}
      </span>
    </div>
  )
}
