"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);

  const autoCollapsedRoutes = ["/signin", "/signup", "/code", "/markdown"];

  useEffect(() => {
    const shouldCollapse = autoCollapsedRoutes.some((route) =>
      pathname.startsWith(route)
    );
    setCollapsed(shouldCollapse);
  }, [pathname]);

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className={`flex-1 pt-20 transition-all overflow-y-auto duration-150 ${
          collapsed ? "ml-16" : "md:ml-48 ml-40"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
