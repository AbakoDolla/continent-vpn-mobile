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
import Colors from '../src/constants/colors';
import Typography from '../src/constants/typography';
import Header from '../src/components/common/Header';
import GlassCard from '../src/components/common/GlassCard';
import { MOCK_NOTIFICATIONS } from '../src/services/mockData';
import { ThreatNotification } from '../src/types';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<ThreatNotification[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'threat' | 'connection' | 'account' | 'system'>('all');

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'all') return true;
    return n.category === filter;
  });

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getCategoryIcon = (category: ThreatNotification['category']) => {
    switch (category) {
      case 'threat':
        return { icon: 'warning', color: Colors.red };
      case 'connection':
        return { icon: 'shield-checkmark', color: Colors.cyan };
      case 'account':
        return { icon: 'person-circle', color: Colors.purple };
      case 'system':
      default:
        return { icon: 'hardware-chip', color: Colors.blue };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="CENTRE DE NOTIFICATIONS"
        subtitle="JOURNAL DE SÉCURITÉ ET ALERTES"
        showBack
        rightAction={
          <TouchableOpacity onPress={markAllAsRead} activeOpacity={0.7} style={styles.markReadBtn}>
            <Ionicons name="checkmark-done" size={20} color={Colors.cyan} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Category Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterBar}
        >
          {[
            { id: 'all', label: 'Toutes' },
            { id: 'threat', label: 'Menaces' },
            { id: 'connection', label: 'Connexions' },
            { id: 'account', label: 'Compte' },
            { id: 'system', label: 'Système' },
          ].map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setFilter(cat.id as any)}
              style={[styles.filterChip, filter === cat.id && styles.filterChipActive]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === cat.id && styles.filterTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Notifications List */}
        {filteredNotifs.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={48} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>Aucune notification</Text>
            <Text style={styles.emptySub}>Votre journal d'alertes est immaculé.</Text>
          </View>
        ) : (
          filteredNotifs.map((item) => {
            const { icon, color } = getCategoryIcon(item.category);
            return (
              <GlassCard
                key={item.id}
                style={[styles.card, !item.read && styles.unreadCard]}
                variant={item.category === 'threat' ? 'red' : 'subtle'}
                padding={16}
              >
                <View style={styles.cardRow}>
                  <View style={[styles.iconBox, { backgroundColor: `${color}18`, borderColor: color }]}>
                    <Ionicons name={icon as any} size={22} color={color} />
                  </View>

                  <View style={styles.infoBox}>
                    <View style={styles.headerRow}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      {!item.read && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={styles.itemMessage}>{item.message}</Text>
                    <Text style={styles.itemTime}>{item.timestamp}</Text>
                  </View>
                </View>
              </GlassCard>
            );
          })
        )}
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
  markReadBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBar: {
    gap: 8,
    marginVertical: 14,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterChipActive: {
    backgroundColor: Colors.cyan,
    borderColor: Colors.cyan,
  },
  filterText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '700',
  },
  filterTextActive: {
    color: '#05070A',
    fontWeight: '800',
  },
  card: {
    marginBottom: 10,
  },
  unreadCard: {
    borderColor: 'rgba(0, 229, 255, 0.4)',
    backgroundColor: 'rgba(0, 229, 255, 0.04)',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  infoBox: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemTitle: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.cyan,
    shadowColor: Colors.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  itemMessage: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  itemTime: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 10,
    marginTop: 6,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    ...Typography.displayMedium,
    color: Colors.textPrimary,
    fontSize: 18,
    marginTop: 14,
  },
  emptySub: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
