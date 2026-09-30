import React, { useState, useEffect, useRef } from 'react';
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

export default function OtpVerificationScreen() {
  const router = useRouter();
  const { verifyOtp, completeOnboarding } = useAuth();

  const [otpDigits, setOtpDigits] = useState(['8', '4', '2', '9', '1', '7']);
  const [timer, setTimer] = useState(45);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDigitChange = (value: string, index: number) => {
    const updated = [...otpDigits];
    updated[index] = value;
    setOtpDigits(updated);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setErrorMessage('');
    const code = otpDigits.join('');
    if (code.length < 6) {
      setErrorMessage('Veuillez entrer les 6 chiffres du code.');
      return;
    }

    setLoading(true);
    const res = await verifyOtp(code);
    setLoading(false);

    if (res.success) {
      await completeOnboarding();
      router.replace('/(tabs)');
    } else {
      setErrorMessage(res.error || 'Code invalide.');
    }
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
          <View style={styles.badgeShield}>
            <Ionicons name="key-outline" size={36} color={Colors.cyan} />
          </View>
          <Text style={styles.title}>Code de Validation</Text>
          <Text style={styles.subtitle}>
            Un jeton cryptographique à 6 chiffres a été transmis à votre adresse sécurisée.
          </Text>
        </View>

        <GlassCard style={styles.card} variant="cyan" padding={20}>
          {errorMessage ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={16} color={Colors.red} />
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* 6 Digit Inputs */}
          <View style={styles.otpRow}>
            {otpDigits.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref: any) => {
                  inputRefs.current[index] = ref;
                }}
                style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
                value={digit}
                onChangeText={(val: string) => handleDigitChange(val, index)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>

          <NeonButton
            title="AUTHENTIFIER MON ACCÈS"
            onPress={handleVerify}
            loading={loading}
            variant="cyan"
            size="lg"
            style={{ marginTop: 24 }}
          />

          {/* Resend timer */}
          <View style={styles.timerRow}>
            {timer > 0 ? (
              <Text style={styles.timerText}>
                Nouveau code disponible dans <Text style={{ color: Colors.cyan }}>{timer}s</Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={() => setTimer(45)} activeOpacity={0.7}>
                <Text style={styles.resendLink}>Renvoyer un nouveau code</Text>
              </TouchableOpacity>
            )}
          </View>
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
  badgeShield: {
    width: 70,
    height: 70,
    borderRadius: 35,
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
    paddingHorizontal: 20,
  },
  card: {
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
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    ...Typography.caption,
    color: Colors.red,
    flex: 1,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  otpBox: {
    width: 44,
    height: 52,
    borderRadius: Layout.radius.md,
    backgroundColor: 'rgba(5, 7, 10, 0.85)',
    borderWidth: 1.5,
    borderColor: Colors.borderSubtle,
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
  },
  otpBoxFilled: {
    borderColor: Colors.cyan,
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
    shadowColor: Colors.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  timerRow: {
    alignItems: 'center',
    marginTop: 18,
  },
  timerText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  resendLink: {
    ...Typography.caption,
    color: Colors.cyan,
    fontWeight: '800',
    letterSpacing: 1,
    textDecorationLine: 'underline',
  },
});
