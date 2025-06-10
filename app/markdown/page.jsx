import React, { Suspense } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import MarkdownPage from "./_components/markdownPage";

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-full w-full">
          <LuLoaderCircle className="animate-spin mx-auto" size={35} />
        </div>
      }
    >
      <MarkdownPage />
    </Suspense>
  );
};

export default Page;
