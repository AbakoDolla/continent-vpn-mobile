import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../src/constants/colors';
import Typography from '../src/constants/typography';
import Header from '../src/components/common/Header';
import GlassCard from '../src/components/common/GlassCard';
import NeonButton from '../src/components/common/NeonButton';
import { MOCK_DEVICES } from '../src/services/mockData';
import { LinkedDevice } from '../src/types';

export default function DevicesScreen() {
  const [devices, setDevices] = useState<LinkedDevice[]>(MOCK_DEVICES);

  const handleRevoke = (device: LinkedDevice) => {
    if (device.isCurrentDevice) {
      Alert.alert('Action Impossible', 'Vous ne pouvez pas révoquer l’appareil actuel depuis cette session.');
      return;
    }

    Alert.alert(
      'Révoquer l’Accès',
      `Voulez-vous déconnecter immédiatement "${device.name}" ? Toutes ses clés de chiffrement seront invalidées.`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Révoquer',
          style: 'destructive',
          onPress: () => {
            setDevices((prev) => prev.filter((d) => d.id !== device.id));
            Alert.alert('Appareil Révoqué', `La session de "${device.name}" a été fermée.`);
          },
        },
      ]
    );
  };

  const handlePairNewDevice = () => {
    Alert.alert(
      'Synchronisation d’Appareil',
      'Votre clé cryptographique d’association temporaire est :\n\nCNT-9482-MESH\n\nEntrez ce code sur votre second appareil pour synchroniser vos clés sécurisées.',
      [{ text: 'Compris' }]
    );
  };

  const getDeviceIcon = (type: LinkedDevice['deviceType']) => {
    switch (type) {
      case 'macos':
      case 'windows':
      case 'linux':
        return 'laptop-outline';
      case 'ios':
      case 'android':
      default:
        return 'phone-portrait-outline';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="GESTION DES APPAREILS" subtitle="CONTRÔLE DES SESSIONS ACTIVES" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Capacity Overview */}
        <GlassCard style={styles.capacityCard} variant="cyan" padding={18}>
          <View style={styles.capacityHeader}>
            <View>
              <Text style={styles.capacityTitle}>EMPLACEMENTS UTILISÉS</Text>
              <Text style={styles.capacitySubtitle}>Formule Premium Guardian</Text>
            </View>
            <View style={styles.capacityPill}>
              <Text style={styles.capacityNumber}>
                {devices.length} <Text style={{ color: Colors.textMuted }}>/ 5</Text>
              </Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressBar,
                { width: `${(devices.length / 5) * 100}%` },
              ]}
            />
          </View>

          <Text style={styles.capacityNote}>
            Il vous reste {5 - devices.length} emplacements disponibles pour vos ordinateurs, tablettes ou téléphones.
          </Text>
        </GlassCard>

        {/* Pair New Device Action */}
        <NeonButton
          title="ASSOCIER UN NOUVEL APPAREIL"
          onPress={handlePairNewDevice}
          icon={<Ionicons name="qr-code-outline" size={18} color="#05070A" />}
          variant="cyan"
          size="md"
          style={{ marginVertical: 10 }}
        />

        {/* Device List */}
        <Text style={styles.sectionTitle}>APPAREILS ACTUELLEMENT SYNCHRONISÉS</Text>

        {devices.map((device) => (
          <GlassCard
            key={device.id}
            style={styles.deviceCard}
            variant={device.isCurrentDevice ? 'cyan' : 'subtle'}
            padding={16}
          >
            <View style={styles.deviceRow}>
              <View style={styles.deviceLeft}>
                <View
                  style={[
                    styles.iconBox,
                    device.isCurrentDevice && { backgroundColor: 'rgba(0, 229, 255, 0.15)', borderColor: Colors.cyan },
                  ]}
                >
                  <Ionicons
                    name={getDeviceIcon(device.deviceType) as any}
                    size={22}
                    color={device.isCurrentDevice ? Colors.cyan : Colors.textSecondary}
                  />
                </View>

                <View>
                  <View style={styles.titleRow}>
                    <Text style={styles.deviceName}>{device.name}</Text>
                    {device.isCurrentDevice && (
                      <View style={styles.currentBadge}>
                        <Text style={styles.currentText}>CET APPAREIL</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.deviceMeta}>
                    {device.osVersion} • {device.ipAddress}
                  </Text>
                  <Text style={styles.deviceActivity}>{device.lastActive}</Text>
                </View>
              </View>

              {!device.isCurrentDevice && (
                <TouchableOpacity
                  onPress={() => handleRevoke(device)}
                  style={styles.revokeButton}
                  activeOpacity={0.7}
                >
                  <Ionicons name="trash-outline" size={18} color={Colors.red} />
                </TouchableOpacity>
              )}
            </View>
          </GlassCard>
        ))}
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
  capacityCard: {
    marginVertical: 12,
  },
  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  capacityTitle: {
    ...Typography.cyberHeader,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  capacitySubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  capacityPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 229, 255, 0.12)',
    borderWidth: 1,
    borderColor: Colors.cyan,
  },
  capacityNumber: {
    ...Typography.cyberCode,
    fontSize: 14,
    color: Colors.cyan,
    fontWeight: '800',
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.cyan,
    borderRadius: 3,
  },
  capacityNote: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  sectionTitle: {
    ...Typography.cyberHeader,
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 16,
    marginBottom: 10,
    letterSpacing: 1.2,
  },
  deviceCard: {
    marginBottom: 10,
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deviceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  deviceName: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  currentBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 229, 255, 0.15)',
    borderWidth: 1,
    borderColor: Colors.cyan,
  },
  currentText: {
    ...Typography.caption,
    fontSize: 8,
    color: Colors.cyan,
    fontWeight: '800',
  },
  deviceMeta: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  deviceActivity: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  revokeButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 16, 24, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 16, 24, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
