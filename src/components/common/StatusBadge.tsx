import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import Colors from '../../constants/colors';
import Typography from '../../constants/typography';
import { VpnStatus } from '../../types';

interface StatusBadgeProps {
  status: VpnStatus;
  showText?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, showText = true }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (status === 'protected' || status === 'connecting' || status === 'alert') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.35,
            duration: status === 'alert' ? 400 : 900,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: status === 'alert' ? 400 : 900,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [status]);

  const getConfig = () => {
    switch (status) {
      case 'protected':
        return {
          label: 'PROTÉGÉ',
          color: Colors.cyan,
          bg: 'rgba(0, 229, 255, 0.12)',
          border: 'rgba(0, 229, 255, 0.35)',
        };
      case 'connecting':
        return {
          label: 'SCANNING...',
          color: Colors.amber,
          bg: 'rgba(255, 184, 0, 0.12)',
          border: 'rgba(255, 184, 0, 0.35)',
        };
      case 'alert':
        return {
          label: 'ALERTE SÉCURITÉ',
          color: Colors.red,
          bg: 'rgba(255, 16, 24, 0.15)',
          border: 'rgba(255, 16, 24, 0.45)',
        };
      case 'dormant':
      default:
        return {
          label: 'DÉCONNECTÉ',
          color: Colors.textMuted,
          bg: 'rgba(82, 102, 126, 0.12)',
          border: 'rgba(82, 102, 126, 0.25)',
        };
    }
  };

  const cfg = getConfig();

  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg, borderColor: cfg.border }]}>
      <Animated.View
        style={[
          styles.dot,
          {
            backgroundColor: cfg.color,
            opacity: pulseAnim,
            shadowColor: cfg.color,
          },
        ]}
      />
      {showText && <Text style={[styles.text, { color: cfg.color }]}>{cfg.label}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 3,
  },
  text: {
    ...Typography.cyberBadge,
    fontSize: 10,
  },
});

export default StatusBadge;
