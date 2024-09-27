"use client";

import { trpc } from "@/trpc/client";

export default function page() {
  const t = trpc.getDetails.useQuery();
  if (t.isLoading) {
    return <div>Loading...</div>;
  }
  if (t.error) {
    return <div>{t.error.message}</div>;
  }
  return <div>{JSON.stringify(t.data)}</div>;
}
