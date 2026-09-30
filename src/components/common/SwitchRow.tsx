import React from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import Typography from '../../constants/typography';
import Layout from '../../constants/layout';

interface SwitchRowProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
  badge?: string;
  disabled?: boolean;
}

export const SwitchRow: React.FC<SwitchRowProps> = ({
  icon,
  title,
  description,
  value,
  onValueChange,
  badge,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      style={[styles.container, disabled && styles.disabled]}
    >
      <View style={styles.iconContainer}>{icon}</View>

      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{
          false: 'rgba(82, 102, 126, 0.3)',
          true: Colors.cyan,
        }}
        thumbColor={value ? '#FFFFFF' : Colors.textMuted}
        ios_backgroundColor="rgba(82, 102, 126, 0.3)"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  disabled: {
    opacity: 0.45,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: Layout.radius.md,
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  badge: {
    marginLeft: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 229, 255, 0.15)',
    borderWidth: 1,
    borderColor: Colors.cyan,
  },
  badgeText: {
    ...Typography.caption,
    color: Colors.cyan,
    fontSize: 9,
    fontWeight: '800',
  },
  description: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 3,
  },
});

export default SwitchRow;
