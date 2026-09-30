// CONTINENT VPN - Domain Interfaces & Type Definitions

export type VpnStatus = 'dormant' | 'connecting' | 'protected' | 'alert';

export type VpnProtocol = 
  | 'CONTINENT-CORE' 
  | 'WIREGUARD-X' 
  | 'STEALTH-SHADOW' 
  | 'QUANTUM-MESH';

export type RoutingMode = 
  | 'intelligent' 
  | 'ultra-low-latency' 
  | 'stealth-double-hop' 
  | 'high-throughput';

export interface VpnNode {
  id: string;
  name: string;
  codename: string;
  region: string;
  countryCode: string;
  flagEmoji: string;
  ping: number; // in ms
  load: number; // 0 - 100 percentage
  isRecommended?: boolean;
  isPremium?: boolean;
  tier: 'free' | 'premium' | 'ultimate';
  ipAddress: string;
}

export interface LiveTelemetry {
  downloadSpeed: number; // in MB/s
  uploadSpeed: number;   // in MB/s
  ping: number;          // in ms
  packetLoss: number;    // percentage
  sessionDuration: number; // in seconds
  totalDownloaded: number; // in MB
  totalUploaded: number;   // in MB
  threatsBlocked: number;  // count of ads, malware, trackers
  currentIp: string;
  originalIp: string;
}

export interface UserProfile {
  id: string;
  operatorAlias: string;
  email: string;
  avatarUrl?: string;
  subscriptionTier: 'free' | 'premium' | 'ultimate';
  subscriptionExpiry: string;
  maxDevices: number;
  activeDevicesCount: number;
  createdAt: string;
}

export interface LinkedDevice {
  id: string;
  name: string;
  deviceType: 'ios' | 'android' | 'macos' | 'windows' | 'linux';
  ipAddress: string;
  lastActive: string;
  isCurrentDevice: boolean;
  osVersion: string;
}

export interface SecuritySettings {
  killSwitch: boolean;
  splitTunneling: boolean;
  cyberShield: boolean;      // Blocks ads, trackers, malware
  dnsLeakProtection: boolean;
  autoConnectOnUntrustedWifi: boolean;
  quantumObfuscation: boolean;
  biometricLock: boolean;
  selectedProtocol: VpnProtocol;
  routingMode: RoutingMode;
  notificationsEnabled: boolean;
}

export interface SubscriptionPlan {
  id: 'basic' | 'premium' | 'ultimate';
  title: string;
  badge?: string;
  isPopular?: boolean;
  monthlyPrice: number;
  quarterlyPrice: number;
  annualPrice: number;
  features: string[];
  maxDevices: number;
  speedLimit: string;
  supportLevel: string;
}

export interface ThreatNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'threat' | 'connection' | 'account' | 'system';
  severity: 'low' | 'medium' | 'high';
  read: boolean;
}
