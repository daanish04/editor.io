"use client";

import React, { useState } from "react";
import UserSettings from "./_components/userSettings";
import EditorSettings from "./_components/editorSettings";
import MdSettings from "./_components/mdSettings";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const [selected, setSelected] = useState("user");

  return (
    <div className="p-6 sm:p-10 flex flex-col items-center">
      <h2 className="text-cream text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight pb-7">
        Personal{" "}
        <span className="text-accent">
          S<u>ettings</u>
        </span>
      </h2>
      {/* Header Buttons */}
      <div className="flex gap-3 md:gap-6 lg:gap-10 bg-accent rounded-xl w-fit py-1 px-2 mb-6">
        {["user", "editor", "markdown"].map((type) => (
          <Button
            key={type}
            size="lg"
            className={`${
              selected === type
                ? "bg-secondary text-white"
                : "bg-accent text-cream"
            } border-0 hover:bg-secondary hover:text-white font-bold px-4 py-2 rounded-lg`}
            onClick={() => setSelected(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </div>

      {/* Settings Content Container */}
      <div className="w-full max-w-5xl px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 text-cream">
        {selected === "user" && <UserSettings />}
        {selected === "editor" && <EditorSettings />}
        {selected === "markdown" && <MdSettings />}
      </div>
    </div>
  );
};

export default Settings;
