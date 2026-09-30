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
import Colors from '../../src/constants/colors';
import Typography from '../../src/constants/typography';
import Header from '../../src/components/common/Header';
import GlassCard from '../../src/components/common/GlassCard';
import NeonButton from '../../src/components/common/NeonButton';
import { MOCK_PLANS } from '../../src/services/mockData';
import { SubscriptionPlan } from '../../src/types';

export default function PlansScreen() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('annual');

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    Alert.alert(
      'Engagement Forfait',
      `Activer le forfait ${plan.title} en facturation ${
        billingCycle === 'annual' ? 'annuelle (-20% remise)' : billingCycle === 'quarterly' ? 'trimestrielle' : 'mensuelle'
      } ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Confirmer',
          onPress: () => {
            Alert.alert('Succès', `Le forfait ${plan.title} a été configuré pour votre profil Guardian.`);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="FORFAITS SOUVERAINS" subtitle="PROTECTION CYBER ILLIMITÉE" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Intro Tagline */}
        <View style={styles.introBox}>
          <Text style={styles.introTitle}>Choisissez Votre Niveau de Bouclier</Text>
          <Text style={styles.introSub}>
            Toutes les formules incluent la politique stricte zéro-journal, le chiffrement quantique et le Kill Switch instantané.
          </Text>
        </View>

        {/* Billing Cycle Switcher */}
        <View style={styles.billingToggle}>
          <TouchableOpacity
            style={[styles.toggleBtn, billingCycle === 'monthly' && styles.toggleBtnActive]}
            onPress={() => setBillingCycle('monthly')}
          >
            <Text style={[styles.toggleText, billingCycle === 'monthly' && styles.toggleTextActive]}>
              Mensuel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleBtn, billingCycle === 'quarterly' && styles.toggleBtnActive]}
            onPress={() => setBillingCycle('quarterly')}
          >
            <Text style={[styles.toggleText, billingCycle === 'quarterly' && styles.toggleTextActive]}>
              Trimestriel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleBtn, billingCycle === 'annual' && styles.toggleBtnActive]}
            onPress={() => setBillingCycle('annual')}
          >
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-20%</Text>
            </View>
            <Text style={[styles.toggleText, billingCycle === 'annual' && styles.toggleTextActive]}>
              Annuel
            </Text>
          </TouchableOpacity>
        </View>

        {/* Plan Cards */}
        {MOCK_PLANS.map((plan) => {
          const price =
            billingCycle === 'annual'
              ? (plan.annualPrice / 12).toFixed(2)
              : billingCycle === 'quarterly'
              ? (plan.quarterlyPrice / 3).toFixed(2)
              : plan.monthlyPrice.toFixed(2);

          const isPopular = plan.isPopular;

          return (
            <GlassCard
              key={plan.id}
              style={[styles.planCard, isPopular && styles.popularCard]}
              variant={isPopular ? 'cyan' : 'subtle'}
              padding={20}
              glow={isPopular}
            >
              {plan.badge && (
                <View style={[styles.badge, isPopular && styles.popularBadge]}>
                  <Text style={[styles.badgeText, isPopular && { color: '#05070A' }]}>
                    {plan.badge}
                  </Text>
                </View>
              )}

              <Text style={styles.planTitle}>{plan.title}</Text>

              {/* Price Row */}
              <View style={styles.priceRow}>
                <Text style={styles.currency}>€</Text>
                <Text style={styles.priceNumber}>{price}</Text>
                <Text style={styles.period}>/ mois</Text>
              </View>

              <Text style={styles.devicesLabel}>
                Jusqu'à <Text style={{ color: Colors.cyan, fontWeight: '800' }}>{plan.maxDevices}</Text> appareils simultanés
              </Text>

              {/* Features List */}
              <View style={styles.featuresList}>
                {plan.features.map((feat, idx) => (
                  <View key={idx} style={styles.featureItem}>
                    <Ionicons name="checkmark-circle" size={18} color={isPopular ? Colors.cyan : Colors.emerald} />
                    <Text style={styles.featureText}>{feat}</Text>
                  </View>
                ))}
              </View>

              <NeonButton
                title={isPopular ? 'ACTIVER LA PROTECTION GUARDIAN' : 'SÉLECTIONNER LE FORFAIT'}
                onPress={() => handleSelectPlan(plan)}
                variant={isPopular ? 'cyan' : 'outline'}
                size="md"
                style={{ marginTop: 14 }}
              />
            </GlassCard>
          );
        })}

        {/* Guarantee Banner */}
        <View style={styles.guaranteeBox}>
          <Ionicons name="shield-checkmark" size={28} color={Colors.emerald} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.guaranteeTitle}>Garantie Satisfait ou Remboursé</Text>
            <Text style={styles.guaranteeText}>
              Testez CONTINENT VPN pendant 30 jours sans aucun risque. Résiliation en 1 clic sans condition.
            </Text>
          </View>
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
  introBox: {
    alignItems: 'center',
    marginVertical: 14,
  },
  introTitle: {
    ...Typography.displayLarge,
    fontSize: 20,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
  },
  introSub: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontSize: 13,
  },
  billingToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(10, 19, 34, 0.85)',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    marginVertical: 16,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'relative',
  },
  toggleBtnActive: {
    backgroundColor: Colors.cyan,
  },
  toggleText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '700',
  },
  toggleTextActive: {
    color: '#05070A',
    fontWeight: '800',
  },
  discountBadge: {
    position: 'absolute',
    top: -8,
    right: 4,
    backgroundColor: Colors.red,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 6,
  },
  discountText: {
    ...Typography.caption,
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
  },
  planCard: {
    marginBottom: 16,
    position: 'relative',
  },
  popularCard: {
    borderColor: Colors.cyan,
  },
  badge: {
    position: 'absolute',
    top: 14,
    right: 14,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  popularBadge: {
    backgroundColor: Colors.cyan,
  },
  badgeText: {
    ...Typography.caption,
    fontSize: 9,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 1,
  },
  planTitle: {
    ...Typography.displayMedium,
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  currency: {
    ...Typography.displayMedium,
    color: Colors.cyan,
    fontSize: 20,
    marginRight: 2,
  },
  priceNumber: {
    ...Typography.displayHuge,
    fontSize: 34,
    color: Colors.textPrimary,
    fontWeight: '800',
  },
  period: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  devicesLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 14,
  },
  featuresList: {
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
    paddingTop: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    fontSize: 13,
  },
  guaranteeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 136, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.25)',
    borderRadius: 14,
    padding: 16,
    marginTop: 6,
  },
  guaranteeTitle: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  guaranteeText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
});
