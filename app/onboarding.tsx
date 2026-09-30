import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../src/constants/colors';
import Typography from '../src/constants/typography';
import NeonButton from '../src/components/common/NeonButton';
import GlassCard from '../src/components/common/GlassCard';
import { useAuth } from '../src/context/AuthContext';

const { width } = Dimensions.get('window');

const ONBOARDING_SLIDES = [
  {
    id: 1,
    icon: 'shield-checkmark',
    title: 'Souveraineté & Anonymat',
    subtitle: 'POLITIQUE STRICTE ZÉRO-JOURNAL',
    description:
      'Chiffrement quantique de bout en bout. Vos données, votre localisation et votre historique de navigation ne sont jamais enregistrés ni partagés.',
    accentColor: Colors.cyan,
  },
  {
    id: 2,
    icon: 'flash',
    title: 'CONTINENT Core Intelligent',
    subtitle: 'ROUTAGE NEURONAL AUTO-OPTIMISÉ',
    description:
      'Fini les sélections de pays arbitraires. Notre maillage intelligent sélectionne le canal le plus véloce et sécurisé en temps réel avec latence ultra-faible.',
    accentColor: Colors.blue,
  },
  {
    id: 3,
    icon: 'lock-closed',
    title: 'Bouclier Cybernétique',
    subtitle: 'KILL SWITCH & DÉFENSE ACTIVE',
    description:
      'En cas de coupure de signal, le Kill Switch bloque instantanément tout flux non protégé pour empêcher toute fuite DNS ou d’adresse IP.',
    accentColor: Colors.red,
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { completeOnboarding } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = async () => {
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      await completeOnboarding();
      router.replace('/(tabs)');
    }
  };

  const handleSkip = async () => {
    await completeOnboarding();
    router.replace('/(tabs)');
  };

  const currentSlide = ONBOARDING_SLIDES[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Skip */}
      <View style={styles.header}>
        <Text style={styles.stepIndicator}>
          PHASE 0{currentIndex + 1} / 0{ONBOARDING_SLIDES.length}
        </Text>
        <TouchableOpacity onPress={handleSkip} activeOpacity={0.7}>
          <Text style={styles.skipText}>PASSER</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <View style={styles.content}>
        <GlassCard
          style={styles.card}
          variant={currentSlide.accentColor === Colors.red ? 'red' : 'cyan'}
          padding={24}
        >
          {/* Animated Tech Icon */}
          <View style={[styles.iconCircle, { borderColor: currentSlide.accentColor }]}>
            <Ionicons name={currentSlide.icon as any} size={52} color={currentSlide.accentColor} />
          </View>

          <Text style={[styles.subtitle, { color: currentSlide.accentColor }]}>
            {currentSlide.subtitle}
          </Text>
          <Text style={styles.title}>{currentSlide.title}</Text>
          <Text style={styles.description}>{currentSlide.description}</Text>
        </GlassCard>

        {/* Step Indicators */}
        <View style={styles.dotsRow}>
          {ONBOARDING_SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                currentIndex === i && {
                  width: 28,
                  backgroundColor: currentSlide.accentColor,
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Footer Button */}
      <View style={styles.footer}>
        <NeonButton
          title={currentIndex === ONBOARDING_SLIDES.length - 1 ? 'ACTIVER LA PROTECTION' : 'CONTINUER'}
          onPress={handleNext}
          variant={currentSlide.accentColor === Colors.red ? 'red' : 'cyan'}
          size="lg"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  stepIndicator: {
    ...Typography.cyberCode,
    color: Colors.textMuted,
    fontSize: 11,
    letterSpacing: 1.5,
  },
  skipText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '700',
    letterSpacing: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  card: {
    width: '100%',
    alignItems: 'center',
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(5, 7, 10, 0.8)',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    alignSelf: 'center',
    shadowColor: Colors.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  subtitle: {
    ...Typography.caption,
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    ...Typography.displayLarge,
    fontSize: 24,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 14,
  },
  description: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  footer: {
    marginBottom: 20,
  },
});
