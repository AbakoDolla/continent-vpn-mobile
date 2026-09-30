import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/colors';
import Layout from '../../constants/layout';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'cyan' | 'blue' | 'red' | 'subtle' | 'elevated';
  padding?: number;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  variant = 'subtle',
  padding = Layout.cardPadding,
  glow = false,
}) => {
  const getBorderColor = () => {
    switch (variant) {
      case 'cyan':
        return Colors.borderActive;
      case 'blue':
        return Colors.borderCard;
      case 'red':
        return Colors.borderAlert;
      case 'elevated':
        return 'rgba(0, 229, 255, 0.25)';
      default:
        return Colors.borderSubtle;
    }
  };

  const getGlowShadow = (): ViewStyle => {
    if (!glow) return {};
    switch (variant) {
      case 'cyan':
        return {
          shadowColor: Colors.cyan,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.35,
          shadowRadius: 12,
          elevation: 6,
        };
      case 'red':
        return {
          shadowColor: Colors.red,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.45,
          shadowRadius: 14,
          elevation: 7,
        };
      default:
        return {
          shadowColor: Colors.blue,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 4,
        };
    }
  };

  return (
    <View style={[styles.outerContainer, { borderColor: getBorderColor() }, getGlowShadow(), style]}>
      <LinearGradient
        colors={
          variant === 'red'
            ? ['rgba(255, 16, 24, 0.08)', 'rgba(10, 19, 34, 0.85)']
            : variant === 'cyan'
            ? ['rgba(0, 229, 255, 0.07)', 'rgba(7, 21, 37, 0.85)']
            : ['rgba(15, 30, 54, 0.65)', 'rgba(7, 21, 37, 0.85)']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, { padding }]}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: Colors.backgroundCard,
  },
  gradient: {
    borderRadius: Layout.radius.lg,
  },
});

export default GlassCard;
