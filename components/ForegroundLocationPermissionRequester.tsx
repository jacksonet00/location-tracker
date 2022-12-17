import React from 'react';
import { Button, Text, View } from 'react-native';
import Dialog from "react-native-dialog";
import * as Location from 'expo-location';

interface ForegroundLocatioinPermissionRequester {

}

const ForegroundLocationPermissionRequester: React.FC<ForegroundLocatioinPermissionRequester> = ({ }) => {
    const [showDialog, setShowDialog] = React.useState(false);

    const options: Location.PermissionHookOptions<object> = {
        get: true,
        request: false,
    };
    const [status, requestPermission] = Location.useForegroundPermissions(options);

    async function handleAllow() {
        await requestPermission();
        setShowDialog(false);
    }

    function handleCancel() {
        setShowDialog(false);
    }

    function renderAllowButton() {
        if (!status || !status.granted) {
            return (
                <Button title="Allow" onPress={() => { setShowDialog(true); }} />
            );
        }
        return (
            <Text>Allowed</Text>
        );
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Location access: </Text>
            {renderAllowButton()}

            <Dialog.Container visible={showDialog}>
                <Dialog.Title>Please Allow Location Access</Dialog.Title>
                <Dialog.Description>
                    This app needs location access in order to function properly.
                </Dialog.Description>
                <Dialog.Button label="Cancel" onPress={handleCancel} />
                <Dialog.Button label="Allow" onPress={handleAllow} />
            </Dialog.Container>
        </View>
    );
};

export default ForegroundLocationPermissionRequester;