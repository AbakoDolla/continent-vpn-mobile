import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Circle, Line } from 'react-native-svg';
import Colors from '../../constants/colors';
import Typography from '../../constants/typography';
import GlassCard from '../common/GlassCard';

interface ActivityChartProps {
  period?: 'today' | '7days' | '30days';
}

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 70;
const CHART_HEIGHT = 160;

export const ActivityChart: React.FC<ActivityChartProps> = () => {
  const [activeFilter, setActiveFilter] = useState<'Aujourd’hui' | '7 jours' | '30 jours'>('Aujourd’hui');

  // Simulated traffic coordinates
  const dataPoints = [24, 38, 55, 42, 68, 92, 78, 110, 85, 96, 118, 104];
  const maxVal = Math.max(...dataPoints, 120);

  // Generate SVG path for line and area fill
  const stepX = CHART_WIDTH / (dataPoints.length - 1);
  let pathD = `M 0 ${CHART_HEIGHT - (dataPoints[0] / maxVal) * (CHART_HEIGHT - 30)}`;

  dataPoints.forEach((val, i) => {
    if (i === 0) return;
    const x = i * stepX;
    const y = CHART_HEIGHT - (val / maxVal) * (CHART_HEIGHT - 30);
    pathD += ` L ${x} ${y}`;
  });

  const areaD = `${pathD} L ${CHART_WIDTH} ${CHART_HEIGHT} L 0 ${CHART_HEIGHT} Z`;

  return (
    <GlassCard style={styles.card} variant="cyan" padding={16}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>DÉBIT DU MAILLAGE</Text>
          <Text style={styles.subTitle}>Transfert de données sécurisé en temps réel</Text>
        </View>

        {/* Filter Pills */}
        <View style={styles.filterPills}>
          {(['Aujourd’hui', '7 jours', '30 jours'] as const).map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[styles.pill, activeFilter === filter && styles.pillActive]}
            >
              <Text
                style={[
                  styles.pillText,
                  activeFilter === filter && styles.pillTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* SVG Neon Chart */}
      <View style={styles.chartHolder}>
        <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
          <Defs>
            <LinearGradient id="cyberAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={Colors.cyan} stopOpacity="0.35" />
              <Stop offset="1" stopColor={Colors.cyan} stopOpacity="0.0" />
            </LinearGradient>
          </Defs>

          {/* Grid lines */}
          <Line x1="0" y1={CHART_HEIGHT * 0.25} x2={CHART_WIDTH} y2={CHART_HEIGHT * 0.25} stroke="rgba(0,229,255,0.08)" strokeDasharray="4, 4" />
          <Line x1="0" y1={CHART_HEIGHT * 0.5} x2={CHART_WIDTH} y2={CHART_HEIGHT * 0.5} stroke="rgba(0,229,255,0.08)" strokeDasharray="4, 4" />
          <Line x1="0" y1={CHART_HEIGHT * 0.75} x2={CHART_WIDTH} y2={CHART_HEIGHT * 0.75} stroke="rgba(0,229,255,0.08)" strokeDasharray="4, 4" />

          {/* Area Fill */}
          <Path d={areaD} fill="url(#cyberAreaGrad)" />

          {/* Neon Line */}
          <Path
            d={pathD}
            fill="none"
            stroke={Colors.cyan}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Glowing Peak Point */}
          <Circle
            cx={CHART_WIDTH - stepX}
            cy={CHART_HEIGHT - (dataPoints[dataPoints.length - 2] / maxVal) * (CHART_HEIGHT - 30)}
            r="5"
            fill={Colors.cyan}
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </Svg>
      </View>

      {/* Legend & Peak Summary */}
      <View style={styles.footerRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.cyan }]} />
          <Text style={styles.legendText}>Pic: 118 MB/s</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.blue }]} />
          <Text style={styles.legendText}>Moyenne: 72.4 MB/s</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.emerald }]} />
          <Text style={styles.legendText}>Perte: 0.00%</Text>
        </View>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 12,
  },
  headerRow: {
    marginBottom: 12,
  },
  title: {
    ...Typography.cyberHeader,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  subTitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  filterPills: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 10,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  pillActive: {
    backgroundColor: Colors.cyan,
  },
  pillText: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#05070A',
    fontWeight: '800',
  },
  chartHolder: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
    paddingTop: 10,
    marginTop: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendText: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.textSecondary,
  },
});

export default ActivityChart;
