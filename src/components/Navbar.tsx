"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <span className="text-lg font-semibold">Calendar Reminder</span>

        {session ? (
          <Button variant="outline" onClick={() => signOut()}>
            Logout
          </Button>
        ) : (
          <Button onClick={() => signIn("google")}>
            Login with Google
          </Button>
        )}
      </div>
    </nav>
  );
}