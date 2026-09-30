import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../src/constants/colors';
import Typography from '../../src/constants/typography';
import Header from '../../src/components/common/Header';
import GlassCard from '../../src/components/common/GlassCard';
import ActivityChart from '../../src/components/charts/ActivityChart';
import { useVpn } from '../../src/context/VpnContext';

export default function ActivityScreen() {
  const { telemetry } = useVpn();

  // Quota simulation (14.2 GB / 50 GB allowance or unlimited)
  const quotaUsedGB = 14.2;
  const quotaTotalGB = 50.0;
  const quotaPercentage = Math.round((quotaUsedGB / quotaTotalGB) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="ACTIVITÉ & SÉCURITÉ" subtitle="TÉLÉMÉTRIE EN TEMPS RÉEL" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Bandwidth Quota Card */}
        <GlassCard style={styles.quotaCard} variant="cyan" padding={18}>
          <View style={styles.quotaHeader}>
            <View>
              <Text style={styles.quotaTitle}>CONSOMMATION DE DONNÉES</Text>
              <Text style={styles.quotaSubtitle}>Cycle en cours • Renouvellement le 1er du mois</Text>
            </View>
            <View style={styles.percentageBadge}>
              <Text style={styles.percentageText}>{quotaPercentage}%</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressBar, { width: `${quotaPercentage}%` }]} />
          </View>

          <View style={styles.quotaFooter}>
            <Text style={styles.quotaValues}>
              <Text style={styles.highlight}>{quotaUsedGB} GB</Text> utilisés sur {quotaTotalGB} GB
            </Text>
            <Text style={styles.unlimitedNote}>Bande passante non bridée</Text>
          </View>
        </GlassCard>

        {/* Live SVG Throughput Chart */}
        <ActivityChart />

        {/* Cyber Threat Shield Counter */}
        <GlassCard style={styles.threatCard} variant="red" padding={18}>
          <View style={styles.threatHeader}>
            <View style={styles.threatIconBox}>
              <Ionicons name="shield-outline" size={24} color={Colors.red} />
            </View>
            <View>
              <Text style={styles.threatTitle}>BOUCLIER CYBERACTIF</Text>
              <Text style={styles.threatSubtitle}>
                {telemetry.threatsBlocked} menaces et traqueurs neutralisés
              </Text>
            </View>
          </View>

          <View style={styles.threatGrid}>
            <View style={styles.threatItem}>
              <Text style={styles.threatNumber}>14</Text>
              <Text style={styles.threatLabel}>Traqueurs pistés</Text>
            </View>
            <View style={styles.threatItem}>
              <Text style={styles.threatNumber}>8</Text>
              <Text style={styles.threatLabel}>Sites de phishing</Text>
            </View>
            <View style={styles.threatItem}>
              <Text style={styles.threatNumber}>6</Text>
              <Text style={styles.threatLabel}>Injections de scripts</Text>
            </View>
            <View style={styles.threatItem}>
              <Text style={[styles.threatNumber, { color: Colors.emerald }]}>0</Text>
              <Text style={styles.threatLabel}>Fuites DNS</Text>
            </View>
          </View>
        </GlassCard>

        {/* Recent Session History */}
        <View style={styles.historySection}>
          <Text style={styles.sectionHeader}>HISTORIQUE DES SESSIONS PROTÉGÉES</Text>

          {[
            {
              id: 's1',
              node: 'CONTINENT Core - Neural Mesh',
              duration: '3h 12m',
              data: '2.4 GB',
              time: 'Aujourd’hui, 08:30',
              status: 'Terminé sans incident',
            },
            {
              id: 's2',
              node: 'Frankfurt Quantum Vault',
              duration: '1h 45m',
              data: '890 MB',
              time: 'Hier, 19:15',
              status: 'Terminé sans incident',
            },
            {
              id: 's3',
              node: 'Lagos Cyber Gateway',
              duration: '5h 20m',
              data: '4.8 GB',
              time: '28 Sept, 14:00',
              status: 'Kill Switch activé préventivement',
            },
          ].map((item) => (
            <GlassCard key={item.id} style={styles.historyCard} variant="subtle" padding={14}>
              <View style={styles.historyRow}>
                <View style={styles.historyLeft}>
                  <Ionicons name="checkmark-done-circle" size={20} color={Colors.cyan} />
                  <View>
                    <Text style={styles.historyNode}>{item.node}</Text>
                    <Text style={styles.historyTime}>{item.time}</Text>
                  </View>
                </View>
                <View style={styles.historyRight}>
                  <Text style={styles.historyData}>{item.data}</Text>
                  <Text style={styles.historyDuration}>{item.duration}</Text>
                </View>
              </View>
            </GlassCard>
          ))}
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
  quotaCard: {
    marginVertical: 12,
  },
  quotaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  quotaTitle: {
    ...Typography.cyberHeader,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  quotaSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  percentageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 229, 255, 0.15)',
    borderWidth: 1,
    borderColor: Colors.cyan,
  },
  percentageText: {
    ...Typography.cyberCode,
    color: Colors.cyan,
    fontSize: 12,
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
  quotaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quotaValues: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  highlight: {
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  unlimitedNote: {
    ...Typography.caption,
    color: Colors.emerald,
    fontSize: 10,
    fontWeight: '700',
  },
  threatCard: {
    marginVertical: 10,
  },
  threatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  threatIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 16, 24, 0.15)',
    borderWidth: 1,
    borderColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  threatTitle: {
    ...Typography.cyberHeader,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  threatSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  threatGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 16, 24, 0.2)',
    paddingTop: 12,
  },
  threatItem: {
    alignItems: 'center',
  },
  threatNumber: {
    ...Typography.displayMedium,
    fontSize: 18,
    color: Colors.red,
    fontWeight: '800',
  },
  threatLabel: {
    ...Typography.caption,
    fontSize: 9,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  historySection: {
    marginTop: 16,
  },
  sectionHeader: {
    ...Typography.cyberHeader,
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 10,
    letterSpacing: 1.2,
  },
  historyCard: {
    marginBottom: 8,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  historyNode: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    fontWeight: '700',
    fontSize: 13,
  },
  historyTime: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyData: {
    ...Typography.cyberCode,
    color: Colors.cyan,
    fontSize: 12,
    fontWeight: '700',
  },
  historyDuration: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 10,
    marginTop: 2,
  },
});
