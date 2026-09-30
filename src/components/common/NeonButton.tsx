import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import Colors from '../../constants/colors';
import Typography from '../../constants/typography';
import Layout from '../../constants/layout';

interface NeonButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'cyan' | 'red' | 'outline' | 'ghost' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const NeonButton: React.FC<NeonButtonProps> = ({
  title,
  onPress,
  variant = 'cyan',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
}) => {
  const handlePress = () => {
    if (disabled || loading) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {
      // ignore on web
    }
    onPress();
  };

  const getGradientColors = (): [string, string] => {
    if (disabled) return ['#1B2636', '#0F1824'];
    switch (variant) {
      case 'red':
        return [Colors.red, '#990005'];
      case 'blue':
        return [Colors.blue, '#0D47A1'];
      case 'outline':
      case 'ghost':
        return ['transparent', 'transparent'];
      case 'cyan':
      default:
        return [Colors.cyan, Colors.blue];
    }
  };

  const getHeight = () => {
    switch (size) {
      case 'sm':
        return 38;
      case 'lg':
        return 56;
      default:
        return 48;
    }
  };

  const getBorderColor = () => {
    if (disabled) return Colors.borderSubtle;
    switch (variant) {
      case 'red':
        return Colors.red;
      case 'blue':
        return Colors.blue;
      case 'outline':
        return Colors.cyan;
      case 'ghost':
        return 'transparent';
      default:
        return Colors.cyan;
    }
  };

  const getTextColor = () => {
    if (disabled) return Colors.textMuted;
    if (variant === 'cyan') return '#05070A'; // High-contrast black text on neon cyan
    if (variant === 'outline') return Colors.cyan;
    if (variant === 'ghost') return Colors.textSecondary;
    return '#FFFFFF';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={handlePress}
      disabled={disabled || loading}
      style={[
        styles.touchable,
        {
          height: getHeight(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'ghost' ? 0 : 1,
        },
        variant === 'cyan' && !disabled && styles.cyanGlow,
        variant === 'red' && !disabled && styles.redGlow,
        style,
      ]}
    >
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, { height: getHeight() }]}
      >
        {loading ? (
          <ActivityIndicator color={getTextColor()} size="small" />
        ) : (
          <View style={styles.contentRow}>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <Text
              style={[
                styles.buttonText,
                size === 'sm' && styles.textSm,
                size === 'lg' && styles.textLg,
                { color: getTextColor() },
                textStyle,
              ]}
            >
              {title}
            </Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: Layout.radius.md,
    overflow: 'hidden',
  },
  cyanGlow: {
    shadowColor: Colors.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 6,
  },
  redGlow: {
    shadowColor: Colors.red,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 6,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: Layout.radius.md,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  buttonText: {
    ...Typography.cyberCode,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  textSm: {
    fontSize: 12,
  },
  textLg: {
    fontSize: 15,
    letterSpacing: 1.8,
  },
});

export default NeonButton;
