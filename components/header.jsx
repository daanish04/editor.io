import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div className="fixed w-full flex justify-between items-center py-5 md:px-10 p-6 text-cream bg-dusk border-b border-cyan-400 z-100">
      <Link href="/" className="text-3xl font-bold ">
        Editor.io
      </Link>
      <div className="flex items-center justify-around gap-3">
        <span>
          <SignedOut>
            <SignInButton forceRedirectUrl="/">
              <Button variant="secondary" size="sm">
                <span className="font-medium text-cream">Login</span>
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </span>
        <span>theme</span>
      </div>
    </div>
  );
};

export default Header;
