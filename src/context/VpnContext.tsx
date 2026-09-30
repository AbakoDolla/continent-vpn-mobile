import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { VpnStatus, VpnNode, LiveTelemetry, VpnProtocol } from '../types';
import { MOCK_NODES } from '../services/mockData';

interface VpnContextType {
  status: VpnStatus;
  currentNode: VpnNode;
  nodes: VpnNode[];
  telemetry: LiveTelemetry;
  selectedProtocol: VpnProtocol;
  formattedDuration: string;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  toggleConnection: () => Promise<void>;
  selectNode: (node: VpnNode) => void;
  setProtocol: (protocol: VpnProtocol) => void;
  triggerSecurityAlert: () => void;
  resolveSecurityAlert: () => void;
}

const INITIAL_TELEMETRY: LiveTelemetry = {
  downloadSpeed: 0,
  uploadSpeed: 0,
  ping: 14,
  packetLoss: 0,
  sessionDuration: 0,
  totalDownloaded: 1420.5,
  totalUploaded: 489.2,
  threatsBlocked: 28,
  currentIp: '197.210.64.11',
  originalIp: '197.210.64.11',
};

const VpnContext = createContext<VpnContextType | undefined>(undefined);

export const VpnProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<VpnStatus>('protected'); // Default protected for great initial demo
  const [nodes] = useState<VpnNode[]>(MOCK_NODES);
  const [currentNode, setCurrentNode] = useState<VpnNode>(MOCK_NODES[0]);
  const [selectedProtocol, setSelectedProtocol] = useState<VpnProtocol>('CONTINENT-CORE');
  const [telemetry, setTelemetry] = useState<LiveTelemetry>({
    ...INITIAL_TELEMETRY,
    downloadSpeed: 84.6,
    uploadSpeed: 23.4,
    currentIp: MOCK_NODES[0].ipAddress,
    sessionDuration: 4120, // 1h 08m demo duration
  });

  const timerRef = useRef<any>(null);

  // Live telemetry pulse simulation
  useEffect(() => {
    if (status === 'protected') {
      timerRef.current = setInterval(() => {
        setTelemetry((prev) => {
          const jitterDown = (Math.random() * 12 - 5);
          const jitterUp = (Math.random() * 4 - 2);
          const newDown = Math.max(15, Math.min(180, +(prev.downloadSpeed + jitterDown).toFixed(1)));
          const newUp = Math.max(5, Math.min(65, +(prev.uploadSpeed + jitterUp).toFixed(1)));
          const deltaMB = (newDown + newUp) / 100;

          return {
            ...prev,
            downloadSpeed: newDown,
            uploadSpeed: newUp,
            sessionDuration: prev.sessionDuration + 1,
            totalDownloaded: +(prev.totalDownloaded + deltaMB * 0.75).toFixed(1),
            totalUploaded: +(prev.totalUploaded + deltaMB * 0.25).toFixed(1),
            ping: Math.max(9, Math.min(35, prev.ping + Math.floor(Math.random() * 3 - 1))),
          };
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setTelemetry((prev) => ({
        ...prev,
        downloadSpeed: 0,
        uploadSpeed: 0,
        currentIp: prev.originalIp,
      }));
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  const connect = async () => {
    if (status === 'connecting' || status === 'protected') return;
    setStatus('connecting');
    // Simulated multi-stage cryptographic neural connection handshake
    await new Promise((res) => setTimeout(res, 1400));
    setStatus('protected');
    setTelemetry((prev) => ({
      ...prev,
      currentIp: currentNode.ipAddress,
      downloadSpeed: 75.4,
      uploadSpeed: 19.8,
      threatsBlocked: prev.threatsBlocked + 1,
    }));
  };

  const disconnect = async () => {
    if (status === 'dormant') return;
    setStatus('dormant');
    setTelemetry((prev) => ({
      ...prev,
      downloadSpeed: 0,
      uploadSpeed: 0,
      currentIp: prev.originalIp,
    }));
  };

  const toggleConnection = async () => {
    if (status === 'protected' || status === 'alert') {
      await disconnect();
    } else if (status === 'dormant') {
      await connect();
    }
  };

  const selectNode = (node: VpnNode) => {
    setCurrentNode(node);
    if (status === 'protected') {
      setTelemetry((prev) => ({
        ...prev,
        currentIp: node.ipAddress,
        ping: node.ping,
      }));
    }
  };

  const setProtocol = (protocol: VpnProtocol) => {
    setSelectedProtocol(protocol);
  };

  const triggerSecurityAlert = () => {
    setStatus('alert');
  };

  const resolveSecurityAlert = () => {
    setStatus('protected');
  };

  // Format session duration into HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  return (
    <VpnContext.Provider
      value={{
        status,
        currentNode,
        nodes,
        telemetry,
        selectedProtocol,
        formattedDuration: formatTime(telemetry.sessionDuration),
        connect,
        disconnect,
        toggleConnection,
        selectNode,
        setProtocol,
        triggerSecurityAlert,
        resolveSecurityAlert,
      }}
    >
      {children}
    </VpnContext.Provider>
  );
};

export const useVpn = () => {
  const context = useContext(VpnContext);
  if (!context) {
    throw new Error('useVpn must be used within a VpnProvider');
  }
  return context;
};
