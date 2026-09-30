import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import StorageService from '../services/storage';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (alias: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (code: string) => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  completeOnboarding: () => Promise<void>;
  logout: () => Promise<void>;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr_contin_007',
  operatorAlias: 'SHADOW_VIPER',
  email: 'operator@continentvpn.com',
  subscriptionTier: 'premium',
  subscriptionExpiry: '2027-09-30',
  maxDevices: 5,
  activeDevicesCount: 2,
  createdAt: '2026-01-15',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedUser = await StorageService.getItem<UserProfile | null>(
        StorageService.keys.USER_PROFILE,
        DEFAULT_USER
      );
      const onboarding = await StorageService.getItem<boolean>(
        StorageService.keys.ONBOARDING_COMPLETED,
        true
      );
      setUser(storedUser);
      setIsAuthenticated(!!storedUser);
      setHasCompletedOnboarding(onboarding);
    } catch (e) {
      console.warn('Auth state load error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 800)); // Simulate cryptographic handshake
    if (!email || !pass) {
      setIsLoading(false);
      return { success: false, error: 'Identifiants invalides.' };
    }
    const loggedUser: UserProfile = {
      ...DEFAULT_USER,
      email,
      operatorAlias: email.split('@')[0].toUpperCase(),
    };
    setUser(loggedUser);
    setIsAuthenticated(true);
    await StorageService.setItem(StorageService.keys.USER_PROFILE, loggedUser);
    setIsLoading(false);
    return { success: true };
  };

  const register = async (alias: string, email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 900));
    if (!alias || !email || !pass) {
      setIsLoading(false);
      return { success: false, error: 'Veuillez remplir tous les champs.' };
    }
    const newUser: UserProfile = {
      ...DEFAULT_USER,
      id: `usr_${Date.now()}`,
      operatorAlias: alias.toUpperCase(),
      email,
    };
    setUser(newUser);
    setIsAuthenticated(true);
    await StorageService.setItem(StorageService.keys.USER_PROFILE, newUser);
    setIsLoading(false);
    return { success: true };
  };

  const verifyOtp = async (code: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 600));
    if (code.length === 6) {
      setIsLoading(false);
      return { success: true };
    }
    setIsLoading(false);
    return { success: false, error: 'Code de sécurité incorrect ou expiré.' };
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 500));
    setIsLoading(false);
    return { success: true };
  };

  const completeOnboarding = async () => {
    setHasCompletedOnboarding(true);
    await StorageService.setItem(StorageService.keys.ONBOARDING_COMPLETED, true);
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    await StorageService.removeItem(StorageService.keys.USER_PROFILE);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        hasCompletedOnboarding,
        login,
        register,
        verifyOtp,
        forgotPassword,
        completeOnboarding,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
