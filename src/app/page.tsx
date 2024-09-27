"use client";
import { trpc } from "@/trpc/client";
import Link from "next/link";

export default function Home() {
  const client = trpc.sayHi.useQuery({ name: "Darshan" });
  if (client.isLoading) {
    return <div>Loading...</div>;
  }

  if (client.error) {
    return <div>{client.error.message}</div>;
  }
  return (
    <>
      <div>{client.data}</div>
      <Link href={"/server"}>Go to server page</Link>
    </>
  );
}
