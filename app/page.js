"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { FiLayout } from "react-icons/fi";
import { GoShieldCheck } from "react-icons/go";
import { FaRegEye } from "react-icons/fa";

export default function Home() {
  return (
    <div className=" bg-dusk text-cream px-6 py-12 flex flex-col items-center">
      {/* Hero Section */}
      <section className="max-w-4xl text-center space-y-4">
        <h1 className="text-7xl font-bold tracking-tight">
          Editor.<span className="text-accent">io</span>
        </h1>
        <p className="text-xl text-cream">Code smart. Document beautifully.</p>
        <div className="mt-6 flex justify-center gap-4">
          <Button asChild className="bg-accent hover:bg-accent/70 text-white">
            <Link href="/code">Open Code Editor</Link>
          </Button>
          <Button
            asChild
            className="bg-secondary hover:bg-secondary/70 text-white"
          >
            <Link href="/markdown">Open Markdown Editor</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-20 px-4 grid grid-cols-1 md:grid-cols-3 lg:gap-10 gap-6 max-w-md lg:max-w-5xl md:max-w-2xl w-full">
        <FeatureCard
          Icon={FaRegEye}
          title="Real-time Preview"
          desc="Instantly see your code and markdown rendered in a split view."
        />
        <FeatureCard
          Icon={FiLayout}
          title="Split View Editing"
          desc="Edit side-by-side in a seamless layout."
        />
        <FeatureCard
          Icon={GoShieldCheck}
          title="Code Safety"
          desc="Your work is safe. Authenticated users can save their work."
        />
      </section>
    </div>
  );
}

function FeatureCard({ title, desc, Icon }) {
  return (
    <Card className="bg-slate-900 border border-gray-700 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-shadow duration-300 group">
      <CardContent className="p-6 relative">
        {Icon && (
          <Icon className="absolute -top-2 left-5 text-accent group-hover:text-blue-400 transition-colors duration-300 text-5xl" />
        )}
        <h3 className="mt-4 md:text-2xl text-xl font-semibold mb-2 text-accent/70 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        <p className="pt-2 pl-1 text-sm text-cream">{desc}</p>
      </CardContent>
    </Card>
  );
}
