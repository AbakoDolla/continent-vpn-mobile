// CONTINENT VPN - Storage Service Abstraction
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  AUTH_TOKEN: '@continent_auth_token',
  USER_PROFILE: '@continent_user_profile',
  SECURITY_SETTINGS: '@continent_security_settings',
  SELECTED_NODE: '@continent_selected_node',
  ONBOARDING_COMPLETED: '@continent_onboarding_completed',
};

export const StorageService = {
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const json = JSON.stringify(value);
      await AsyncStorage.setItem(key, json);
    } catch (e) {
      console.error(`Storage error saving ${key}:`, e);
    }
  },

  async getItem<T>(key: string, defaultValue: T): Promise<T> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value) as T;
      }
    } catch (e) {
      console.error(`Storage error loading ${key}:`, e);
    }
    return defaultValue;
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error(`Storage error removing ${key}:`, e);
    }
  },

  keys: STORAGE_KEYS,
};

export default StorageService;
