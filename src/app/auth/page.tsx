import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { UserAuthForm } from './components/user-auth-form';

export default async function AuthPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <div className='max-w-md w-full px-4 mt-4'>
      <UserAuthForm />
    </div>
  )
}
