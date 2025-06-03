import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      Page Not Found
      <Link href="/" className="text-blue-500 hover:underline">
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;
