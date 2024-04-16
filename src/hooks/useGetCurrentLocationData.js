import {
  fromLatLng,
  setKey,
  setLanguage,
  setLocationType,
  setRegion,
} from "react-geocode";
import { useCallback, useEffect, useState } from "react";
import { availableLocationsData } from "../data/CityCountyData";

setKey(process.env.REACT_APP_GOOGLEMAP_API_KEY);
setLanguage("zh-TW");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
setRegion("es");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
setLocationType("ROOFTOP");

const DEFAULT_LOCATION_DATA = {
  cityName: "臺北市",
  stationName: "臺北",
};

function getCity(response) {
  for (let i = 0; i < response.results[0].address_components.length; i++) {
    for (
      let j = 0;
      j < response.results[0].address_components[i].types.length;
      j++
    ) {
      switch (response.results[0].address_components[i].types[j]) {
        case "administrative_area_level_1":
          return response.results[0].address_components[i].long_name;
      }
    }
  }
}

function useGetCurrentLocationData(currentCoordinate) {
  const [locationData, setLocationData] = useState(DEFAULT_LOCATION_DATA);
  const [error, setError] = useState(null);

  const getCurrentLocationData = useCallback(
    async function () {
      try {
        const { lat, lng } = currentCoordinate;
        const response = await fromLatLng(lat, lng);
        const city = getCity(response);

        const locationData = availableLocationsData.find(
          (i) => i.cityName === city
        );
        setLocationData(locationData);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    },
    [currentCoordinate]
  );

  useEffect(() => {
    if (currentCoordinate) {
      getCurrentLocationData();
    }
  }, [currentCoordinate, getCurrentLocationData]);

  return { locationData, error };
}

export default useGetCurrentLocationData;
