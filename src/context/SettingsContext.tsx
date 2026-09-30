import React, { createContext, useContext, useState, useEffect } from 'react';
import { SecuritySettings } from '../types';
import { DEFAULT_SETTINGS } from '../services/mockData';
import StorageService from '../services/storage';

interface SettingsContextType {
  settings: SecuritySettings;
  updateSetting: <K extends keyof SecuritySettings>(key: K, value: SecuritySettings[K]) => Promise<void>;
  resetSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SecuritySettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await StorageService.getItem<SecuritySettings>(
        StorageService.keys.SECURITY_SETTINGS,
        DEFAULT_SETTINGS
      );
      setSettings(stored);
    } catch (e) {
      console.warn('Error loading settings:', e);
    }
  };

  const updateSetting = async <K extends keyof SecuritySettings>(
    key: K,
    value: SecuritySettings[K]
  ) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    await StorageService.setItem(StorageService.keys.SECURITY_SETTINGS, updated);
  };

  const resetSettings = async () => {
    setSettings(DEFAULT_SETTINGS);
    await StorageService.setItem(StorageService.keys.SECURITY_SETTINGS, DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
