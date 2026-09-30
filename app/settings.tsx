import React from 'react';
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
import SwitchRow from '../src/components/common/SwitchRow';
import NeonButton from '../src/components/common/NeonButton';
import { useSettings } from '../src/context/SettingsContext';
import { VpnProtocol } from '../src/types';

export default function SettingsScreen() {
  const { settings, updateSetting, resetSettings } = useSettings();

  const PROTOCOLS: { id: VpnProtocol; name: string; desc: string }[] = [
    {
      id: 'CONTINENT-CORE',
      name: 'CONTINENT Core (Recommandé)',
      desc: 'Maillage adaptatif avec équilibrage neuronal automatique.',
    },
    {
      id: 'WIREGUARD-X',
      name: 'WireGuard-X Turbo',
      desc: 'Cryptographie ChaCha20-Poly1305 pour un débit maximal.',
    },
    {
      id: 'STEALTH-SHADOW',
      name: 'Stealth Shadow',
      desc: 'Obfuscation avancée pour traverser les pare-feux stricts.',
    },
    {
      id: 'QUANTUM-MESH',
      name: 'Quantum Mesh Vault',
      desc: 'Algorithme résistant aux attaques par ordinateurs quantiques.',
    },
  ];

  const handleReset = () => {
    Alert.alert(
      'Réinitialiser les Paramètres',
      'Rétablir toutes les options de sécurité aux réglages d’usine par défaut ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: async () => {
            await resetSettings();
            Alert.alert('Succès', 'Paramètres réinitialisés.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="SÉCURITÉ & PARAMÈTRES" subtitle="MATRICE DE CONFIGURATION" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Core Shield Controls */}
        <Text style={styles.sectionTitle}>MATRICE DE DÉFENSE CYBER</Text>

        <GlassCard style={styles.card} variant="subtle" padding={16}>
          <SwitchRow
            icon={<Ionicons name="flash" size={20} color={Colors.cyan} />}
            title="Kill Switch Impératif"
            description="Coupe instantanément tout accès Internet si le tunnel VPN faiblit, éliminant tout risque de fuite."
            value={settings.killSwitch}
            onValueChange={(val) => updateSetting('killSwitch', val)}
            badge="CRITIQUE"
          />

          <SwitchRow
            icon={<Ionicons name="shield-checkmark" size={20} color={Colors.cyan} />}
            title="Bouclier Cyberactif"
            description="Filtre les publicités intrusives, les traqueurs de profilage et les domaines de phishing."
            value={settings.cyberShield}
            onValueChange={(val) => updateSetting('cyberShield', val)}
            badge="ACTIF"
          />

          <SwitchRow
            icon={<Ionicons name="lock-closed" size={20} color={Colors.cyan} />}
            title="Protection Fuite DNS"
            description="Force toutes les requêtes DNS à passer par les serveurs ultra-sécurisés CONTINENT."
            value={settings.dnsLeakProtection}
            onValueChange={(val) => updateSetting('dnsLeakProtection', val)}
          />

          <SwitchRow
            icon={<Ionicons name="wifi" size={20} color={Colors.cyan} />}
            title="Auto-Connexion Wi-Fi Public"
            description="Engage le bouclier immédiatement lors de la connexion à un réseau non mémorisé."
            value={settings.autoConnectOnUntrustedWifi}
            onValueChange={(val) => updateSetting('autoConnectOnUntrustedWifi', val)}
          />

          <SwitchRow
            icon={<Ionicons name="eye-off" size={20} color={Colors.cyan} />}
            title="Brouillage Furtif (Obfuscation)"
            description="Déguise les paquets VPN en trafic HTTPS classique pour contourner la censure."
            value={settings.quantumObfuscation}
            onValueChange={(val) => updateSetting('quantumObfuscation', val)}
          />

          <SwitchRow
            icon={<Ionicons name="finger-print" size={20} color={Colors.cyan} />}
            title="Verrouillage Biométrique"
            description="Exige FaceID ou l’empreinte digitale pour ouvrir l'application."
            value={settings.biometricLock}
            onValueChange={(val) => updateSetting('biometricLock', val)}
          />
        </GlassCard>

        {/* Protocol Selector */}
        <Text style={styles.sectionTitle}>SÉLECTEUR DE PROTOCOLE</Text>
        <View style={styles.protocolsList}>
          {PROTOCOLS.map((proto) => {
            const isSelected = settings.selectedProtocol === proto.id;
            return (
              <TouchableOpacity
                key={proto.id}
                activeOpacity={0.8}
                onPress={() => updateSetting('selectedProtocol', proto.id)}
              >
                <GlassCard
                  style={[styles.protocolCard, isSelected && styles.protocolCardSelected]}
                  variant={isSelected ? 'cyan' : 'subtle'}
                  padding={14}
                >
                  <View style={styles.protocolRow}>
                    <View style={styles.protocolInfo}>
                      <Text style={[styles.protocolName, isSelected && { color: Colors.cyan }]}>
                        {proto.name}
                      </Text>
                      <Text style={styles.protocolDesc}>{proto.desc}</Text>
                    </View>
                    <View style={[styles.radioCircle, isSelected && styles.radioCircleActive]}>
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                  </View>
                </GlassCard>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Reset Action */}
        <NeonButton
          title="RÉINITIALISER LES RÉGLAGES"
          onPress={handleReset}
          variant="outline"
          size="md"
          style={{ marginTop: 20 }}
        />

        {/* System Build Info */}
        <View style={styles.buildInfo}>
          <Text style={styles.buildText}>CONTINENT VPN Mobile • Version 1.0.0 (Build 2026.09)</Text>
          <Text style={styles.buildSub}>Moteur Cryptographique CONTINENT Core Engine v4.2</Text>
        </View>
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
  sectionTitle: {
    ...Typography.cyberHeader,
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 18,
    marginBottom: 10,
    letterSpacing: 1.2,
  },
  card: {
    marginBottom: 10,
  },
  protocolsList: {
    gap: 8,
  },
  protocolCard: {
    borderRadius: 14,
  },
  protocolCardSelected: {
    borderColor: Colors.cyan,
  },
  protocolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  protocolInfo: {
    flex: 1,
    paddingRight: 10,
  },
  protocolName: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    fontWeight: '700',
    fontSize: 13,
  },
  protocolDesc: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: Colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: Colors.cyan,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.cyan,
  },
  buildInfo: {
    alignItems: 'center',
    marginTop: 24,
    gap: 4,
  },
  buildText: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 10,
  },
  buildSub: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 9,
  },
});
