import React, { Suspense } from "react";
import CodePage from "./_components/codePage";
import { LuLoaderCircle } from "react-icons/lu";

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-full w-full">
          <LuLoaderCircle className="animate-spin mx-auto" size={35} />
        </div>
      }
    >
      <CodePage />
    </Suspense>
  );
};

export default Page;
