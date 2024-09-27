import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./lib/validation";
import bcrypt from "bcryptjs";
import prisma from "./lib/prisma";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { type: "email", placeholder: "Email" },
        password: { type: "password", placeholder: "Password" },
      },
      authorize: async (credentials) => {
        const { email, password } = loginSchema.parse(credentials);
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          return null;
        }
        const passwordsMatch = await bcrypt.compare(
          password,
          user.passwordHash,
        );
        if (!passwordsMatch) {
          return null;
        }
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
