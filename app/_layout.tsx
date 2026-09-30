import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import Colors from '../src/constants/colors';
import { AuthProvider } from '../src/context/AuthContext';
import { VpnProvider } from '../src/context/VpnContext';
import { SettingsProvider } from '../src/context/SettingsContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <VpnProvider>
          <SettingsProvider>
            <View style={styles.container}>
              <StatusBar style="light" backgroundColor={Colors.background} />
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: Colors.background },
                  animation: 'fade',
                }}
              >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="devices" options={{ presentation: 'card' }} />
                <Stack.Screen name="settings" options={{ presentation: 'card' }} />
                <Stack.Screen name="notifications" options={{ presentation: 'card' }} />
                <Stack.Screen name="support" options={{ presentation: 'card' }} />
              </Stack>
            </View>
          </SettingsProvider>
        </VpnProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
