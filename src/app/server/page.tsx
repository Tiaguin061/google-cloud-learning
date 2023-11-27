import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

const ServerPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin?callbackUrl=/server');
  }

  return (
    <div>
      <h1 className='text-xl font-bold'>Página com segurança</h1>
      <span className="text-blue">
        Server Auth - {session?.user?.name}
      </span>
    </div>
  )
}

export default ServerPage;