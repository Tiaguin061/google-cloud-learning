import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  pages: {
    signIn: '/signin',
  },
};

const handler = NextAuth(authOptions);

export {
  handler as GET,
  handler as POST
};
