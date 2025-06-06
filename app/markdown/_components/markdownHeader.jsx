import { Button } from "@/components/ui/button";
import { LuPencil } from "react-icons/lu";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const MarkdownHeader = ({ markdown, setMarkdown }) => {
  const [name, setName] = useState("Untitled");
  const [newName, setNewName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const fileImportRef = useRef(null);

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
          className="border-0 focus:outline-none focus:ring-0 focus-visible:ring-0 shadow-none font-semibold text-white w-30 disabled:text-cream disabled:opacity-80"
        />
        {!isEditing ? (
          <Button
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="hover:bg-secondary/20 hover:text-blue-300 py-1 px-2"
          >
            <LuPencil className="bg-none hover:bg-none" />
          </Button>
        ) : (
          <div className="flex items-baseline justify-center">
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
      <div className="flex items-center justify-between gap-3">
        {/* Save btn */}

        <Button
          variant="outline"
          size="sm"
          className="px-2 bg-cream hover:bg-white"
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
          onClick={handleImportClick}
        >
          <span className="text-xs">Import(.md)</span>
        </Button>
        {/* Copy btn */}
        <Button
          variant="outline"
          size="sm"
          className="px-2 bg-cream hover:bg-white"
          onClick={handleCopy}
        >
          <span className="text-xs">Copy</span>
        </Button>
        {/* Download btn */}

        <Button
          variant="outline"
          size="sm"
          className="px-2 bg-cream hover:bg-white"
          onClick={handleDownload}
        >
          <span className="text-xs">Download (.md)</span>
        </Button>
      </div>
    </div>
  );
};

export default MarkdownHeader;
