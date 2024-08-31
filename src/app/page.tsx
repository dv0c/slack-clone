
'use client'
import { useAuthActions } from "@convex-dev/auth/react";
export default function Home() {
  const { signOut } = useAuthActions();
  return (
    <div>
      logged in
      <button onClick={() =>signOut}>Sign out</button>
    </div>
  );
}
