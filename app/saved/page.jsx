import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { AiFillFileMarkdown } from "react-icons/ai";
import { FaFileCode } from "react-icons/fa";

const SavedPage = () => {
  return (
    <div className="text-cream px-6 py-12 flex flex-col items-center">
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight lg:pb-3">
        Saved L<u>ibrary</u>
      </h2>
      <section className="mt-20 px-4 grid grid-cols-1 md:grid-cols-2 lg:gap-10 gap-6 max-w-md lg:max-w-5xl md:max-w-2xl w-full">
        <RouteCard
          Icon={AiFillFileMarkdown}
          title="Codes"
          desc="Access and manage your saved HTML, CSS, and JS code blocks."
          route="/saved/code"
        />
        <RouteCard
          Icon={FaFileCode}
          title="Markdowns"
          desc="View and organize your saved markdown documents and notes."
          route="/saved/code"
        />
      </section>
    </div>
  );
};

export default SavedPage;

function RouteCard({ title, desc, Icon, route }) {
  return (
    <button>
      <Link href={route}>
        <Card className="bg-slate-900 text-left border border-gray-700 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-shadow duration-300 group">
          <CardContent className="p-6 relative">
            {Icon && (
              <Icon className="absolute -top-2 left-4 text-accent group-hover:text-blue-400 transition-colors duration-300 text-5xl" />
            )}
            <h3 className="mt-6 md:text-2xl text-xl font-semibold mb-2 text-accent/70 group-hover:text-accent transition-colors duration-300">
              {title}
            </h3>
            <p className="pt-2 pl-1 text-sm text-cream">{desc}</p>
          </CardContent>
        </Card>
      </Link>
    </button>
  );
}
