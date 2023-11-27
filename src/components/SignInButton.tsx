'use client';

import Image from 'next/image';

import { signIn, signOut, useSession } from 'next-auth/react';

export function SignInButton() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => signOut()}
          >
            Sair
          </button>
          <Image
            src={`${session?.user?.image}`}
            alt=""
            width={100}
            height={100}
            className='w-8 h-8 rounded-full'
          />
        </>
      ) : (
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => signIn('google')}
        >
          Login
        </button>
      )}
    </>
  );
}