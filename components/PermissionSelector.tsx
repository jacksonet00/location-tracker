import React from 'react';
import { Button } from 'react-native';
import BackgroundLocationPermissionRequester from "./BackgroundLocationPermissionRequester";
import ForegroundLocationPermissionRequester from "./ForegroundLocationPermissionRequester";

interface PermissionSelectorProps {
    onContinue: () => void;
}

const PermissionSelector: React.FC<PermissionSelectorProps> = ({ onContinue }) => {
    return (
        <>
            <ForegroundLocationPermissionRequester />
            <BackgroundLocationPermissionRequester />
            <Button title="Continue" onPress={onContinue} />
        </>
    );
};

export default PermissionSelector;