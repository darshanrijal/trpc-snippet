import "server-only"; // <-- ensure this file cannot be imported from the client

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { appRouter } from "@/server";
import { makeQueryClient } from "@/server/query-client";
import { createCallerFactory } from "@/server/trpc";

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)({});

export const { trpc: serverClient, HydrateClient } = createHydrationHelpers<
  typeof appRouter
>(caller, getQueryClient);
