"use client";
import { FiChevronsLeft, FiChevronsRight, FiSave } from "react-icons/fi";
import { FaCode } from "react-icons/fa";
import { IoDocumentText, IoSettingsSharp } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

export default function Sidebar({ collapsed, setCollapsed }) {
  const navItems = [
    { icon: <FaCode size={22} />, label: "Code", path: "/code" },
    {
      icon: <IoDocumentText size={22} />,
      label: "Markdown",
      path: "/markdown",
    },
    { icon: <FiSave size={22} />, label: "Saved", path: "/saved" },
  ];

  const settingsItem = {
    icon: <IoSettingsSharp size={22} />,
    label: "Settings",
    path: "/settings",
  };

  const renderNavItem = (item, index) => (
    <Link href={item.path} key={index}>
      <TooltipProvider key={index}>
        <Tooltip side="right" delayDuration={200}>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 px-2 py-2 hover:bg-blue-950 rounded-md cursor-pointer transition-colors group">
              <div className="w-6 h-6 flex items-center justify-center text-white">
                {item.icon}
              </div>
              <span
                className={`overflow-hidden transition-all duration-300 ease-in-out origin-left
                ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"} 
                group-hover:opacity-100 whitespace-nowrap`}
              >
                {item.label}
              </span>
            </div>
          </TooltipTrigger>
          {collapsed && (
            <TooltipContent side="right">
              <p>{item.label}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </Link>
  );

  return (
    <div
      className={`fixed top-19 left-0 pt-4 z-30 text-cream bg-dusk border-r border-cyan-400 font-semibold
        ${collapsed ? "w-16" : "md:w-48 w-40"}
        transition-all duration-150 flex flex-col justify-between h-[calc(100vh-5rem)]`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-1 -right-4 z-10 bg-blue-950 text-white rounded-lg p-1 hover:bg-blue-900 shadow-2xl shadow-accent"
      >
        {collapsed ? (
          <FiChevronsRight size={22} />
        ) : (
          <FiChevronsLeft size={20} />
        )}
      </button>

      <div className="flex flex-col gap-2 w-full px-2">
        {navItems.map(renderNavItem)}
      </div>

      <div className="px-2 pb-4 w-full">{renderNavItem(settingsItem)}</div>
    </div>
  );
}
