"use client";

import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mocked server settings (replace with real db fetch)
const defaultSettings = {
  autosave: "local",
  keepToasts: true,
  buttonSounds: false,
  sortBy: "name",
};

const UserSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [localSettings, setLocalSettings] = useState(defaultSettings);

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(localSettings);

  const handleChange = (field, value) => {
    setLocalSettings((prev) => ({ ...prev, [field]: value }));
  };

  const resetSettings = () => setLocalSettings(settings);
  const saveSettings = async () => {
    // TODO: Call server action
    setSettings(localSettings);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-cream">
        User Settings
      </h2>

      <div className="grid gap-6">
        {/* Autosave */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Label className="mb-2 sm:mb-0 text-left w-full sm:w-1/2 text-cream">
            Autosave
          </Label>
          <Select
            value={localSettings.autosave}
            onValueChange={(value) => handleChange("autosave", value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Autosave Option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="disabled">Disabled</SelectItem>
              <SelectItem value="local">Local</SelectItem>
              <SelectItem value="db">Database</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Keep Toasts */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Label className="mb-2 sm:mb-0 text-left w-full sm:w-1/2 text-cream">
            Keep Toasts
          </Label>
          <Switch
            checked={localSettings.keepToasts}
            onCheckedChange={(value) => handleChange("keepToasts", value)}
          />
        </div>

        {/* Button Sounds */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Label className="mb-2 sm:mb-0 text-left w-full sm:w-1/2 text-cream">
            Button Sounds
          </Label>
          <Switch
            checked={localSettings.buttonSounds}
            onCheckedChange={(value) => handleChange("buttonSounds", value)}
          />
        </div>

        {/* File Sorting */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Label className="mb-2 sm:mb-0 text-left w-full sm:w-1/2 text-cream">
            Sort By
          </Label>
          <Select
            value={localSettings.sortBy}
            onValueChange={(value) => handleChange("sortBy", value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort files by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="lastModified">Last Modified</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4 pt-6">
        <Button
          variant="outline"
          onClick={resetSettings}
          disabled={!hasChanges}
        >
          Cancel
        </Button>
        <Button onClick={saveSettings} disabled={!hasChanges}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default UserSettings;
