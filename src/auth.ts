import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import prisma from "./lib/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    session({ session, token }) {
      session.user.email = token.email!;
      session.user.id = token.id;
      return session;
    },
    async jwt({ token }) {
      const user = await prisma.user.findUnique({ where: { id: token.sub } });
      if (!user) {
        return token;
      }
      token.id = user.id;
      token.email = user.email;
      return token;
    },
  },
});
