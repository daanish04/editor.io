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
import { useUserSettings } from "@/context/userSettingsContext";
import { updateSettings } from "@/actions/settings";
import { LuLoaderCircle } from "react-icons/lu";
import { toast } from "sonner";

const UserSettings = () => {
  const { settings, setSettings } = useUserSettings();
  const [localSettings, setLocalSettings] = useState(null);

  useEffect(() => {
    if (settings) setLocalSettings(settings);
  }, [settings]);

  if (!localSettings)
    return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-cream">
          User Settings
        </h2>
        <LuLoaderCircle className="animate-spin mx-auto" size={35} />
      </div>
    );

  const isDirty = JSON.stringify(settings) !== JSON.stringify(localSettings);

  const handleSave = async () => {
    const updated = await updateSettings(localSettings);
    if (updated.success) {
      setSettings(updated.data);
      toast.success("Settings saved successfully");
    } else {
      toast.error("Failed to save settings");
    }
  };

  const handleCancel = () => {
    setLocalSettings(settings);
  };

  const handleChange = (field, value) => {
    setLocalSettings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-cream">
        User Settings
      </h2>

      <div className="grid gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Label className="mb-2 sm:mb-0 text-left w-full sm:w-1/2 text-cream">
            Autosave
          </Label>
          <Select
            value={localSettings.autosaveMode}
            onValueChange={(value) => handleChange("autosaveMode", value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Autosave Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DISABLED">Disabled</SelectItem>
              <SelectItem value="LOCAL">Local</SelectItem>
              {/* <SelectItem value="DB">Database</SelectItem> */}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Label className="mb-2 sm:mb-0 text-left w-full sm:w-1/2 text-cream">
            Keep Toasts
          </Label>
          <Switch
            checked={localSettings.keepToasts}
            onCheckedChange={(value) => handleChange("keepToasts", value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Label className="mb-2 sm:mb-0 text-left w-full sm:w-1/2 text-cream">
            Button Sounds
          </Label>
          <Switch
            checked={localSettings.buttonSounds}
            onCheckedChange={(value) => handleChange("buttonSounds", value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Label className="mb-2 sm:mb-0 text-left w-full sm:w-1/2 text-cream">
            Sort By
          </Label>
          <Select
            value={localSettings.sortBy}
            onValueChange={(value) => handleChange("sortBy", value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select File Sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NAME">Name</SelectItem>
              <SelectItem value="LAST_MODIFIED">Last Modified</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <Button
          onClick={handleCancel}
          disabled={!isDirty}
          className="bg-red-500 hover:bg-red-600"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={!isDirty}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default UserSettings;
