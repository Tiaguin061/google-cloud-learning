import Link from 'next/link';
import { SignInButton } from '../SignInButton';

export function Header() {
  return (
    <header className="w-full bg-zinc-700 py-5 px-4">
      <div className="flex w-full max-w-5xl items-center justify-between mx-auto">
        <h1 className=''>
          Logotipo
        </h1>
        <ul className="flex items-center justify-between gap-10 text-xl">
          <li>
            <Link href="/">
              Home
            </Link></li>
          <li>
            <Link href="/server">
              Server
            </Link> </li>
          <li>
            <Link href="/client">
              Client
            </Link>
          </li>
        </ul>

        <Link href="/auth">
          login
        </Link>

        <SignInButton />
      </div>
    </header>
  )
}
