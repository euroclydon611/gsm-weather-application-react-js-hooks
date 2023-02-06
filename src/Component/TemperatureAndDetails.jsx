import React from "react";
import { useGlobalContext } from "../Context/AppProvider";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperature0,
  faDroplet,
  faWind,
  faArrowUp,
  faArrowDown,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

const TemperatureAndDetails = () => {
  const { weatherData, temp } = useGlobalContext();

  const weatherDescription = weatherData.weather[0].description;
  const temperature = weatherData.main.temp;
  const realFeel = weatherData.main.feels_like;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  const sunrise = weatherData.sys.sunrise;
  const sunset = weatherData.sys.sunset;
  const max_temperature = weatherData.main.temp_max;
  const min_temperature = weatherData.main.temp_min;

  const icon = weatherData.weather[0].icon;
  // const iconLink = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  const time = (dt) => {
    return DateTime.fromSeconds(dt).toFormat("hh:mm a").toString();
  };

  const iconLink = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="temp-detail-container">
      <div className="top">
        <p className="description">
          {weatherDescription
            .charAt(0)
            .toUpperCase()
            .concat(weatherData.weather[0].description.slice(1))}
        </p>
      </div>

      <div className="middle">
        <img src={iconLink} alt="icon" />
        <h3 className="temp">{temperature.toFixed()}&#176;C</h3>
        {temperature && (
          <div
            className={temp <= 40 ? "main-details normal" : "main-details hot"}
          >
            <p>
              <FontAwesomeIcon className="fa" icon={faTemperature0} />
              Real fell: {realFeel.toFixed()}&#176;
            </p>
            <p>
              <FontAwesomeIcon className="fa" icon={faDroplet} />
              Humidity: {humidity.toFixed()}%
            </p>
            <p>
              <FontAwesomeIcon className="fa" icon={faWind} />
              Wind: {windSpeed.toFixed()}km/h
            </p>
          </div>
        )}
      </div>

      <div className="bottom">
        <span className={temp <= 40 ? "normal" : "hot"}>
          <FontAwesomeIcon className="fa" icon={faSun} />
          Rise: {time(sunrise)}
        </span>
        <span className={temp <= 40 ? "normal" : "hot"}>
          <FontAwesomeIcon className="fa" icon={faSun} />
          Set: {time(sunset)}
        </span>
        <span className={temp <= 40 ? "normal" : "hot"}>
          <FontAwesomeIcon className="fa" icon={faArrowUp} />
          Height: {max_temperature.toFixed()}&#176;
        </span>
        <span className={temp <= 40 ? "normal" : "hot"}>
          <FontAwesomeIcon className="fa" icon={faArrowDown} />
          Low: {min_temperature.toFixed()}
          &#176;
        </span>
      </div>
    </div>
  );
};

export default TemperatureAndDetails;
