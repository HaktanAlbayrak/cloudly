import type { Coordinates } from "@/api/types";
import { useCallback, useEffect, useState } from "react";

interface GelolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

const NOT_SUPPORTED_ERROR = "Geolocation is not supported by your browser";

export function useGeolocation() {
  const [locationData, setLocationData] = useState<GelolocationState>(() =>
    navigator.geolocation
      ? { coordinates: null, error: null, isLoading: true }
      : { coordinates: null, error: NOT_SUPPORTED_ERROR, isLoading: false },
  );

  // Only calls the browser API; state updates happen in the async callbacks.
  const requestPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage: string;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location permission denied. Please enable location access.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
        }

        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  }, []);

  // Called on user action (e.g. a "Retry" button).
  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: NOT_SUPPORTED_ERROR,
        isLoading: false,
      });
      return;
    }

    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));
    requestPosition();
  };

  // Get location on component mount
  useEffect(() => {
    if (!navigator.geolocation) return;
    requestPosition();
  }, [requestPosition]);

  return {
    ...locationData,
    getLocation, // Expose method to manually refresh location
  };
}
