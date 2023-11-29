import Link from 'next/link';
import { SignInButton } from '../SignInButton';

export function Header() {
  return (
    <header className="w-full bg-zinc-700 py-5 px-4">
      <div className="flex w-full max-w-5xl items-center justify-between mx-auto">
        <h1 className='font-bold'>
          Learning google cloud
        </h1>
        <ul className="flex items-center justify-between gap-10 text-xl">
          <li className='hover:text-green-500 transition-all'>
            <Link href="/">
              Home
            </Link>
          </li>
          <li className='hover:text-green-500 transition-all'>
            <Link href="/google-document-ai">
              Google Document AI
            </Link>
          </li>
        </ul>

        <SignInButton />
      </div>
    </header >
  )
}
