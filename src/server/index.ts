import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./trpc";
import prisma from "@/lib/prisma";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  sayHi: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async (opts) => {
      return `Hello ${opts.input.name}`;
    }),
  getUserByEmail: publicProcedure.input(z.string()).query(async (opts) => {
    const user = await prisma.user.findUnique({ where: { email: opts.input } });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    return user;
  }),
  getUserByID: publicProcedure.input(z.string()).query(async (opts) => {
    const user = await prisma.user.findUnique({ where: { id: opts.input } });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    return user;
  }),
  getDetails: protectedProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
});

export type AppRouter = typeof appRouter;
