import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();
  return (
    <div className="fixed w-full flex justify-between items-center py-5 md:px-10 p-6 text-cream bg-dusk border-b border-cyan-400 z-100">
      <Link href="/" className="text-4xl font-bold ">
        Editor.<span className="text-accent">io</span>
      </Link>
      <div className="flex items-center justify-around gap-3">
        <span>
          <SignedOut>
            <SignInButton>
              <Button variant="secondary" size="sm">
                <span className="font-medium text-cream">Login</span>
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </span>
        {/* Themes */}
      </div>
    </div>
  );
};

export default Header;
