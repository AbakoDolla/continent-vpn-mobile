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

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();

  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    setErrorMessage('');
    if (!acceptTerms) {
      setErrorMessage('Veuillez accepter le pacte de confidentialité zéro-journal.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    const res = await register(alias, email, password);
    setLoading(false);

    if (res.success) {
      router.push('/(auth)/otp');
    } else {
      setErrorMessage(res.error || 'Erreur lors de la création du compte.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color={Colors.cyan} />
          </TouchableOpacity>

          <Text style={styles.pageTitle}>Créer une Identité Guardian</Text>
          <Text style={styles.pageSubtitle}>
            Rejoignez le réseau souverain CONTINENT VPN avec chiffrement de niveau militaire.
          </Text>

          <GlassCard style={styles.formCard} variant="cyan" padding={20}>
            {errorMessage ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={16} color={Colors.red} />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {/* Operator Alias */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>ALIAS CYBER-OPÉRATEUR</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="terminal-outline" size={20} color={Colors.cyan} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="EX: CYBER_WARRIOR_01"
                  placeholderTextColor={Colors.textMuted}
                  value={alias}
                  onChangeText={setAlias}
                  autoCapitalize="characters"
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>ADRESSE EMAIL SÉCURISÉE</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color={Colors.cyan} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="operateur@continentvpn.com"
                  placeholderTextColor={Colors.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>MOT DE PASSE MAÎTRE</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="shield-outline" size={20} color={Colors.cyan} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Minimum 8 caractères"
                  placeholderTextColor={Colors.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>CONFIRMER LE MOT DE PASSE</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={Colors.cyan} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Répétez le mot de passe"
                  placeholderTextColor={Colors.textMuted}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Terms checkbox */}
            <TouchableOpacity
              style={styles.termsRow}
              onPress={() => setAcceptTerms(!acceptTerms)}
              activeOpacity={0.8}
            >
              <View style={[styles.checkbox, acceptTerms && styles.checkboxActive]}>
                {acceptTerms && <Ionicons name="checkmark" size={14} color="#05070A" />}
              </View>
              <Text style={styles.termsText}>
                J'accepte la politique de confidentialité stricte zéro-journal et les conditions de service de CONTINENT VPN.
              </Text>
            </TouchableOpacity>

            <NeonButton
              title="FORGER MON PROFIL"
              onPress={handleRegister}
              loading={loading}
              variant="cyan"
              size="lg"
              style={{ marginTop: 14 }}
            />
          </GlassCard>

          {/* Already have account */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Déjà un profil opérationnel ? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')} activeOpacity={0.7}>
              <Text style={styles.loginLink}>Se connecter</Text>
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
    paddingVertical: 18,
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
    marginBottom: 16,
  },
  pageTitle: {
    ...Typography.displayLarge,
    fontSize: 24,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  pageSubtitle: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  formCard: {
    width: '100%',
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
    marginBottom: 12,
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
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: Colors.cyan,
    borderColor: Colors.cyan,
  },
  termsText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 16,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
  },
  loginLink: {
    ...Typography.bodyMedium,
    color: Colors.cyan,
    fontWeight: '700',
  },
});
