import { Button } from "@/components/ui/button";
import { LuPencil } from "react-icons/lu";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import useSound from "use-sound";

const MarkdownHeader = ({
  autosave,
  keepSound,
  codeName,
  markdown,
  setMarkdown,
  handleSave,
}) => {
  const [name, setName] = useState("Md_untitled");
  const [newName, setNewName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const [playClick] = useSound("/TapClick.mp3");

  const fileImportRef = useRef(null);

  useEffect(() => {
    setName(codeName || "Md_untitled");
    setNewName(codeName || "Md_untitled");
  }, [codeName]);

  const handleRename = () => {
    setName(newName);
    setIsEditing(false);
  };

  const handleNameCancel = () => {
    setNewName(name);
    setIsEditing(false);
  };

  const handleImportClick = () => {
    fileImportRef.current.click();
  };

  const handleFileImport = async (e) => {
    const file = e.target.files?.[0];

    if (!file || !file.name.endsWith(".md")) {
      toast.error("Only Markdown files are supported.");
      return;
    }
    const text = await file.text();

    setMarkdown(text);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    toast.info("Copied to clipboard");
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name || "Untitled"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center justify-between h-10 px-8 pt-0.5 border-b border-primary">
      {/* Work Name */}
      <div className="flex justify-center items-baseline gap-1 text-cream">
        <Label htmlFor="name" className="opacity-80">
          Name:
        </Label>
        <Input
          id="name"
          type="text"
          value={isEditing ? newName : name}
          onChange={(e) => setNewName(e.target.value)}
          disabled={!isEditing}
          autoFocus={true}
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
            <LuPencil className="bg-none hover:bg-none" />
          </Button>
        ) : (
          <div className="flex items-baseline justify-center">
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
      <div className="flex items-center justify-between gap-3">
        {/* Autosave */}
        <p className="text-sm text-cream mx-3">
          Autosave :{" "}
          {autosave === "LOCAL" ? (
            <span className="text-green-200">ON</span>
          ) : (
            <span className="text-red-200">OFF</span>
          )}
        </p>

        {/* Save btn */}

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

        {/* Import btn */}
        <input
          ref={fileImportRef}
          type="file"
          accept=".md"
          onChange={handleFileImport}
          className="hidden"
        />
        <Button
          variant="outline"
          size="sm"
          className="px-2 bg-cream hover:bg-white"
          onClick={() => {
            if (keepSound) playClick();
            handleImportClick();
          }}
        >
          <span className="text-xs">Import(.md)</span>
        </Button>
        {/* Copy btn */}
        <Button
          variant="outline"
          size="sm"
          className="px-2 bg-cream hover:bg-white"
          onClick={() => {
            if (keepSound) playClick();
            handleCopy();
          }}
        >
          <span className="text-xs">Copy</span>
        </Button>
        {/* Download btn */}

        <Button
          variant="outline"
          size="sm"
          className="px-2 bg-cream hover:bg-white"
          onClick={() => {
            if (keepSound) playClick();
            handleDownload();
          }}
        >
          <span className="text-xs">Download (.md)</span>
        </Button>
      </div>
    </div>
  );
};

export default MarkdownHeader;
