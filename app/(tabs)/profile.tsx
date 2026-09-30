import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../src/constants/colors';
import Typography from '../../src/constants/typography';
import Header from '../../src/components/common/Header';
import GlassCard from '../../src/components/common/GlassCard';
import NeonButton from '../../src/components/common/NeonButton';
import { useAuth } from '../../src/context/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion Sécurisée',
      'Voulez-vous fermer votre session Guardian sur cet appareil ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnecter',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="PROFIL OPÉRATEUR" subtitle="IDENTITÉ CYBER SOUVERAINE" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Operator Identity Card */}
        <GlassCard style={styles.profileCard} variant="cyan" padding={20}>
          <View style={styles.avatarRow}>
            <View style={styles.avatarHolder}>
              <Image
                source={require('../../assets/images/continent-vpn-logo.png')}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </View>

            <View style={styles.identityInfo}>
              <View style={styles.aliasRow}>
                <Text style={styles.aliasText}>{user?.operatorAlias || 'OPÉRATEUR'}</Text>
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={14} color={Colors.cyan} />
                </View>
              </View>
              <Text style={styles.emailText}>{user?.email || 'operator@continentvpn.com'}</Text>
              <Text style={styles.idText}>ID: {user?.id || 'USR_CONTIN_007'}</Text>
            </View>
          </View>
        </GlassCard>

        {/* Subscription Tier Status */}
        <GlassCard style={styles.subCard} variant="blue" padding={18}>
          <View style={styles.subHeader}>
            <View>
              <Text style={styles.subLabel}>ABONNEMENT ACTIF</Text>
              <Text style={styles.subTitle}>PREMIUM GUARDIAN</Text>
            </View>
            <View style={styles.tierPill}>
              <Text style={styles.tierPillText}>ACTIF</Text>
            </View>
          </View>

          <View style={styles.subDetails}>
            <Text style={styles.expiryText}>
              Valide jusqu'au <Text style={{ color: Colors.cyan }}>30 Septembre 2027</Text>
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/plans')}
              activeOpacity={0.7}
            >
              <Text style={styles.manageText}>Gérer les forfaits</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>

        {/* Linked Devices Status */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push('/devices')}
        >
          <GlassCard style={styles.devicesCard} variant="subtle" padding={16}>
            <View style={styles.cardRow}>
              <View style={styles.rowLeft}>
                <View style={styles.iconBox}>
                  <Ionicons name="hardware-chip-outline" size={22} color={Colors.cyan} />
                </View>
                <View>
                  <Text style={styles.itemTitle}>Appareils Autorisés</Text>
                  <Text style={styles.itemSubtitle}>2 sur 5 emplacements utilisés</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.cyan} />
            </View>

            {/* Micro bar */}
            <View style={styles.deviceTrack}>
              <View style={[styles.deviceBar, { width: '40%' }]} />
            </View>
          </GlassCard>
        </TouchableOpacity>

        {/* Menu Navigation List */}
        <Text style={styles.sectionHeader}>PARAMÈTRES & ASSISTANCE</Text>

        {[
          {
            title: 'Gestion des Appareils',
            sub: 'Gérer les sessions mobiles, ordinateurs et révocations',
            icon: 'laptop-outline',
            route: '/devices',
          },
          {
            title: 'Sécurité & Kill Switch',
            sub: 'Configuration DNS, protocoles et protection active',
            icon: 'shield-checkmark-outline',
            route: '/settings',
          },
          {
            title: 'Flux de Notifications',
            sub: 'Alertes d’intrusion, état du réseau et journal',
            icon: 'notifications-outline',
            route: '/notifications',
          },
          {
            title: 'Support Cyber 24/7',
            sub: 'Assistance en direct, FAQ et diagnostics',
            icon: 'help-buoy-outline',
            route: '/support',
          },
        ].map((item, idx) => (
          <TouchableOpacity
            key={idx}
            activeOpacity={0.8}
            onPress={() => router.push(item.route as any)}
          >
            <GlassCard style={styles.menuCard} variant="subtle" padding={14}>
              <View style={styles.cardRow}>
                <View style={styles.rowLeft}>
                  <View style={styles.iconBox}>
                    <Ionicons name={item.icon as any} size={20} color={Colors.cyan} />
                  </View>
                  <View>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemSubtitle}>{item.sub}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
              </View>
            </GlassCard>
          </TouchableOpacity>
        ))}

        {/* Logout Action */}
        <NeonButton
          title="DÉCONNEXION DE L'OPÉRATEUR"
          onPress={handleLogout}
          variant="outline"
          size="md"
          style={{ marginTop: 20 }}
        />
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
  profileCard: {
    marginVertical: 12,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarHolder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: Colors.cyan,
    overflow: 'hidden',
    backgroundColor: '#071525',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  identityInfo: {
    flex: 1,
  },
  aliasRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  aliasText: {
    ...Typography.cyberHeader,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  verifiedBadge: {
    marginLeft: 2,
  },
  emailText: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  idText: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 10,
    marginTop: 4,
    letterSpacing: 1,
  },
  subCard: {
    marginBottom: 12,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 9,
    letterSpacing: 1.2,
  },
  subTitle: {
    ...Typography.cyberHeader,
    fontSize: 15,
    color: Colors.cyan,
    marginTop: 2,
  },
  tierPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 255, 136, 0.15)',
    borderWidth: 1,
    borderColor: Colors.emerald,
  },
  tierPillText: {
    ...Typography.caption,
    fontSize: 9,
    color: Colors.emerald,
    fontWeight: '800',
  },
  subDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
    paddingTop: 10,
  },
  expiryText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  manageText: {
    ...Typography.caption,
    color: Colors.cyan,
    fontWeight: '700',
  },
  devicesCard: {
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    fontWeight: '700',
    fontSize: 13,
  },
  itemSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  deviceTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginTop: 12,
    overflow: 'hidden',
  },
  deviceBar: {
    height: '100%',
    backgroundColor: Colors.cyan,
    borderRadius: 2,
  },
  sectionHeader: {
    ...Typography.cyberHeader,
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 10,
    marginTop: 8,
    letterSpacing: 1.2,
  },
  menuCard: {
    marginBottom: 8,
  },
});
