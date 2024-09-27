/* eslint-disable @typescript-eslint/no-unused-vars */
import { type DefaultSession } from "next-auth";

type ExtendedUser = {
  email: string;
  id: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser & DefaultSession["user"];
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT extends ExtendedUser {}
}
