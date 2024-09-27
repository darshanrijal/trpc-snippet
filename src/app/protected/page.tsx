"use client";

import { trpc } from "@/trpc/client";
import { TRPCError } from "@trpc/server";

export default function page() {
  const t = trpc.getDetails.useQuery(undefined, {
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error instanceof TRPCError) {
        return !(error.code === "UNAUTHORIZED");
      }
      return failureCount < 2;
    },
  });
  if (t.isLoading) {
    return <div>Loading...</div>;
  }
  if (t.isError) {
    return <div>{t.error.message}</div>;
  }
  return <div>{JSON.stringify(t.data)}</div>;
}
