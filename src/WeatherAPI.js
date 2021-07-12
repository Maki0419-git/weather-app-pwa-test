import { useState, useEffect } from "react";
import dayjs from 'dayjs';
function changeTime(now, day, data) {
  return now.unix() > dayjs(day + " " + data["日出時刻"]).unix() &&
    now.unix() < dayjs(day + " " + data["日沒時刻"]).unix()
    ? "day"
    : "night";
}

export default function useWeatherAPI(cityData) {
  // const [loading, setLoading] = useState(true);

  // console.log(cityData);
  const [weatherElement, setWeatherElement] = useState({
    observationTime: "Sun Jul 11 2021 22:29:01 GMT+0800 (台北標準時間)",
    locationName: cityData.cityName,
    humid: 0,
    temperature: 0,
    windSpeed: 0,
    description: "",
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: "",
    ifLoading: true,
    moment: "day"
  });
  const fetchWeather = async () => {
    console.log("weatherAPI called:");
    setWeatherElement((prev) => ({ ...prev, ifLoading: true }));
    // setLoading(true);
    let weatehrElements = {};
    const response_current = await fetch(
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-B9DAF255-4D29-4E4B-BAE8-D4C8F3382B43&locationName=" +
      cityData.locationName
    );
    const data_current = await response_current.json();
    const locationData_current = data_current.records.location[0];
    // console.log(locationData_current);
    const Elements_current = locationData_current.weatherElement.reduce(
      (neededElements, item) => {
        if (["WDSD", "TEMP", "HUMD"].includes(item.elementName)) {
          neededElements[item.elementName] = item.elementValue;
        }
        return neededElements;
      },
      {}
    );

    const response_future = await fetch(
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-B9DAF255-4D29-4E4B-BAE8-D4C8F3382B43&locationName=" +
      cityData.cityName
    );
    const data_future = await response_future.json();
    // console.log(data_future);
    const locationData_future = data_future.records.location[0];
    const Elements_future = locationData_future.weatherElement.reduce(
      (neededElements, item) => {
        if (["Wx", "PoP", "CI"].includes(item.elementName)) {
          neededElements[item.elementName] = item.time[0].parameter;
        }
        return neededElements;
      },
      {}
    );
    // console.log(Elements_future);
    const now = dayjs();
    const day = Intl.DateTimeFormat("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    })
      .format(now)
      .replace(/\//g, "-");
    const response_DayorNight = await fetch(
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=CWB-B9DAF255-4D29-4E4B-BAE8-D4C8F3382B43&locationName=" +
      cityData.cityName +
      "&dataTime=" +
      day
    );

    const data_DayorNight = await response_DayorNight.json();
    // console.log(data_DayorNight);
    const locationData_DayorNight =
      data_DayorNight.records.locations.location[0].time[0].parameter;
    const DayorNightElements = locationData_DayorNight.reduce(
      (neededElements, item) => {
        if (["日出時刻", "日沒時刻"].includes(item.parameterName)) {
          neededElements[item.parameterName] = item.parameterValue;
        }

        return neededElements;
      },
      {}
    );
    // console.log(DayorNightElements);

    weatehrElements = {
      observationTime: locationData_current.time.obsTime,
      locationName: cityData.cityName,
      temperature: Elements_current.TEMP,
      windSpeed: Elements_current.WDSD,
      humid: Elements_current.HUMD,
      description_f: Elements_future.Wx.parameterName,
      weatherCode: Elements_future.Wx.parameterValue,
      rainPossibility: Elements_future.PoP.parameterName,
      comfortability: Elements_future.CI.parameterName
    };
    // setLoading(false);
    setWeatherElement({
      ...weatehrElements,
      ifLoading: false,
      moment: changeTime(now, day, DayorNightElements)
    });
    console.log("fetch weather completed!");
  };

  useEffect(() => {
    fetchWeather();
  }, [cityData]);

  return [weatherElement, fetchWeather];
}