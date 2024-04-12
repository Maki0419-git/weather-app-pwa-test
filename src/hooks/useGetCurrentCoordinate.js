import { useEffect, useState } from "react";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export default function useGetCurrentCoordinate() {
  const [currentCoordinate, setCurrentCoordinate] = useState(null);
  const [error, setError] = useState(null);

  const getCurrentCoordinate = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      console.log("Geolocation is not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentCoordinate({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        console.log({ position });
      },
      (error) => {
        let msg = null;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            msg = "User denied the request for Geolocation.";
            break;
          case error.POSITION_UNAVAILABLE:
            msg = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            msg = "The request to get user location timed out.";
            break;
          case error.UNKNOWN_ERROR:
            msg = "An unknown error occurred.";
            break;
          default:
            msg = "An unknown error occurred.";
        }
        setError(msg);
      },
      options
    );
  };

  useEffect(() => {
    getCurrentCoordinate();
  }, []);
  return { currentCoordinate, getCurrentCoordinate, error };
}
