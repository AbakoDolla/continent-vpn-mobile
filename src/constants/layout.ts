// CONTINENT VPN - Layout, Spacing & Sizing Constants
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  
  // Spacing system
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  // Border radiuses
  radius: {
    sm: 8,
    md: 14,
    lg: 20,
    xl: 28,
    round: 9999,
  },

  // Elevation and Glass depths
  cardPadding: 18,
  screenPaddingHorizontal: 20,
};

export default Layout;
