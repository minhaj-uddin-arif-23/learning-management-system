import NextAuth, { NextAuthOptions, User, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

// Extend the default User type to include role and token
interface CustomUser extends User {
  id: string;
  username: string;
  role: 'admin' | 'user';
  token: string;
}

// Extend the Session type to include user properties using module augmentation
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      role: 'admin' | 'user';
      accessToken: string;
    } & DefaultSession['user'];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
        role: { label: 'Role', type: 'select', options: ['user', 'admin'] },
      },
      async authorize(credentials, req) {
        try {
          const isRegister = req?.body?.isRegister === 'true';
          const endpoint = isRegister ? '/auth/register' : '/auth/login';
          const body = isRegister
            ? { username: credentials?.username, password: credentials?.password, role: credentials?.role }
            : { username: credentials?.username, password: credentials?.password };

          const res = await axios.post(`http://localhost:5000/api${endpoint}`, body);
          const { user, token } = res.data;

          if (user) {
            return { id: user.id, username: user.username, role: user.role, token } as CustomUser;
          }
          return null;
        } catch (err) {
          console.error('Authorize error:', err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser;
        token.id = customUser.id;
        token.username = customUser.username;
        token.role = customUser.role;
        token.accessToken = customUser.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        username: token.username as string,
        role: token.role as 'admin' | 'user',
        accessToken: token.accessToken as string,
      };
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };