import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Colors from '../../constants/colors';
import Typography from '../../constants/typography';
import { VpnStatus, VpnProtocol } from '../../types';

interface ConnectionCoreProps {
  status: VpnStatus;
  protocol: VpnProtocol;
  ping: number;
  onToggle: () => void;
}

export const ConnectionCore: React.FC<ConnectionCoreProps> = ({
  status,
  protocol,
  ping,
  onToggle,
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const ringScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Rotation animation
    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: status === 'connecting' ? 2500 : status === 'protected' ? 6000 : 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotate.start();
    return () => rotate.stop();
  }, [status]);

  useEffect(() => {
    // Core pulsing animation
    if (status === 'protected' || status === 'connecting' || status === 'alert') {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: status === 'alert' ? 400 : 900,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.95,
            duration: status === 'alert' ? 400 : 900,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [status]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getCoreColor = () => {
    switch (status) {
      case 'protected':
        return Colors.cyan;
      case 'connecting':
        return Colors.amber;
      case 'alert':
        return Colors.red;
      case 'dormant':
      default:
        return Colors.textMuted;
    }
  };

  const getButtonText = () => {
    switch (status) {
      case 'protected':
        return 'DÉCONNECTER LE TUNNEL';
      case 'connecting':
        return 'SÉCURISATION EN COURS...';
      case 'alert':
        return 'RÉTABLIR LE BOUCLIER';
      case 'dormant':
      default:
        return 'ENGAGER LE BOUCLIER';
    }
  };

  const handlePress = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch {
      // web ignore
    }
    onToggle();
  };

  const coreColor = getCoreColor();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handlePress}
        style={styles.touchArea}
      >
        {/* Outer Pulsing Wave Ring */}
        <Animated.View
          style={[
            styles.waveRing,
            {
              borderColor: `${coreColor}33`,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        />

        {/* Outer Rotating Segmented Tech Ring */}
        <Animated.View
          style={[
            styles.segmentedRing,
            {
              borderColor: `${coreColor}66`,
              transform: [{ rotate: spin }],
            },
          ]}
        >
          <View style={[styles.techNotch, { backgroundColor: coreColor }]} />
          <View style={[styles.techNotch2, { backgroundColor: coreColor }]} />
          <View style={[styles.techNotch3, { backgroundColor: coreColor }]} />
          <View style={[styles.techNotch4, { backgroundColor: coreColor }]} />
        </Animated.View>

        {/* Central Core Power Node */}
        <Animated.View
          style={[
            styles.coreNode,
            {
              borderColor: coreColor,
              shadowColor: coreColor,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <Ionicons
            name={status === 'protected' ? 'power' : status === 'alert' ? 'warning' : 'power-outline'}
            size={42}
            color={coreColor}
          />
        </Animated.View>
      </TouchableOpacity>

      {/* Action Button Label */}
      <TouchableOpacity activeOpacity={0.8} onPress={handlePress} style={styles.labelWrapper}>
        <Text style={[styles.labelText, { color: coreColor }]}>{getButtonText()}</Text>
      </TouchableOpacity>

      {/* Protocol & Ping Technical Telemetry Bar */}
      <View style={styles.telemetryBar}>
        <View style={styles.telemetryItem}>
          <Text style={styles.telemetryKey}>PROTOCOLE</Text>
          <Text style={styles.telemetryVal}>{protocol}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.telemetryItem}>
          <Text style={styles.telemetryKey}>CHIFFREMENT</Text>
          <Text style={styles.telemetryVal}>AES-256-GCM</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.telemetryItem}>
          <Text style={styles.telemetryKey}>LATENCE</Text>
          <Text style={[styles.telemetryVal, { color: ping < 30 ? Colors.emerald : Colors.amber }]}>
            {ping} ms
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 18,
  },
  touchArea: {
    width: 170,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  waveRing: {
    position: 'absolute',
    width: 168,
    height: 168,
    borderRadius: 84,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  segmentedRing: {
    position: 'absolute',
    width: 144,
    height: 144,
    borderRadius: 72,
    borderWidth: 2,
    borderStyle: 'dotted',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  techNotch: {
    width: 10,
    height: 3,
    borderRadius: 1.5,
  },
  techNotch2: {
    width: 10,
    height: 3,
    borderRadius: 1.5,
  },
  techNotch3: {
    position: 'absolute',
    left: 0,
    top: 70,
    width: 3,
    height: 10,
    borderRadius: 1.5,
  },
  techNotch4: {
    position: 'absolute',
    right: 0,
    top: 70,
    width: 3,
    height: 10,
    borderRadius: 1.5,
  },
  coreNode: {
    width: 106,
    height: 106,
    borderRadius: 53,
    backgroundColor: '#071525',
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.85,
    shadowRadius: 18,
    elevation: 8,
  },
  labelWrapper: {
    marginTop: 14,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  labelText: {
    ...Typography.cyberCode,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  telemetryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(10, 19, 34, 0.75)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  telemetryItem: {
    alignItems: 'center',
  },
  telemetryKey: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 9,
    letterSpacing: 1,
    marginBottom: 2,
  },
  telemetryVal: {
    ...Typography.cyberCode,
    color: Colors.textPrimary,
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.borderSubtle,
  },
});

export default ConnectionCore;
