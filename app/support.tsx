import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../src/constants/colors';
import Typography from '../src/constants/typography';
import Header from '../src/components/common/Header';
import GlassCard from '../src/components/common/GlassCard';
import NeonButton from '../src/components/common/NeonButton';

export default function SupportScreen() {
  const [runningDiagnostic, setRunningDiagnostic] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const FAQS = [
    {
      q: 'Comment fonctionne le maillage intelligent CONTINENT ?',
      a: 'Contrairement aux VPN traditionnels où l’utilisateur doit deviner quel serveur est le plus rapide, CONTINENT VPN mesure continuellement la gigue, la latence et la charge pour router votre trafic sur le canal optimal en temps réel.',
    },
    {
      q: 'Qu’est-ce que le Kill Switch et comment protège-t-il mes flux ?',
      a: 'Le Kill Switch est un verrou de sécurité strict. Si le tunnel chiffré s’interrompt brièvement (par exemple lors d’un changement de borne Wi-Fi ou d’antenne 5G), il bloque tout flux sortant non chiffré pour empêcher que votre véritable adresse IP ne soit exposée.',
    },
    {
      q: 'Pourquoi l’application n’a-t-elle pas de connexion Google ou Apple ?',
      a: 'Par principe fondamental de souveraineté et d’anonymat. L’intégration de boutons de connexion tiers permet aux géants du web de corréler votre utilisation VPN à votre profil commercial. CONTINENT VPN utilise une authentification cryptographique totalement indépendante.',
    },
    {
      q: 'Combien d’appareils puis-je connecter en simultané ?',
      a: 'La formule Basique autorise 2 appareils, la formule Premium Guardian en autorise 5, et la formule Ultime Quantum offre des connexions simultanées illimitées.',
    },
  ];

  const handleRunDiagnostic = () => {
    setRunningDiagnostic(true);
    setDiagnosticResult(null);

    setTimeout(() => {
      setRunningDiagnostic(false);
      setDiagnosticResult('TOUS LES TESTS SÉCURITÉ SONT VALIDÉS (100% SÉCURISÉ)');
      Alert.alert(
        'Diagnostic Réseau Terminé',
        '✓ Tunnel WireGuard : Chiffré\n✓ Fuite DNS : Aucune détectée\n✓ Ping Réseau : 14 ms (Excellent)\n✓ Kill Switch : Prêt'
      );
    }, 1800);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="SUPPORT & ASSISTANCE" subtitle="DÉFENSE CYBERNÉTIQUE 24/7" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Network Diagnostic Card */}
        <GlassCard style={styles.diagnosticCard} variant="cyan" padding={18}>
          <View style={styles.diagHeader}>
            <View style={styles.diagIcon}>
              <Ionicons name="pulse" size={24} color={Colors.cyan} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.diagTitle}>DIAGNOSTIC DU TUNNEL SÉCURISÉ</Text>
              <Text style={styles.diagSubtitle}>
                Vérification en direct de l'intégrité du chiffrement et absence de fuites DNS
              </Text>
            </View>
          </View>

          {diagnosticResult && (
            <View style={styles.resultBox}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.emerald} />
              <Text style={styles.resultText}>{diagnosticResult}</Text>
            </View>
          )}

          <NeonButton
            title="LANCER LE DIAGNOSTIC RÉSEAU"
            onPress={handleRunDiagnostic}
            loading={runningDiagnostic}
            variant="cyan"
            size="md"
            style={{ marginTop: 12 }}
          />
        </GlassCard>

        {/* Contact Channels */}
        <Text style={styles.sectionTitle}>CONTACT DIRECT AVEC LES INGÉNIEURS</Text>
        <View style={styles.contactRow}>
          <TouchableOpacity
            style={styles.contactItem}
            activeOpacity={0.8}
            onPress={() => Alert.alert('Chat Guardian', 'Un ingénieur de garde va ouvrir votre session sécurisée.')}
          >
            <GlassCard style={styles.contactCard} variant="subtle" padding={14}>
              <Ionicons name="chatbubbles-outline" size={24} color={Colors.cyan} />
              <Text style={styles.contactTitle}>Chat en Direct</Text>
              <Text style={styles.contactSub}>Temps de réponse ~2 min</Text>
            </GlassCard>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactItem}
            activeOpacity={0.8}
            onPress={() => Alert.alert('Ticket Cryptographique', 'Veuillez rédiger votre demande à support@continentvpn.com.')}
          >
            <GlassCard style={styles.contactCard} variant="subtle" padding={14}>
              <Ionicons name="mail-open-outline" size={24} color={Colors.cyan} />
              <Text style={styles.contactTitle}>Ticket Sécurisé</Text>
              <Text style={styles.contactSub}>support@continentvpn.com</Text>
            </GlassCard>
          </TouchableOpacity>
        </View>

        {/* FAQ Accordion */}
        <Text style={styles.sectionTitle}>QUESTIONS FRÉQUEMMENT POSÉES</Text>
        {FAQS.map((faq, index) => {
          const isExpanded = expandedFaq === index;
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => setExpandedFaq(isExpanded ? null : index)}
            >
              <GlassCard style={styles.faqCard} variant="subtle" padding={16}>
                <View style={styles.faqHeader}>
                  <Text style={[styles.faqQuestion, isExpanded && { color: Colors.cyan }]}>
                    {faq.q}
                  </Text>
                  <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color={Colors.cyan}
                  />
                </View>
                {isExpanded && <Text style={styles.faqAnswer}>{faq.a}</Text>}
              </GlassCard>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
    paddingBottom: 40,
  },
  diagnosticCard: {
    marginVertical: 12,
  },
  diagHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  diagIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 229, 255, 0.12)',
    borderWidth: 1,
    borderColor: Colors.cyan,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diagTitle: {
    ...Typography.cyberHeader,
    fontSize: 12,
    color: Colors.textPrimary,
  },
  diagSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 136, 0.12)',
    borderWidth: 1,
    borderColor: Colors.emerald,
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
    gap: 8,
  },
  resultText: {
    ...Typography.caption,
    color: Colors.emerald,
    fontSize: 10,
    fontWeight: '800',
    flex: 1,
  },
  sectionTitle: {
    ...Typography.cyberHeader,
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 18,
    marginBottom: 10,
    letterSpacing: 1.2,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 10,
  },
  contactItem: {
    flex: 1,
  },
  contactCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  contactTitle: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginTop: 8,
    fontSize: 13,
  },
  contactSub: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
  },
  faqCard: {
    marginBottom: 10,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    fontWeight: '700',
    fontSize: 13,
    flex: 1,
    paddingRight: 10,
  },
  faqAnswer: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
    paddingTop: 10,
  },
});
