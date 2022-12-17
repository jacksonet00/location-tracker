import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { LocationAccuracy, LocationOptions } from 'expo-location';

interface CurrentLocationCollectorProps {
    location: Location.LocationObject | null;
    setLocation: React.Dispatch<React.SetStateAction<Location.LocationObject | null>>;
}

const CurrentLocationCollector: React.FC<CurrentLocationCollectorProps> = ({ location, setLocation }) => {
    async function getCurrentLocation() {
        const options: LocationOptions = {
            accuracy: LocationAccuracy.Highest,
            mayShowUserSettingsDialog: true,
            timeInterval: 0,
        };
        return Location.getCurrentPositionAsync(options);
    }

    if (!location) {
        return (
            <View style={style.container}>
                <Text>No Location.</Text>
                <Button title="Get Current Location" onPress={async () => await getCurrentLocation().then(setLocation)} />
            </View>
        );
    }

    return (
        <View style={style.container}>
            <Text>{`(${location.coords.latitude}, ${location.coords.longitude})`}</Text>
            <Button title="Refresh Current Location" onPress={async () => await getCurrentLocation().then(setLocation)} />
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CurrentLocationCollector;