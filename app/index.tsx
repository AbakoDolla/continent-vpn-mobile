import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../src/constants/colors';
import Typography from '../src/constants/typography';
import { useAuth } from '../src/context/AuthContext';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated, hasCompletedOnboarding, isLoading } = useAuth();

  const logoScale = useRef(new Animated.Value(0.85)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Transition based on auth & onboarding status
      if (!hasCompletedOnboarding) {
        router.replace('/onboarding');
      } else if (!isAuthenticated) {
        router.replace('/(auth)/login');
      } else {
        router.replace('/(tabs)');
      }
    });
  }, [hasCompletedOnboarding, isAuthenticated]);

  const progressBarWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0, 229, 255, 0.08)', 'transparent', 'rgba(255, 16, 24, 0.05)']}
        style={StyleSheet.absoluteFillObject}
      />

      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: logoScale }],
            opacity: logoOpacity,
          },
        ]}
      >
        <Image
          source={require('../assets/images/continent-vpn-logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.appName}>CONTINENT VPN</Text>
        <Text style={styles.tagline}>Votre liberté numérique, notre priorité.</Text>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressBar, { width: progressBarWidth }]} />
        </View>
        <Text style={styles.loadingText}>INITIALISATION DU BOUCLIER CYBER...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 140,
    height: 140,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 229, 255, 0.35)',
    marginBottom: 20,
    shadowColor: Colors.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
  },
  appName: {
    ...Typography.displayLarge,
    fontSize: 28,
    color: Colors.textPrimary,
    letterSpacing: 3,
    marginBottom: 6,
  },
  tagline: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    width: width * 0.7,
    alignItems: 'center',
  },
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.cyan,
  },
  loadingText: {
    ...Typography.caption,
    color: Colors.cyan,
    fontSize: 10,
    letterSpacing: 1.5,
  },
});
