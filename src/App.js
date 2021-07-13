import "./styles.css";
import { Container, Button, Modal, Alert, Col } from "react-bootstrap";
import WeatherCard from "./WeatherCard";
import useWeatherAPI from "./WeatherAPI";

import ChooseLocation from "./ChooseLocation";
import { useState } from "react";
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default function App() {

  const [selectedLocate, setSelectedLocate] = useState("getLocate");

  const [weatherElement, failed, fetchWeather] = useWeatherAPI(selectedLocate);
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
      <ChooseLocation locateupdate={locateupdate} show={show} modalClose={modalClose} />

    </Container>
  );
}
