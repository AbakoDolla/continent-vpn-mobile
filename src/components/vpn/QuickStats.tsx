import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import Typography from '../../constants/typography';
import GlassCard from '../common/GlassCard';
import { LiveTelemetry } from '../../types';

interface QuickStatsProps {
  telemetry: LiveTelemetry;
  formattedDuration: string;
}

export const QuickStats: React.FC<QuickStatsProps> = ({ telemetry, formattedDuration }) => {
  return (
    <View style={styles.grid}>
      {/* Download Speed */}
      <GlassCard style={styles.statCard} padding={12} variant="cyan">
        <View style={styles.cardHeader}>
          <Ionicons name="arrow-down-circle" size={16} color={Colors.cyan} />
          <Text style={styles.statTitle}>DESCENTE</Text>
        </View>
        <Text style={[styles.statValue, { color: Colors.cyan }]}>
          {telemetry.downloadSpeed.toFixed(1)}
        </Text>
        <Text style={styles.statUnit}>MB/s</Text>
      </GlassCard>

      {/* Upload Speed */}
      <GlassCard style={styles.statCard} padding={12} variant="blue">
        <View style={styles.cardHeader}>
          <Ionicons name="arrow-up-circle" size={16} color={Colors.blue} />
          <Text style={styles.statTitle}>MONTÉE</Text>
        </View>
        <Text style={[styles.statValue, { color: Colors.blue }]}>
          {telemetry.uploadSpeed.toFixed(1)}
        </Text>
        <Text style={styles.statUnit}>MB/s</Text>
      </GlassCard>

      {/* Session Time */}
      <GlassCard style={styles.statCard} padding={12} variant="subtle">
        <View style={styles.cardHeader}>
          <Ionicons name="timer-outline" size={16} color={Colors.textSecondary} />
          <Text style={styles.statTitle}>DURÉE</Text>
        </View>
        <Text style={[styles.statValue, { color: Colors.textPrimary, fontSize: 15 }]}>
          {formattedDuration}
        </Text>
        <Text style={styles.statUnit}>ACTIF</Text>
      </GlassCard>

      {/* Threats Blocked */}
      <GlassCard style={styles.statCard} padding={12} variant="red">
        <View style={styles.cardHeader}>
          <Ionicons name="shield-outline" size={16} color={Colors.red} />
          <Text style={styles.statTitle}>MENACES</Text>
        </View>
        <Text style={[styles.statValue, { color: Colors.red }]}>
          {telemetry.threatsBlocked}
        </Text>
        <Text style={styles.statUnit}>NEUTRALISÉES</Text>
      </GlassCard>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '46%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  statTitle: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  statValue: {
    ...Typography.displayMedium,
    fontSize: 22,
    fontWeight: '800',
    marginVertical: 2,
  },
  statUnit: {
    ...Typography.caption,
    fontSize: 9,
    color: Colors.textMuted,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default QuickStats;
