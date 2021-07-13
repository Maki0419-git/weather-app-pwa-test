
import { availableLocations } from "./CityCountyData";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyBU4r6XCZwygcRu8JPDcnpqNLiE1NIhlds");
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
  return new Promise(function (resolve) {
    navigator.geolocation.getCurrentPosition(function (position) {
      resolve([position.coords.latitude, position.coords.longitude]);
    });
  });
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


async function setCityData() {


  const [lat, lon] = await getPreciseLocation();
  const response = await Geocode.fromLatLng(lat, lon);
  const state = changeState(response);
  console.log(state)

  const findLocation = availableLocations.find(
    (i) => i.cityName === state
  );


  console.log("getLocation Completed");

  return findLocation

}


export default setCityData;




