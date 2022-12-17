import * as Location from 'expo-location';
import { LocationObject, LocationRegion } from 'expo-location';
import { GEOFENCING_RADIUS } from "../constants";

export function locationObjectToLocationRegion(locationObject: LocationObject) {
    const locationRegion: LocationRegion = {
      latitude: locationObject.coords.latitude,
      longitude: locationObject.coords.longitude,
      radius: GEOFENCING_RADIUS,
      notifyOnEnter: true,
      notifyOnExit: true,
      state: Location.GeofencingRegionState.Unknown,
    };
    return locationRegion;
  }