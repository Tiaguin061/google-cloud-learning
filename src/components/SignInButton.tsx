'use client';

import Image from 'next/image';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export function SignInButton() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <div className='flex items-center gap-2'>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
        </div>
      ) : (
        <Link
          href="/auth"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-80"
        >
          Login
        </Link>
      )}
    </>
  );
}