import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import Typography from '../../constants/typography';
import { VpnStatus } from '../../types';

interface GuardianHeroProps {
  status: VpnStatus;
  onStateSelect?: (state: VpnStatus) => void;
  showStateControls?: boolean;
}

export const GuardianHero: React.FC<GuardianHeroProps> = ({
  status,
  onStateSelect,
  showStateControls = true,
}) => {
  // Animation controllers
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scanRingScale = useRef(new Animated.Value(1)).current;
  const auraOpacity = useRef(new Animated.Value(0.7)).current;

  // Rotation loop for cyber radar rings
  useEffect(() => {
    const rotateLoop = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: status === 'connecting' ? 3000 : status === 'alert' ? 4000 : 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotateLoop.start();
    return () => rotateLoop.stop();
  }, [status]);

  // Breathing / pulse loop
  useEffect(() => {
    let duration = 2000;
    let minScale = 0.94;
    let maxScale = 1.06;

    if (status === 'connecting') {
      duration = 600;
      minScale = 0.92;
      maxScale = 1.1;
    } else if (status === 'alert') {
      duration = 450;
      minScale = 0.9;
      maxScale = 1.12;
    } else if (status === 'dormant') {
      duration = 3200;
      minScale = 0.97;
      maxScale = 1.02;
    }

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: maxScale,
          duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: minScale,
          duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoop.start();

    // Secondary aura pulse
    const auraLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(auraOpacity, {
          toValue: 0.95,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(auraOpacity, {
          toValue: 0.35,
          duration,
          useNativeDriver: true,
        }),
      ])
    );
    auraLoop.start();

    return () => {
      pulseLoop.stop();
      auraLoop.stop();
    };
  }, [status]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const reverseSpin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  const getGuardianTheme = () => {
    switch (status) {
      case 'protected':
        return {
          primaryColor: Colors.cyan,
          secondaryColor: Colors.blue,
          glowColor: Colors.cyanGlow,
          badgeLabel: 'BOUCLIER QUANTIQUE ENGAGÉ',
          statusSub: 'TOUT TRAFIC EST 100% CHIFFRÉ & ANONYMISÉ',
          stateName: 'Protégé',
          iconName: 'shield-checkmark',
        };
      case 'connecting':
        return {
          primaryColor: Colors.amber,
          secondaryColor: Colors.cyan,
          glowColor: Colors.amberGlow,
          badgeLabel: 'SYNCHRONISATION DU MAILLAGE...',
          statusSub: 'ÉTABLISSEMENT DU TUNNEL WIREGUARD-X',
          stateName: 'Connexion',
          iconName: 'sync-outline',
        };
      case 'alert':
        return {
          primaryColor: Colors.red,
          secondaryColor: '#FF5252',
          glowColor: Colors.redGlow,
          badgeLabel: 'MENACE DÉTECTÉE • KILL SWITCH ACTIF',
          statusSub: 'FLUX NON SÉCURISÉ INTERCEPTÉ ET BLOQUÉ',
          stateName: 'Alerte',
          iconName: 'warning',
        };
      case 'dormant':
      default:
        return {
          primaryColor: Colors.textMuted,
          secondaryColor: '#1A293D',
          glowColor: 'rgba(82, 102, 126, 0.2)',
          badgeLabel: 'GARDIEN EN SOMMEIL TACTIQUE',
          statusSub: 'CONNEXION DIRECTE NON PROTÉGÉE',
          stateName: 'Veille',
          iconName: 'shield-outline',
        };
    }
  };

  const theme = getGuardianTheme();

  return (
    <View style={styles.container}>
      {/* Outer Hologram Container */}
      <View style={styles.hologramViewport}>
        {/* State Glow Aura */}
        <Animated.View
          style={[
            styles.auraGlow,
            {
              backgroundColor: theme.primaryColor,
              opacity: auraOpacity,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        />

        {/* Outer Tech Ring (Rotating) */}
        <Animated.View
          style={[
            styles.ringOuter,
            {
              borderColor: theme.primaryColor,
              transform: [{ rotate: spin }],
            },
          ]}
        >
          <View style={[styles.ringSegment, { backgroundColor: theme.primaryColor }]} />
          <View style={[styles.ringSegment2, { backgroundColor: theme.primaryColor }]} />
        </Animated.View>

        {/* Inner Counter-Rotating Orbit Ring */}
        <Animated.View
          style={[
            styles.ringInner,
            {
              borderColor: theme.secondaryColor,
              transform: [{ rotate: reverseSpin }],
            },
          ]}
        >
          <View style={[styles.ringDot, { backgroundColor: theme.primaryColor }]} />
        </Animated.View>

        {/* Central Guardian Avatar Core */}
        <Animated.View
          style={[
            styles.avatarHolder,
            {
              borderColor: theme.primaryColor,
              transform: [{ scale: pulseAnim }],
              shadowColor: theme.primaryColor,
            },
          ]}
        >
          <Image
            source={require('../../../assets/images/continent-vpn-logo.png')}
            style={styles.guardianImage}
            resizeMode="cover"
          />

          {/* Hologram Scan Lines Overlay */}
          <LinearGradient
            colors={['transparent', 'rgba(0, 229, 255, 0.15)', 'transparent']}
            style={styles.scanLineOverlay}
            pointerEvents="none"
          />
        </Animated.View>

        {/* State Icon Indicator Badge */}
        <View style={[styles.statusIconBadge, { backgroundColor: theme.primaryColor }]}>
          <Ionicons
            name={theme.iconName as any}
            size={14}
            color={status === 'protected' || status === 'connecting' ? '#05070A' : '#FFFFFF'}
          />
        </View>
      </View>

      {/* Cyber Status Details */}
      <View style={styles.statusTextContainer}>
        <View
          style={[
            styles.statusPill,
            {
              backgroundColor: `${theme.primaryColor}18`,
              borderColor: `${theme.primaryColor}55`,
            },
          ]}
        >
          <Text style={[styles.statusPillText, { color: theme.primaryColor }]}>
            {theme.badgeLabel}
          </Text>
        </View>
        <Text style={styles.statusSubText}>{theme.statusSub}</Text>
      </View>

      {/* Interactive 4-State Engine Selector */}
      {showStateControls && onStateSelect && (
        <View style={styles.stateSelectorRow}>
          {(['dormant', 'connecting', 'protected', 'alert'] as VpnStatus[]).map((st) => {
            const isCurrent = status === st;
            const labelMap: Record<VpnStatus, string> = {
              dormant: 'Veille',
              connecting: 'Scan',
              protected: 'Protégé',
              alert: 'Alerte',
            };
            return (
              <TouchableOpacity
                key={st}
                activeOpacity={0.7}
                onPress={() => onStateSelect(st)}
                style={[
                  styles.stateChip,
                  isCurrent && {
                    backgroundColor:
                      st === 'alert'
                        ? Colors.red
                        : st === 'protected'
                        ? Colors.cyan
                        : st === 'connecting'
                        ? Colors.amber
                        : Colors.textMuted,
                    borderColor: '#FFFFFF',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.stateChipText,
                    isCurrent && {
                      color: '#05070A',
                      fontWeight: '800',
                    },
                  ]}
                >
                  {labelMap[st]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
  },
  hologramViewport: {
    width: 190,
    height: 190,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  auraGlow: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    filter: 'blur(20px)',
  },
  ringOuter: {
    position: 'absolute',
    width: 184,
    height: 184,
    borderRadius: 92,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ringSegment: {
    width: 16,
    height: 4,
    borderRadius: 2,
  },
  ringSegment2: {
    width: 16,
    height: 4,
    borderRadius: 2,
  },
  ringInner: {
    position: 'absolute',
    width: 156,
    height: 156,
    borderRadius: 78,
    borderWidth: 1,
    borderStyle: 'dotted',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ringDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: -3,
  },
  avatarHolder: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 2,
    overflow: 'hidden',
    backgroundColor: '#071525',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 18,
    elevation: 8,
  },
  guardianImage: {
    width: '100%',
    height: '100%',
  },
  scanLineOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  statusIconBadge: {
    position: 'absolute',
    bottom: 24,
    right: 28,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#05070A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  statusTextContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  statusPill: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 4,
  },
  statusPillText: {
    ...Typography.cyberBadge,
    fontSize: 11,
    letterSpacing: 1.2,
  },
  statusSubText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  stateSelectorRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  stateChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  stateChipText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 10,
  },
});

export default GuardianHero;
