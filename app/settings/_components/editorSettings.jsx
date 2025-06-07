import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const defaultEditorSettings = {
  fontSize: "md",
  theme: "dark",
  lineNumbers: true,
};

const EditorSettings = () => {
  const [editorSettings, setEditorSettings] = useState(defaultEditorSettings);
  const [savedSettings, setSavedSettings] = useState(defaultEditorSettings);

  useEffect(() => {
    // TODO: Fetch initial values from DB
  }, []);

  const isChanged =
    JSON.stringify(editorSettings) !== JSON.stringify(savedSettings);

  const handleSave = () => {
    // TODO: use server action to update DB
    setSavedSettings(editorSettings);
  };

  const handleCancel = () => {
    setEditorSettings(savedSettings);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-cream">
        Editor Settings
      </h2>

      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <Label>Font Size</Label>
          <Select
            value={editorSettings.fontSize}
            onValueChange={(val) =>
              setEditorSettings({ ...editorSettings, fontSize: val })
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select font size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">Small (12)</SelectItem>
              <SelectItem value="md">Medium (14)</SelectItem>
              <SelectItem value="lg">Large (16)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between items-center">
          <Label>Theme</Label>
          <Select
            value={editorSettings.theme}
            onValueChange={(val) =>
              setEditorSettings({ ...editorSettings, theme: val })
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="light">Light</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between items-center">
          <Label>Line Numbers</Label>
          <Switch
            checked={editorSettings.lineNumbers}
            onCheckedChange={(val) =>
              setEditorSettings({ ...editorSettings, lineNumbers: val })
            }
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          disabled={!isChanged}
          onClick={handleSave}
          className="font-semibold"
        >
          Save
        </Button>
        <Button
          disabled={!isChanged}
          onClick={handleCancel}
          variant="secondary"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EditorSettings;
