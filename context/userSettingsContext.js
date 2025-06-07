"use client";

import { getSettings } from "@/actions/settings";
import { createContext, useContext, useEffect, useState } from "react";

const UserSettingsContext = createContext();

export function UserSettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  return (
    <UserSettingsContext.Provider value={{ settings, setSettings, loading }}>
      {children}
    </UserSettingsContext.Provider>
  );
}

export function useUserSettings() {
  return useContext(UserSettingsContext);
}
