"use client";

import { trpc } from "@/trpc/client";

export default function page() {
  const t = trpc.getDetails.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  if (t.isLoading) {
    return <div>Loading...</div>;
  }
  if (t.isError) {
    return <div>{t.error.message}</div>;
  }
  return <div>{JSON.stringify(t.data)}</div>;
}
