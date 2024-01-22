"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return null;
  }

  return (
    <div className="flex space-x-3">
      {status === "authenticated" && (
        <div>
          {session.user!.name}
          <Link href="/api/auth/signout">logout</Link>
        </div>
      )}
      {status === "unauthenticated" && <Link href="/api/auth/signin">login</Link>}
    </div>
  );
};

export default Navbar;
