import React, { useEffect, useState } from "react";
import { ReactComponent as DayThunderstorm } from "./images/thunder.svg";
import { ReactComponent as DayClear } from "./images/sun.svg";
import { ReactComponent as DayCloudyFog } from "./images/haze.svg";
import { ReactComponent as DayCloudy } from "./images/cloudy3.svg";
import { ReactComponent as DayFog } from "./images/fog.svg";
import { ReactComponent as DayPartiallyClearWithRain } from "./images/rain.svg";
import { ReactComponent as DaySnowing } from "./images/snowing.svg";
import { ReactComponent as NightThunderstorm } from "./images/nightThunderStorm.svg";
import { ReactComponent as NightClear } from "./images/nightClear.svg";
import { ReactComponent as NightCloudyFog } from "./images/nightCloudyFog.svg";
import { ReactComponent as NightCloudy } from "./images/nightCloudy.svg";
import { ReactComponent as NightFog } from "./images/nightCloudyFog.svg";
import { ReactComponent as NightPartiallyClearWithRain } from "./images/nightRain.svg";
const weatherTypes = {
  isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
  isClear: [0, 1],
  isCloudyFog: [25, 26, 27, 28],
  isCloudy: [2, 3, 4, 5, 6, 7],
  isFog: [24],
  isPartiallyClearWithRain: [
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    19,
    20,
    29,
    30,
    31,
    32,
    38,
    39
  ],
  isSnowing: [23, 37, 42]
};

const weatherIcons = {
  night: {
    isThunderstorm: <NightThunderstorm className="weatherIcon-medium" />,
    isClear: <NightClear className="weatherIcon-medium" />,
    isCloudyFog: <NightCloudyFog className="weatherIcon-medium" />,
    isCloudy: <NightCloudy className="weatherIcon-medium" />,
    isFog: <NightFog className="weatherIcon-medium" />,
    isPartiallyClearWithRain: (
      <NightPartiallyClearWithRain className="weatherIcon-medium" />
    ),
    isSnowing: <DaySnowing className="weatherIcon-medium" />
  },
  day: {
    isThunderstorm: <DayThunderstorm className="weatherIcon-medium" />,
    isClear: <DayClear className="weatherIcon-medium" />,
    isCloudyFog: <DayCloudyFog className="weatherIcon-medium" />,
    isCloudy: <DayCloudy className="weatherIcon-medium" />,
    isFog: <DayFog className="weatherIcon-medium" />,
    isPartiallyClearWithRain: (
      <DayPartiallyClearWithRain className="weatherIcon-medium" />
    ),
    isSnowing: <DaySnowing className="weatherIcon-medium" />
  }
};

const WeatherIcon = (props) => {
  const [image, setImage] = useState("isClear");
  // const [moment_]=useRef(moment);

  useEffect(() => {
    const [weatherType] =
      Object.entries(weatherTypes).find(([weatherType, weatherCodes]) => {
        return weatherCodes.includes(Number(props.code));
      }) || [];
    setImage(weatherType);
  }, [props.code]);

  return weatherIcons[props.moment][image];
};

export default WeatherIcon;
