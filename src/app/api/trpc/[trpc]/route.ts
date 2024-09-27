import { appRouter } from "@/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
    onError({ error, path }) {
      console.error(
        `❌ TRPC error on path ${path ?? "<no-path>"}:${error.message}`,
      );
    },
  });

export { handler as GET, handler as POST };
