import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../src/constants/colors';
import Typography from '../../src/constants/typography';
import Header from '../../src/components/common/Header';
import GlassCard from '../../src/components/common/GlassCard';
import GuardianHero from '../../src/components/guardian/GuardianHero';
import ConnectionCore from '../../src/components/vpn/ConnectionCore';
import QuickStats from '../../src/components/vpn/QuickStats';
import { useVpn } from '../../src/context/VpnContext';
import { useSettings } from '../../src/context/SettingsContext';

export default function CommandCenterHomeScreen() {
  const router = useRouter();
  const {
    status,
    currentNode,
    telemetry,
    selectedProtocol,
    formattedDuration,
    toggleConnection,
    triggerSecurityAlert,
    resolveSecurityAlert,
  } = useVpn();

  const { settings } = useSettings();

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Dynamic Guardian Visual System */}
        <GuardianHero
          status={status}
          onStateSelect={(st) => {
            if (st === 'alert') {
              triggerSecurityAlert();
            } else if (st === 'protected') {
              resolveSecurityAlert();
            } else if (st === 'connecting') {
              // trigger connecting
            } else if (st === 'dormant') {
              // disconnect
            }
          }}
          showStateControls={true}
        />

        {/* Futuristic Connection Core Button */}
        <ConnectionCore
          status={status}
          protocol={selectedProtocol}
          ping={telemetry.ping}
          onToggle={toggleConnection}
        />

        {/* Selected Mesh Node Quick Card */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push('/(tabs)/network')}
        >
          <GlassCard style={styles.nodeCard} variant="cyan" padding={14}>
            <View style={styles.nodeLeft}>
              <View style={styles.nodeFlagBox}>
                <Text style={styles.flagEmoji}>{currentNode.flagEmoji}</Text>
              </View>
              <View>
                <View style={styles.nodeTitleRow}>
                  <Text style={styles.nodeName}>{currentNode.name}</Text>
                  {currentNode.isRecommended && (
                    <View style={styles.recBadge}>
                      <Text style={styles.recText}>OPTIMAL</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.nodeIp}>IP: {telemetry.currentIp}</Text>
              </View>
            </View>

            <View style={styles.nodeRight}>
              <View style={styles.pingRow}>
                <View style={styles.pingDot} />
                <Text style={styles.pingText}>{telemetry.ping} ms</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.cyan} />
            </View>
          </GlassCard>
        </TouchableOpacity>

        {/* Live Cyber Telemetry QuickStats */}
        <QuickStats
          telemetry={telemetry}
          formattedDuration={formattedDuration}
        />

        {/* Security Shield Highlights */}
        <GlassCard style={styles.shieldHighlights} variant="subtle" padding={16}>
          <Text style={styles.shieldTitle}>ÉTAT DU SYSTÈME GUARDIAN</Text>

          <View style={styles.shieldGrid}>
            <View style={styles.shieldItem}>
              <Ionicons
                name={settings.killSwitch ? 'flash' : 'flash-outline'}
                size={18}
                color={settings.killSwitch ? Colors.cyan : Colors.textMuted}
              />
              <Text style={styles.shieldLabel}>Kill Switch</Text>
              <Text style={[styles.shieldStatus, { color: settings.killSwitch ? Colors.emerald : Colors.textMuted }]}>
                {settings.killSwitch ? 'ACTIF' : 'INACTIF'}
              </Text>
            </View>

            <View style={styles.shieldItem}>
              <Ionicons
                name={settings.cyberShield ? 'shield-checkmark' : 'shield-outline'}
                size={18}
                color={settings.cyberShield ? Colors.cyan : Colors.textMuted}
              />
              <Text style={styles.shieldLabel}>Anti-Menace</Text>
              <Text style={[styles.shieldStatus, { color: settings.cyberShield ? Colors.emerald : Colors.textMuted }]}>
                {settings.cyberShield ? 'ENGAGÉ' : 'DÉSACTIVÉ'}
              </Text>
            </View>

            <View style={styles.shieldItem}>
              <Ionicons
                name="lock-closed"
                size={18}
                color={settings.dnsLeakProtection ? Colors.cyan : Colors.textMuted}
              />
              <Text style={styles.shieldLabel}>Fuites DNS</Text>
              <Text style={[styles.shieldStatus, { color: settings.dnsLeakProtection ? Colors.emerald : Colors.textMuted }]}>
                {settings.dnsLeakProtection ? 'BLOQUÉES' : 'RISQUE'}
              </Text>
            </View>
          </View>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  nodeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  nodeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  nodeFlagBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagEmoji: {
    fontSize: 22,
  },
  nodeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nodeName: {
    ...Typography.bodyMedium,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  recBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 255, 136, 0.15)',
    borderWidth: 1,
    borderColor: Colors.emerald,
  },
  recText: {
    ...Typography.caption,
    fontSize: 8,
    color: Colors.emerald,
    fontWeight: '800',
  },
  nodeIp: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  nodeRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  pingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.emerald,
  },
  pingText: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  shieldHighlights: {
    marginVertical: 10,
  },
  shieldTitle: {
    ...Typography.cyberHeader,
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 14,
  },
  shieldGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  shieldItem: {
    alignItems: 'center',
    gap: 4,
  },
  shieldLabel: {
    ...Typography.caption,
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  shieldStatus: {
    ...Typography.caption,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
});
