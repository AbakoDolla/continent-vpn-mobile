import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../src/constants/colors';
import Typography from '../../src/constants/typography';
import Layout from '../../src/constants/layout';
import NeonButton from '../../src/components/common/NeonButton';
import GlassCard from '../../src/components/common/GlassCard';
import { useAuth } from '../../src/context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('operator@continentvpn.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      router.push('/(auth)/otp');
    } else {
      setErrorMessage(res.error || 'Identifiants invalides');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Logo & Brand Header */}
          <View style={styles.brandContainer}>
            <Image
              source={require('../../assets/images/continent-vpn-logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.brandTitle}>CONTINENT VPN</Text>
            <Text style={styles.brandTagline}>AUTHENTIFICATION CYBER-OPÉRATEUR</Text>
          </View>

          {/* Form Card */}
          <GlassCard style={styles.formCard} variant="cyan" padding={20}>
            <Text style={styles.formTitle}>Connexion Sécurisée</Text>
            <Text style={styles.formSubtitle}>Accédez à votre maillage neuronal CONTINENT Core</Text>

            {errorMessage ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={16} color={Colors.red} />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {/* Email Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>EMAIL OU IDENTIFIANT OPÉRATEUR</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color={Colors.cyan} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="nom@exemple.com"
                  placeholderTextColor={Colors.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Password Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>MOT DE PASSE CRYPTOGRAPHIQUE</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={Colors.cyan} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Mot de passe"
                  placeholderTextColor={Colors.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={Colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember Me & Forgot Password */}
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.rememberRow}
                onPress={() => setRememberMe(!rememberMe)}
                activeOpacity={0.8}
              >
                <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                  {rememberMe && <Ionicons name="checkmark" size={14} color="#05070A" />}
                </View>
                <Text style={styles.rememberText}>Se souvenir de cet appareil</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/(auth)/forgot-password')}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotText}>Oublié ?</Text>
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <NeonButton
              title="ENGAGER LA CONNEXION"
              onPress={handleLogin}
              loading={loading}
              variant="cyan"
              size="lg"
              style={{ marginTop: 12 }}
            />
          </GlassCard>

          {/* Privacy Notice (Strict no third party tracking) */}
          <View style={styles.privacyNote}>
            <Ionicons name="shield-checkmark-outline" size={16} color={Colors.emerald} />
            <Text style={styles.privacyText}>
              Zéro pistage tiers. Aucune connexion sociale requise. Vos clés restent chiffrées localement.
            </Text>
          </View>

          {/* Register Link */}
          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Nouvel opérateur ? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')} activeOpacity={0.7}>
              <Text style={styles.registerLink}>Créer un profil Guardian</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'center',
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoImage: {
    width: 72,
    height: 72,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.4)',
    marginBottom: 10,
  },
  brandTitle: {
    ...Typography.displayMedium,
    color: Colors.textPrimary,
    letterSpacing: 2,
  },
  brandTagline: {
    ...Typography.caption,
    color: Colors.cyan,
    fontSize: 10,
    letterSpacing: 1.5,
    marginTop: 4,
  },
  formCard: {
    width: '100%',
  },
  formTitle: {
    ...Typography.displayMedium,
    fontSize: 20,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  formSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 18,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 16, 24, 0.12)',
    borderWidth: 1,
    borderColor: Colors.red,
    padding: 10,
    borderRadius: 8,
    marginBottom: 14,
    gap: 8,
  },
  errorText: {
    ...Typography.caption,
    color: Colors.red,
    flex: 1,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 7, 10, 0.8)',
    borderRadius: Layout.radius.md,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: Colors.textPrimary,
    ...Typography.bodyMedium,
  },
  eyeIcon: {
    padding: 6,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxActive: {
    backgroundColor: Colors.cyan,
    borderColor: Colors.cyan,
  },
  rememberText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  forgotText: {
    ...Typography.caption,
    color: Colors.cyan,
    fontWeight: '700',
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 136, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.2)',
    borderRadius: 10,
    padding: 12,
    marginVertical: 20,
    gap: 10,
  },
  privacyText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 16,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  registerText: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
  },
  registerLink: {
    ...Typography.bodyMedium,
    color: Colors.cyan,
    fontWeight: '700',
  },
});
