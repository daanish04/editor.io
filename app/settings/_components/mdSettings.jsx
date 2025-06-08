import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useUserSettings } from "@/context/userSettingsContext";
import { LuLoaderCircle } from "react-icons/lu";
import { updateSettings } from "@/actions/settings";
import { toast } from "sonner";

const MdSettings = () => {
  const { settings, setSettings } = useUserSettings();
  const [localSettings, setLocalSettings] = useState(null);

  useEffect(() => {
    if (settings) setLocalSettings(settings);
  }, [settings]);

  if (!localSettings)
    return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-cream">
          Markdown Settings
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
        Markdown Settings
      </h2>

      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <Label>Enable GFM</Label>
          <Switch
            checked={localSettings.enableGFM}
            onCheckedChange={(value) => handleChange("enableGFM", value)}
          />
        </div>

        <div className="flex justify-between items-center">
          <Label>Syntax Highlighting</Label>
          <Switch
            checked={localSettings.syntaxHighlighting}
            onCheckedChange={(value) =>
              handleChange("syntaxHighlighting", value)
            }
          />
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

export default MdSettings;
