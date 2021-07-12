import "./styles.css";
import { Container, Button, Modal, Alert, Col } from "react-bootstrap";
import WeatherCard from "./WeatherCard";
import useWeatherAPI from "./WeatherAPI";
import useGetCityCountyAPI from "./GetCityCountyAPI";
import ChooseLocation from "./ChooseLocation";
import { useState } from "react";
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default function App() {
  const [cityData, setCityData] = useGetCityCountyAPI("getLocate");
  console.log(cityData);
  const [weatherElement, failed, fetchWeather] = useWeatherAPI(cityData);
  const [show, setShow] = useState(false);

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

  function locateupdate(data) {
    // useGetCityCountyAPI(data);
    setCityData(data);
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
      <ChooseLocation locateupdate={locateupdate} show={show} modalClose={modalClose} />

    </Container>
  );
}
