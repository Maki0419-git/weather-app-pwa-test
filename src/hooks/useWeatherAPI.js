import { useState, useEffect } from "react";
import dayjs from "dayjs";
function changeTime(now, day, data) {
  return now.unix() > dayjs(day + " " + data["sunriseTime"]).unix() &&
    now.unix() < dayjs(day + " " + data["sunsetTime"]).unix()
    ? "day"
    : "night";
}

const weather_API = process.env.REACT_APP_WEATHER_API_KEY;

export default function useWeatherAPI(selectedLocate, failed, setFailed) {
  // const [loading, setLoading] = useState(true);

  // console.log(cityData);
  const [weatherElement, setWeatherElement] = useState({
    observationTime: "Sun Jul 11 2021 22:29:01 GMT+0800 (台北標準時間)",
    cityName: "台北市",
    humid: 0,
    temperature: 0,
    windSpeed: 0,
    description_f: "多雲時晴",
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: "",
    ifLoading: true,
    moment: "day",
  });

  console.log({ weatherElement });

  const fetchWeather = async () => {
    setWeatherElement((prev) => ({ ...prev, ifLoading: true }));
    // setLoading(true);
    let weatherElement_current = {};
    try {
      const response_current = await fetch(
        "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=" +
          weather_API +
          "&StationName=" + // StationName 為測站名稱
          selectedLocate.stationName
      );
      const data_current = await response_current.json();
      const stationData_current = data_current.records.Station[0];
      console.log({ stationData_current });

      weatherElement_current = {
        observationTime: stationData_current.ObsTime.DateTime,
        cityName: selectedLocate.cityName,
        temperature: stationData_current.WeatherElement.AirTemperature,
        windSpeed: stationData_current.WeatherElement.WindSpeed,
        humid: stationData_current.WeatherElement.RelativeHumidity,
      };
    } catch (e) {
      console.log(e);
      if (failed === false) {
        setFailed({ alert: true, message: "中央氣象局沒有回應" });
      }
    }

    try {
      const response_future = await fetch(
        "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=" +
          weather_API +
          "&locationName=" + // locationName 為縣市名稱
          selectedLocate.cityName
      );
      const data_future = await response_future.json();
      const stationData_future = data_future.records.location[0];
      const Elements_future = stationData_future.weatherElement.reduce(
        (neededElements, item) => {
          if (["Wx", "PoP", "CI"].includes(item.elementName)) {
            neededElements[item.elementName] = item.time[0].parameter;
          }
          return neededElements;
        },
        {}
      );
      weatherElement_current = {
        ...weatherElement_current,
        description_f: Elements_future.Wx.parameterName,
        weatherCode: Elements_future.Wx.parameterValue,
        rainPossibility: Elements_future.PoP.parameterName,
        comfortability: Elements_future.CI.parameterName,
      };
    } catch (e) {
      if (failed === false) {
        setFailed({ alert: true, message: "中央氣象局沒有回應" });
      }
    }
    // console.log(Elements_future);
    const now = dayjs();
    const day = Intl.DateTimeFormat("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(now)
      .replace(/\//g, "-");
    try {
      const response_DayorNight = await fetch(
        "https://opendata.cwa.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=" +
          weather_API +
          "&CountyName=" + // CountyName 為縣市名稱
          selectedLocate.cityName +
          "&Date=" +
          day
      );

      const data_DayorNight = await response_DayorNight.json();
      // console.log(data_DayorNight);
      const stationData_DayorNight =
        data_DayorNight.records.locations.location[0].time[0];
      const DayorNightElements = {
        sunriseTime: stationData_DayorNight["SunRiseTime"],
        sunsetTime: stationData_DayorNight["SunSetTime"],
      };
      console.log({ DayorNightElements });
      weatherElement_current = {
        ...weatherElement_current,
        moment: changeTime(now, day, DayorNightElements),
      };
    } catch (e) {
      console.log(e);
      if (failed === false) {
        setFailed({ alert: true, message: "中央氣象局沒有回應" });
      }
    }
    // console.log(DayorNightElements);

    // setLoading(false);
    setWeatherElement((prev) => ({
      ...prev,
      ...weatherElement_current,
      ifLoading: false,
    }));

    // if (weatherElement_current.length !== 0) {
    //   setFailed(false);
    // }
  };
  // eslint-disable-next-line
  useEffect(() => {
    fetchWeather();
  }, [selectedLocate]);

  return [weatherElement, fetchWeather];
}
