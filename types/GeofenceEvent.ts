import { GeofencingEventType } from "expo-location";

export type GeofenceEvent = {
    eventType: "ENTER" | "EXIT"
};