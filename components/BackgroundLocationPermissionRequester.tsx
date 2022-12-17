import React from 'react';
import { Button, Text, View } from 'react-native';
import Dialog from "react-native-dialog";
import * as Location from 'expo-location';

interface BackgroundLocatioinPermissionRequester {

}

const BackgroundLocationPermissionRequester: React.FC<BackgroundLocatioinPermissionRequester> = ({ }) => {
    const [showDialog, setShowDialog] = React.useState(false);

    const options: Location.PermissionHookOptions<object> = {
        get: true,
        request: false,
    };
    const [status, requestPermission] = Location.useBackgroundPermissions(options);

    async function handleAllow() {
        const res = await requestPermission();
        console.log(res);
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
            <Text>Background location access: </Text>
            {renderAllowButton()}

            <Dialog.Container visible={showDialog}>
                <Dialog.Title>Please Allow Background Location Access</Dialog.Title>
                <Dialog.Description>
                    This app needs background location access in order to function properly.
                </Dialog.Description>
                <Dialog.Button label="Cancel" onPress={handleCancel} />
                <Dialog.Button label="Allow" onPress={handleAllow} />
            </Dialog.Container>
        </View>
    );
};

export default BackgroundLocationPermissionRequester;