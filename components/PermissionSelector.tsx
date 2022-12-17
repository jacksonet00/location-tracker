import React from 'react';
import { Button } from 'react-native';
import BackgroundLocationPermissionRequester from "./BackgroundLocationPermissionRequester";
import ForegroundLocationPermissionRequester from "./ForegroundLocationPermissionRequester";

interface PermissionSelectorProps {
    onClose: () => void;
}

const PermissionSelector: React.FC<PermissionSelectorProps> = ({ onClose }) => {
    return (
        <>
            <ForegroundLocationPermissionRequester />
            <BackgroundLocationPermissionRequester />
            <Button title="Continue" onPress={onClose} />
        </>
    );
};

export default PermissionSelector;