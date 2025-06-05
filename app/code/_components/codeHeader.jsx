"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LuPencil } from "react-icons/lu";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

const CodeHeader = ({ onResetScreen, onResetCode }) => {
  const [name, setName] = useState("Untitled");
  const [newName, setNewName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

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
          className="border-0 focus:outline-none focus:ring-0 focus-visible:ring-0 shadow-none font-semibold text-white w-30 disabled:text-cream disabled:opacity-80"
        />
        {!isEditing ? (
          <Button
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="hover:bg-secondary/20 hover:text-blue-300 py-1 px-2"
          >
            <LuPencil />
          </Button>
        ) : (
          <div className="flex items-baseline">
            <Button
              variant="ghost"
              onClick={handleRename}
              className="hover:bg-secondary/20 hover:text-green-400 py-1 px-2"
            >
              <FaCheck />
            </Button>
            <Button
              variant="ghost"
              onClick={handleNameCancel}
              className="hover:bg-secondary/20 hover:text-red-400 py-1 px-2"
            >
              <IoMdCloseCircleOutline />
            </Button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="px-2 bg-cream hover:bg-white"
        >
          <span className="text-xs">Save</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="px-2 bg-cream hover:bg-white"
          onClick={onResetScreen}
        >
          <span className="text-xs">Reset Screen</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="px-2 bg-cream hover:bg-white"
          onClick={onResetCode}
        >
          <span className="text-xs">Reset Code</span>
        </Button>
      </div>
    </div>
  );
};

export default CodeHeader;
