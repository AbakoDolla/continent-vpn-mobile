import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
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

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);
    await forgotPassword(email);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, paddingHorizontal: 20 }}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color={Colors.cyan} />
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons name="shield-half" size={38} color={Colors.cyan} />
          </View>
          <Text style={styles.title}>Récupération de Clé</Text>
          <Text style={styles.subtitle}>
            Saisissez l'email lié à votre profil Guardian pour recevoir une clé de déchiffrement temporaire.
          </Text>
        </View>

        <GlassCard style={styles.card} variant="cyan" padding={20}>
          {submitted ? (
            <View style={styles.successBox}>
              <Ionicons name="checkmark-circle" size={48} color={Colors.emerald} />
              <Text style={styles.successTitle}>Clé Transmise</Text>
              <Text style={styles.successText}>
                Un lien de réinitialisation cryptographique a été envoyé à {email}.
              </Text>
              <NeonButton
                title="RETOUR À LA CONNEXION"
                onPress={() => router.replace('/(auth)/login')}
                variant="cyan"
                size="md"
                style={{ marginTop: 18 }}
              />
            </View>
          ) : (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>EMAIL DE L'OPÉRATEUR</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={20} color={Colors.cyan} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="nom@exemple.com"
                    placeholderTextColor={Colors.textMuted}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <NeonButton
                title="ENVOYER LA CLÉ DE RÉCUPÉRATION"
                onPress={handleSubmit}
                loading={loading}
                variant="cyan"
                size="lg"
                style={{ marginTop: 14 }}
              />
            </>
          )}
        </GlassCard>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    marginTop: 10,
  },
  header: {
    alignItems: 'center',
    marginVertical: 24,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    borderWidth: 1.5,
    borderColor: Colors.cyan,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    ...Typography.displayLarge,
    fontSize: 24,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  subtitle: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  card: {
    width: '100%',
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
  successBox: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  successTitle: {
    ...Typography.displayMedium,
    color: Colors.textPrimary,
    marginTop: 12,
    marginBottom: 6,
  },
  successText: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
