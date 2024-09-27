import { serverClient } from "@/trpc/server";
import Link from "next/link";
import React from "react";

export default async function page() {
  const server = await serverClient.sayHi({ name: "Darshan" });
  return (
    <>
      <div>{server}</div>
      <Link href={"/"}>Go to client page</Link>
    </>
  );
}
