import "./styles.css";
import { Container } from "react-bootstrap";
import WeatherCard from "./WeatherCard";
import useWeatherAPI from "./WeatherAPI";
import useSetCityData from "./GetCityCountyAPI";
import ChooseLocation from "./ChooseLocation";
import { useEffect, useState } from "react";
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default function App() {
  const [failed, setFailed] = useState({
    show: false,
    message: ""
  })
  const [LocateData] = useSetCityData(failed, setFailed);
  const [selectedLocate, setSelectedLocate] = useState(LocateData);
  const [weatherElement, fetchWeather] = useWeatherAPI(selectedLocate, failed, setFailed);
  const [show, setShow] = useState(false);

  useEffect(() => setSelectedLocate(LocateData), [LocateData])

  console.log(LocateData);
  // console.log("cityData:");
  // console.log(cityData);
  // console.log("weatherElement");
  // console.log(weatherElement);
  // console.log("start:" + weatherElement.ifLoading);
  function modalShow() {
    setShow(true);
  }

  function modalClose() {
    setShow(false);
  }

  function getLocate() {
    setSelectedLocate(LocateData);
    setShow(false);
  }
  function locateupdate(data) {
    // useGetCityCountyAPI(data);
    setSelectedLocate(data);
    setShow(false);
  }
  return (
    <Container className="box">

      <WeatherCard
        weatherElement={weatherElement}
        fetchWeather={fetchWeather}
        modalShow={modalShow}
        failed={failed}


      />

      {/* {console.log("render:" + weatherElement.ifLoading)} */}
      <ChooseLocation locateupdate={locateupdate} show={show} modalClose={modalClose} getLocate={getLocate} />

    </Container>
  );
}
