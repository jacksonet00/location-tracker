import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { locationObjectToLocationRegion } from "../util/locationObjectToLocationRegion";
import * as Location from 'expo-location';
import { LocationObject } from "expo-location";

interface GeofencerProps {
    location: LocationObject | null;
}

const Geofencer: React.FC<GeofencerProps> = ({ location }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isGeofencing, setIsGeofencing] = useState<boolean>(false);

    async function startGeofencing(locationObjects: LocationObject[]) {
        await Location.startGeofencingAsync("GEOFENCING_TASK", locationObjects.map(locationObjectToLocationRegion));
        setIsGeofencing(await hasStaredGeofencing());
    }

    async function stopGeofencing() {
        await Location.stopGeofencingAsync("GEOFENCING_TASK");
        setIsGeofencing(await hasStaredGeofencing());
    }

    async function hasStaredGeofencing() {
        return Location.hasStartedGeofencingAsync("GEOFENCING_TASK");
    }

    useEffect(() => {
        (async () => {
            setIsGeofencing(await hasStaredGeofencing());
        })().then(() => setLoading(false));
    }, []);

    function renderGeofencingButton() {
        if (isGeofencing) {
            return <Button title="Stop Geofencing" onPress={async () => await stopGeofencing()} />;
        }
        return <Button title="Start Geofencing" onPress={async () => await startGeofencing([location!])} />;
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View >);
    }

    return (
        <View style={styles.container}>
            {renderGeofencingButton()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Geofencer;