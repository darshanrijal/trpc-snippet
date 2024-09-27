import { auth } from "@/auth";
import { initTRPC, TRPCError } from "@trpc/server";
import SuperJSON from "superjson";

const t = initTRPC.create({
  transformer: SuperJSON,
});
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async (opts) => {
  const session = await auth();
  if (!session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: { ...session },
  });
});

export const createCallerFactory = t.createCallerFactory;
