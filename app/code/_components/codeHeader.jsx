"use client";

import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LuPencil } from "react-icons/lu";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

const CodeHeader = ({
  handleSave,
  autosave,
  keepSound,
  codeName,
  onResetScreen,
  onResetCode,
}) => {
  const [name, setName] = useState("Code_untitled");
  const [newName, setNewName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const [playClick] = useSound("/TapClick.mp3");

  useEffect(() => {
    setName(codeName || "Code_untitled");
    setNewName(codeName || "Code_untitled");
  }, [codeName]);

  const handleRename = () => {
    setName(newName);
    setIsEditing(false);
  };

  const handleNameCancel = () => {
    setNewName(name);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between h-10 px-8 pt-0.5 border-b border-primary">
      {/* Project Name */}
      <div className="flex items-baseline gap-1 text-cream">
        <Label htmlFor="name" className="opacity-80">
          Name:
        </Label>
        <Input
          id="name"
          type="text"
          value={isEditing ? newName : name}
          onChange={(e) => setNewName(e.target.value)}
          disabled={!isEditing}
          autoFocus={isEditing}
          className="border-0 focus:outline-none focus:ring-0 focus-visible:ring-0 shadow-none font-semibold text-white w-35 disabled:text-cream disabled:opacity-80"
        />
        {!isEditing ? (
          <Button
            variant="ghost"
            onClick={() => {
              if (keepSound) playClick();
              setIsEditing(true);
            }}
            className="hover:bg-secondary/20 hover:text-blue-300 py-1 px-2"
          >
            <LuPencil />
          </Button>
        ) : (
          <div className="flex items-baseline">
            <Button
              variant="ghost"
              onClick={() => {
                if (keepSound) playClick();
                handleRename();
              }}
              className="hover:bg-secondary/20 hover:text-green-400 py-1 px-2"
            >
              <FaCheck />
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                if (keepSound) playClick();
                handleNameCancel();
              }}
              className="hover:bg-secondary/20 hover:text-red-400 py-1 px-2"
            >
              <IoMdCloseCircleOutline />
            </Button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <p className="text-sm text-cream mx-3">
          Autosave :{" "}
          {autosave === "LOCAL" ? (
            <span className="text-green-200">ON</span>
          ) : (
            <span className="text-red-200">OFF</span>
          )}
        </p>

        <Button
          variant="outline"
          size="sm"
          className="px-2 bg-cream hover:bg-white"
          onClick={() => {
            if (keepSound) playClick();
            handleSave(name);
          }}
        >
          <span className="text-xs">Save</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="px-2 bg-cream hover:bg-white"
          onClick={() => {
            if (keepSound) playClick();
            onResetScreen();
          }}
        >
          <span className="text-xs">Reset Screen</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="px-2 bg-cream hover:bg-white"
          onClick={() => {
            if (keepSound) playClick();
            onResetCode();
          }}
        >
          <span className="text-xs">Reset Code</span>
        </Button>
      </div>
    </div>
  );
};

export default CodeHeader;
