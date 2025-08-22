
import NextAuth, { NextAuthOptions } from "next-auth";
import User from "../../../../models/user"; // Use absolute import with @/
import connectToDatabase from "@/lib/mongodb"; // Use absolute import with @/
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";

// Extend the default User type to include role and id
declare module "next-auth" {
  interface User {
    id: string; // Use _id from MongoDB
    role?: "admin" | "user";
  }
  interface Session {
    user: User & {
      role?: "admin" | "user";
    };
  }
  interface JWT {
    id: string; // Use _id from MongoDB
    role?: "admin" | "user";
  }
}

// Define authOptions explicitly
const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials?.email });
          if (!user) {
            throw new Error("User not found");
          }
          const isValidPassword = await bcrypt.compare(
            credentials?.password ?? "",
            user.password as string
          );
          if (!isValidPassword) {
            throw new Error("Invalid password");
          }
          return {
            id: (user as { _id: { toString: () => string } })._id.toString(),  // Use _id as id
            name: user.name,
            email: user.email,
            role: user.role,
          } as const;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "github") {
        await connectToDatabase();
        const existingUser = await User.findOne({ email: profile?.email });
        if (!existingUser) {
          await User.create({
            name: profile?.name,
            email: profile?.email,
            // Role defaults to 'user' from schema
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // _id as string
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string, // _id as string
          email: token.email,
          name: token.name,
          role: token.role as "admin" | "user",
          image: token.picture,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Export authOptions
export { authOptions };

// Export handler for NextAuth routes
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };