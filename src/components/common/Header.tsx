import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import Typography from '../../constants/typography';
import StatusBadge from './StatusBadge';
import { useVpn } from '../../context/VpnContext';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showStatus?: boolean;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'CONTINENT VPN',
  subtitle,
  showStatus = true,
  showBack = false,
  rightAction,
}) => {
  const router = useRouter();
  const { status } = useVpn();

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.cyan} />
          </TouchableOpacity>
        ) : (
          <Image
            source={require('../../../assets/images/continent-vpn-logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        )}

        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>{title}</Text>
          {subtitle ? (
            <Text style={styles.subtitleText}>{subtitle}</Text>
          ) : (
            <Text style={styles.brandingText}>NEURAL MESH • CYBER DEFENSE</Text>
          )}
        </View>
      </View>

      <View style={styles.rightContainer}>
        {showStatus && <StatusBadge status={status} />}
        {rightAction || (
          <TouchableOpacity
            style={styles.notifButton}
            onPress={() => router.push('/notifications')}
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={20} color={Colors.cyan} />
            <View style={styles.badgeIndicator} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
    backgroundColor: 'rgba(5, 7, 10, 0.95)',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.3)',
    marginRight: 10,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  titleWrapper: {
    justifyContent: 'center',
  },
  titleText: {
    ...Typography.cyberHeader,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  brandingText: {
    ...Typography.caption,
    color: Colors.cyan,
    fontSize: 9,
    letterSpacing: 1.2,
    marginTop: 2,
  },
  subtitleText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  notifButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 229, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgeIndicator: {
    position: 'absolute',
    top: 6,
    right: 7,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.red,
    shadowColor: Colors.red,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default Header;
