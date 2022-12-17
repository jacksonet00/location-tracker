import { GeofencingEventType, LocationRegion } from "expo-location";
import { TaskManagerTaskExecutor } from "expo-task-manager";

export const GEOFENCING_TASK_EXECUTOR: TaskManagerTaskExecutor = ({ data, error }) => {
  const { eventType, region } = data as { eventType: GeofencingEventType, region: LocationRegion, };
  if (error) {
    return;
  }
  if (eventType === GeofencingEventType.Enter) {
    console.log("You've entered region:", region);
  } else if (eventType === GeofencingEventType.Exit) {
    console.log("You've left region:", region);
  }
};