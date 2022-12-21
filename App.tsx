import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { LocationObject } from "expo-location";
import { defineTask } from 'expo-task-manager';
import PermissionSelector from "./components/PermissionSelector";
import CurrentLocationCollector from "./components/CurrentLocationCollector";
import Geofencer from "./components/Geofencer";
import { GEOFENCING_TASK_EXECUTOR } from "./util/GEOFENCING_TASK_EXECUTOR";
import { initializeApp } from "firebase/app";
import * as FirebaseCore from "expo-firebase-core";

defineTask("GEOFENCING_TASK", GEOFENCING_TASK_EXECUTOR);

initializeApp(
  FirebaseCore.DEFAULT_WEB_APP_OPTIONS as FirebaseCore.FirebaseOptions
);

export default function App() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [permissionResponse, setPermissionResponse] = useState<Location.PermissionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function refreshPermissions() {
    const response = await Location.getForegroundPermissionsAsync();
    setPermissionResponse(response);
  }

  useEffect(() => {
    (async () => {
      await refreshPermissions();
    })().then(() => setLoading(false));
  }, []);

  function render() {
    if (loading) {
      return <Text>Loading...</Text>;
    }
    if (!permissionResponse || !permissionResponse.granted) {
      return <PermissionSelector onContinue={async () => await refreshPermissions()} />;
    }
    return (
      <View>
        <CurrentLocationCollector location={location} setLocation={setLocation} />
        <Geofencer location={location} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {render()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
