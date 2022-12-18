import { ExpoConfig } from "@expo/config-types";
import { FirebaseOptions } from "firebase/app";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyA0dTc35JRxeraEIJWa-TMs98IqE0KYccA",
  authDomain: "location-tracker-3122b.firebaseapp.com",
  projectId: "location-tracker-3122b",
  storageBucket: "location-tracker-3122b.appspot.com",
  messagingSenderId: "744273162282",
  appId: "1:744273162282:web:023f7f3201b480f2dcd353",
  measurementId: "G-FH0YLLW8EH"
};

const config: ExpoConfig = {
    name: "location-tracker",
    slug: "location-tracker",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
    },
    updates: {
        fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
        "**/*"
    ],
    ios: {
        supportsTablet: true,
        infoPlist: {
        NSLocationAlwaysAndWhenInUseUsageDescription: "This app collects location data.",
        UIBackgroundModes: [
            "location",
            "fetch"
        ]
        }
    },
    android: {
        adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
        }
    },
    web: {
        favicon: "./assets/favicon.png",
        config: {
            firebase: firebaseConfig,
        }
    }
}

export default config;