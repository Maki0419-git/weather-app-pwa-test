
import { availableLocations } from "./CityCountyData";
import Geocode from "react-geocode";
import { useEffect, useState } from "react";


Geocode.setApiKey(process.env.React_APP_Google);
Geocode.setLanguage("zh-TW");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();
function getPreciseLocation() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  //https://gist.github.com/varmais/74586ec1854fe288d393 getPreciseLocation catch error
}

function changeState(response) {
  for (let i = 0; i < response.results[0].address_components.length; i++) {
    for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
      switch (response.results[0].address_components[i].types[j]) {

        case "administrative_area_level_1":
          return response.results[0].address_components[i].long_name;
        case "administrative_area_level_2":
          return response.results[0].address_components[i].long_name;


      }
    }
  }
}

function useSetCityData(failed, setFailed) {
  const [findLocation, setFindLocation] = useState({
    cityName: "臺北市",
    locationName: "臺北"
  })
  let [lat, lon] = [121, 25];

  async function getLocate() {
    try {

      const position = await getPreciseLocation();
      [lat, lon] = [position.coords.latitude, position.coords.longitude]
      console.log(lat, lon)
    } catch (e) { setFailed({ alert: true, message: "請檢查網路連線及是否開啟定位服務" }) }

    try {
      const response = await Geocode.fromLatLng(lat, lon);
      const state = changeState(response);

      console.log(state)

      const Location = availableLocations.find(
        (i) => i.cityName === state
      );
      setFindLocation(Location)
    } catch (e) {
      if (failed.alert === false) {
        setFailed({ alert: true, message: "請檢查網路連線及是否開啟定位服務" })
      }
    }

  }


  useEffect(() => { getLocate() }, [])
  console.log("getLocation Completed");

  return [findLocation];

}


export default useSetCityData;




