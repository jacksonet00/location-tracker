import { GeofencingEventType, LocationRegion } from "expo-location";
import { TaskManagerTaskExecutor } from "expo-task-manager";
import { doc, getFirestore } from "firebase/firestore";
import { GeofenceEvent } from "../types/GeofenceEvent";
import { setFirestoreDocument } from "./firebase/setFirestoreDocument";

export const GEOFENCING_TASK_EXECUTOR: TaskManagerTaskExecutor = ({ data, error }) => {
  const { eventType, region } = data as { eventType: GeofencingEventType, region: LocationRegion, };
  if (error) {
    return;
  }
  if (eventType === GeofencingEventType.Enter) {
    console.log("You've entered region:", region);
    setFirestoreDocument<GeofenceEvent>(doc(getFirestore(), "geofencing/69420"), { eventType: "ENTER" });
  } else if (eventType === GeofencingEventType.Exit) {
    console.log("You've left region:", region);
    setFirestoreDocument<GeofenceEvent>(doc(getFirestore(), "geofencing/69420"), { eventType: "EXIT" });
  }
};