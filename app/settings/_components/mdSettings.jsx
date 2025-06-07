import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const defaultMdSettings = {
  enableGFM: true,
  syntaxHighlighting: true,
};

const MdSettings = () => {
  const [mdSettings, setMdSettings] = useState(defaultMdSettings);
  const [savedSettings, setSavedSettings] = useState(defaultMdSettings);

  useEffect(() => {
    // TODO: Fetch initial values from DB
  }, []);

  const isChanged =
    JSON.stringify(mdSettings) !== JSON.stringify(savedSettings);

  const handleSave = () => {
    // TODO: use server action to update DB
    setSavedSettings(mdSettings);
  };

  const handleCancel = () => {
    setMdSettings(savedSettings);
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
            checked={mdSettings.enableGFM}
            onCheckedChange={(val) =>
              setMdSettings({ ...mdSettings, enableGFM: val })
            }
          />
        </div>

        <div className="flex justify-between items-center">
          <Label>Syntax Highlighting</Label>
          <Switch
            checked={mdSettings.syntaxHighlighting}
            onCheckedChange={(val) =>
              setMdSettings({ ...mdSettings, syntaxHighlighting: val })
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

export default MdSettings;
