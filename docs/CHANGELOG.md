# Changelog - CONTINENT VPN Mobile

All notable changes to the CONTINENT VPN mobile application will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Native WireGuard backend integration
- In-app biometric authentication bridge
- Hardware security key support

## [1.0.0] - 2026-09-30

### Added
- Complete CONTINENT VPN mobile application in React Native (Expo SDK 54, TypeScript)
- Original cyber-anime aesthetic inspired by the official CONTINENT VPN Guardian identity
- Splash screen with cinematic loading glow and brand tagline
- 3-step interactive onboarding flow (Privacy, Performance, Digital Freedom)
- Secure traditional authentication system (Login, Sign Up, OTP Verification, Password Recovery) - strict no-Google auth
- Futuristic Command Center Home Screen featuring dynamic Guardian visual states:
  - Inactive / Calm mode (Disconnected)
  - Charging / Scanning particles mode (Connecting)
  - Shield / Cyan protective aura mode (Connected)
  - Security warning / Threat alert mode
- Futuristic Security Energy Core interaction (Tap / Engage to connect)
- Live connection metrics (speed counter, upload/download, timer, encryption status)
- Cybersecurity Activity & Analytics dashboard with circular usage progress, real-time line charts, and period filtering (Aujourd'hui, 7 jours, 30 jours)
- Intelligent CONTINENT NETWORK routing hub (Auto Recommended, Low Latency, Shield Core, Regional hubs)
- Subscription / Forfaits management with monthly, quarterly, and annual billing (-20% discount)
- User Profile management with account status and active tiers
- Device Management center (Connected devices 2/5, status, rename, revoke)
- Comprehensive Settings (Kill Switch, Auto-connect, WireGuard protocol, Biometrics, Dark Theme, Language)
- Real-time Notifications center (Tabs: Toutes, Connexions, Compte, Système)
- Customer Support & Help Center (FAQ, live troubleshooting, contact support)
- Production-ready modular architecture and type-safe services
- Automated GitHub Actions APK deployment workflow (`.github/workflows/build-apk.yml`) with release artifact publishing
- Cloud & local EAS Build profiles (`eas.json`) for standalone Android APK generation
- Android manifest security and network permissions in `app.json`
