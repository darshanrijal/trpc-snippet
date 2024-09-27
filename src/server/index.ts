import { z } from "zod";
import { publicProcedure, router } from "./trpc";

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
});

export type AppRouter = typeof appRouter;
