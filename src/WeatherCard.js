import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Label } from "semantic-ui-react";
import { ReactComponent as Wind } from "./images/wind.svg";
import { ReactComponent as Thermometer } from "./images/thermometer.svg";
import { ReactComponent as Clock } from "./images/clock.svg";
import { ReactComponent as Loading } from "./images/reload.svg";
import { ReactComponent as Humidity } from "./images/humidity.svg";
import { ReactComponent as Setting } from "./images/setting-lines.svg";
import WeatherIcon from "./WeatherIcon";
import dayjs from 'dayjs';

function WeatherCard({ weatherElement, fetchWeather, modalShow }) {
  return (
    <Card style={{ width: "14rem" }}>
      {/* {console.log("render")} */}
      <Card.Body style={{ padding: 0 }}>
        <Card.Img
          // src="https://images.unsplash.com/photo-1597571063304-81f081944ee8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=376&q=80"
          src={
            weatherElement.moment === "day"
              ? "https://images.unsplash.com/photo-1597571063304-81f081944ee8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=376&q=80"
              : "https://images.unsplash.com/photo-1570399747403-6f3af992698f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=313&q=80"
          }
          className="card-img"
          alt="..."
          height="250"
        />
        <Card.ImgOverlay>
          <Card.Title>
            <Row>
              <Col xs={2}>
                <Label
                  color={weatherElement.moment === "day" ? "teal" : "blue"}
                  ribbon
                >
                  {weatherElement.locationName}
                </Label>
              </Col>
              <Col xs={7} />
              <Col>
                <Setting
                  className="weatherIcon-setting color"
                  onClick={modalShow}
                />
              </Col>
            </Row>
          </Card.Title>

          <Row>
            <Col xs={5} className="divCenter">
              <Thermometer className="weatherIcon" />
            </Col>
            <Col className="divCenter">
              <Card.Text className="cardText">
                {Math.round(weatherElement.temperature)}
                <span className="c">°C</span>
              </Card.Text>
            </Col>
          </Row>

          {/* {console.log(weatherElement.moment)} */}
          <Row>
            <Col xs={5} className="divCenter">
              <WeatherIcon
                code={weatherElement.weatherCode}
                moment={weatherElement.moment}
              />
            </Col>
            <Col className="divCenter">
              <Card.Text className="cardText-medium">
                {weatherElement.description_f}
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col xs={5} className="divCenter">
              <Col>
                <Humidity className="weatherIcon-small" />
              </Col>
              <Card.Text className=" cardText-small">
                {weatherElement.rainPossibility}%
              </Card.Text>
            </Col>
            <Col>
              <div className="vl"></div>
            </Col>
            <Col xs={5} className="divCenter">
              <Col style={{ position: "relative", right: "10px" }}>
                <Wind className="weatherIcon-small" />
              </Col>
              <Card.Text
                className=" cardText-small"
                style={{ position: "relative", right: "10px" }}
              >
                {weatherElement.windSpeed}m/h
              </Card.Text>
            </Col>
          </Row>
        </Card.ImgOverlay>
      </Card.Body>

      <Card.Footer>
        <Clock className="footerIcon" /> 觀測時間:{" "}
        {new Intl.DateTimeFormat("zh-TW", {
          hour: "numeric",
          minute: "numeric"
        }).format(dayjs(weatherElement.observationTime))}
        <Loading
          className={
            weatherElement.ifLoading ? "LoadingIcon rotate" : "LoadingIcon"
          }
          onClick={fetchWeather}
          id="loading"
        />
      </Card.Footer>
    </Card>
  );
}

function areEqual(prevProps, nextProps) {
  if (prevProps.weatherElement !== nextProps.weatherElement) {
    console.log(false);
    return false;
  }
  console.log(true);
  return true;
}

export default React.memo(WeatherCard, areEqual);
