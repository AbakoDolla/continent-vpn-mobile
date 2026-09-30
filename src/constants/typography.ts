// CONTINENT VPN - Typography Tokens
import { TextStyle } from 'react-native';

export const Typography = {
  // Display & Headers
  displayHuge: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 1.5,
  } as TextStyle,
  displayLarge: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 1.2,
  } as TextStyle,
  displayMedium: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.8,
  } as TextStyle,
  
  // Cyberpunk Monospace & Telemetry
  cyberHeader: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  } as TextStyle,
  cyberCode: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
  } as TextStyle,
  cyberBadge: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  } as TextStyle,

  // Body & Content
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
  } as TextStyle,
  bodyMedium: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  } as TextStyle,
  bodySmall: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  } as TextStyle,

  // Micro Labels
  caption: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.5,
  } as TextStyle,
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  } as TextStyle,
};

export default Typography;
