import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../src/constants/colors';
import Typography from '../../src/constants/typography';
import Header from '../../src/components/common/Header';
import GlassCard from '../../src/components/common/GlassCard';
import { useVpn } from '../../src/context/VpnContext';
import { RoutingMode, VpnNode } from '../../src/types';

export default function NetworkScreen() {
  const { nodes, currentNode, selectNode } = useVpn();
  const [routingMode, setRoutingMode] = useState<RoutingMode>('intelligent');

  const ROUTING_MODES: { id: RoutingMode; title: string; desc: string; icon: string }[] = [
    {
      id: 'intelligent',
      title: 'Auto-Mesh Intelligent',
      desc: 'Sélection dynamique par IA du meilleur chemin sans perte de paquets.',
      icon: 'git-network-outline',
    },
    {
      id: 'ultra-low-latency',
      title: 'Ultra-Basse Latence',
      desc: 'Optimisé pour le gaming compétitif et les flux audio/vidéo en direct.',
      icon: 'flash-outline',
    },
    {
      id: 'stealth-double-hop',
      title: 'Double-Hop Stealth',
      desc: 'Double couche de chiffrement à travers deux juridictions différentes.',
      icon: 'shield-half-outline',
    },
    {
      id: 'high-throughput',
      title: 'Haut Débit Illimité',
      desc: 'Canaux réservés pour transferts massifs et streaming 4K HDR.',
      icon: 'speedometer-outline',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="RÉSEAU CONTINENT" subtitle="MAILLAGE DE SÉCURITÉ SOUVERAIN" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Architecture Philosophy Info Box */}
        <GlassCard style={styles.philosophyCard} variant="cyan" padding={16}>
          <View style={styles.philosophyHeader}>
            <Ionicons name="hardware-chip-outline" size={22} color={Colors.cyan} />
            <Text style={styles.philosophyTitle}>MODÈLE DE MAILLAGE NEURONAL</Text>
          </View>
          <Text style={styles.philosophyText}>
            CONTINENT VPN n'utilise pas de liste de pays archaïque. Notre maillage intelligent
            agrège les nœuds les plus stables et les plus véloces pour garantir un anonymat parfait sans compromis de vitesse.
          </Text>
        </GlassCard>

        {/* Routing Modes */}
        <Text style={styles.sectionTitle}>MODE DE ROUTAGE STRATÉGIQUE</Text>
        <View style={styles.modesContainer}>
          {ROUTING_MODES.map((mode) => {
            const isSelected = routingMode === mode.id;
            return (
              <TouchableOpacity
                key={mode.id}
                activeOpacity={0.8}
                onPress={() => setRoutingMode(mode.id)}
              >
                <GlassCard
                  style={[styles.modeCard, isSelected && styles.modeCardSelected]}
                  variant={isSelected ? 'cyan' : 'subtle'}
                  padding={14}
                >
                  <View style={styles.modeRow}>
                    <View
                      style={[
                        styles.modeIconBox,
                        isSelected && { backgroundColor: 'rgba(0, 229, 255, 0.2)' },
                      ]}
                    >
                      <Ionicons
                        name={mode.icon as any}
                        size={20}
                        color={isSelected ? Colors.cyan : Colors.textMuted}
                      />
                    </View>
                    <View style={styles.modeInfo}>
                      <Text style={[styles.modeTitle, isSelected && { color: Colors.cyan }]}>
                        {mode.title}
                      </Text>
                      <Text style={styles.modeDesc}>{mode.desc}</Text>
                    </View>
                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={20} color={Colors.cyan} />
                    )}
                  </View>
                </GlassCard>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Available Nodes List */}
        <Text style={styles.sectionTitle}>NŒUDS DU MAILLAGE DISPONIBLES</Text>
        {nodes.map((node: VpnNode) => {
          const isCurrent = currentNode.id === node.id;
          return (
            <TouchableOpacity
              key={node.id}
              activeOpacity={0.8}
              onPress={() => selectNode(node)}
            >
              <GlassCard
                style={[styles.nodeCard, isCurrent && styles.nodeCardActive]}
                variant={isCurrent ? 'cyan' : 'subtle'}
                padding={14}
              >
                <View style={styles.nodeLeft}>
                  <View style={styles.flagHolder}>
                    <Text style={styles.flagEmoji}>{node.flagEmoji}</Text>
                  </View>
                  <View>
                    <View style={styles.nodeNameRow}>
                      <Text style={[styles.nodeName, isCurrent && { color: Colors.cyan }]}>
                        {node.name}
                      </Text>
                      {node.isRecommended && (
                        <View style={styles.recBadge}>
                          <Text style={styles.recText}>OPTIMAL</Text>
                        </View>
                      )}
                      {node.isPremium && (
                        <View style={styles.premBadge}>
                          <Text style={styles.premText}>PREMIUM</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.nodeRegion}>{node.region}</Text>
                  </View>
                </View>

                <View style={styles.nodeRight}>
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricVal, { color: node.ping < 30 ? Colors.emerald : Colors.amber }]}>
                      {node.ping} ms
                    </Text>
                    <Text style={styles.metricSub}>PING</Text>
                  </View>

                  <View style={styles.metricItem}>
                    <Text style={styles.metricVal}>{node.load}%</Text>
                    <Text style={styles.metricSub}>CHARGE</Text>
                  </View>

                  {isCurrent ? (
                    <View style={styles.activeCheck}>
                      <Ionicons name="shield-checkmark" size={18} color={Colors.cyan} />
                    </View>
                  ) : (
                    <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
                  )}
                </View>
              </GlassCard>
            </TouchableOpacity>
          );
        })}
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
  philosophyCard: {
    marginVertical: 12,
  },
  philosophyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  philosophyTitle: {
    ...Typography.cyberHeader,
    fontSize: 12,
    color: Colors.cyan,
  },
  philosophyText: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  sectionTitle: {
    ...Typography.cyberHeader,
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 18,
    marginBottom: 10,
    letterSpacing: 1.2,
  },
  modesContainer: {
    gap: 8,
  },
  modeCard: {
    borderRadius: 14,
  },
  modeCardSelected: {
    borderColor: Colors.cyan,
  },
  modeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modeIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeInfo: {
    flex: 1,
  },
  modeTitle: {
    ...Typography.bodyMedium,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  modeDesc: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  nodeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  nodeCardActive: {
    borderColor: Colors.cyan,
    backgroundColor: 'rgba(0, 229, 255, 0.04)',
  },
  nodeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  flagHolder: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagEmoji: {
    fontSize: 20,
  },
  nodeNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  nodeName: {
    ...Typography.bodyMedium,
    fontWeight: '700',
    color: Colors.textPrimary,
    fontSize: 13,
  },
  recBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
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
  premBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    borderWidth: 1,
    borderColor: Colors.purple,
  },
  premText: {
    ...Typography.caption,
    fontSize: 8,
    color: Colors.purple,
    fontWeight: '800',
  },
  nodeRegion: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  nodeRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricVal: {
    ...Typography.cyberCode,
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  metricSub: {
    ...Typography.caption,
    fontSize: 8,
    color: Colors.textMuted,
  },
  activeCheck: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 229, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
