import "./styles.css";
import { Container } from "react-bootstrap";
import WeatherCard from "./WeatherCard";
import useWeatherAPI from "./hooks/useWeatherAPI";
import ChooseLocation from "./ChooseLocation";
import { useEffect, useState } from "react";
import useGetCurrentCoordinate from "./hooks/useGetCurrentCoordinate";
import useGetCurrentLocationData from "./hooks/useGetCurrentLocationData";
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default function App() {
  const [failed, setFailed] = useState({
    show: false,
    message: "",
  });
  const { currentCoordinate, error: getCurrentPositionError } =
    useGetCurrentCoordinate();
  console.log({ currentCoordinate, getCurrentPositionError });
  const { locationData, error: getCurrentLocationDataError } =
    useGetCurrentLocationData(currentCoordinate);
  console.log({ locationData, getCurrentLocationDataError });
  const [selectedLocate, setSelectedLocate] = useState(locationData);
  const [weatherElement, fetchWeather] = useWeatherAPI(
    selectedLocate,
    failed,
    setFailed
  );
  const [show, setShow] = useState(false);

  useEffect(() => setSelectedLocate(locationData), [locationData]);

  function modalShow() {
    setShow(true);
  }

  function modalClose() {
    setShow(false);
  }

  function getLocate() {
    setSelectedLocate(locationData);
    setShow(false);
  }
  function locateupdate(data) {
    // useGetCityCountyAPI(data);
    setSelectedLocate(data);
    setShow(false);
  }
  return (
    <>
      <Container className="box">
        <WeatherCard
          weatherElement={weatherElement}
          fetchWeather={fetchWeather}
          modalShow={modalShow}
          failed={failed}
        />

        <ChooseLocation
          locateupdate={locateupdate}
          show={show}
          modalClose={modalClose}
          getLocate={getLocate}
        />
      </Container>
    </>
  );
}
