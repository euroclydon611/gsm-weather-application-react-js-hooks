import React from "react";
import { useGlobalContext } from "../Context/AppProvider";
import { DateTime } from "luxon";
import { Fade } from "react-awesome-reveal";

const Forecast = () => {
  const { forecastData, temp } = useGlobalContext();

  const particularDay = (dt, timezone) => {
    return DateTime.fromSeconds(dt).setZone(timezone).toFormat("cccc dd");
  };

  const particularHour = (dt, timezone) => {
    return DateTime.fromSeconds(dt).setZone(timezone).toFormat("hh a");
  };


  const iconLink = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  };


  const hour = forecastData.hourly.slice(1, 7).map((h) => {
    return (
      <div
        className={
          temp <= 40 ? "forecast-container normal" : "forecast-container hot"
        }
        key={h.dt}
      >
        <p className="hour">{particularHour(h.dt, forecastData.timezone)}</p>
        <img
          src={iconLink(h.weather[0].icon)}
          alt="icon"
          className="forecast-icon"
        />
        <p className="hour-temp">{h.temp.toFixed()}&#176;</p>
      </div>
    );
  });

  const day = forecastData.daily.slice(1, 7).map((d) => {
    return (
      <div
        className={
          temp <= 40 ? "forecast-container normal" : "forecast-container hot"
        }
        key={d.dt}
      >
        <p className="day">
          {particularDay(d.dt, forecastData.timezone)
            .slice(0, 3)
            .concat(" ")
            .concat(particularDay(d.dt, forecastData.timezone).slice(-2))}
        </p>
        <img
          src={iconLink(d.weather[0].icon)}
          alt="icon"
          className="forecast-icon"
        />
        <p className="day-temp">{d.temp.day.toFixed()}&#176;</p>
      </div>
    );
  });

  return (
    <Fade direction="up" duration={2000} delay={300} easing="ease-in-out">
      <div className="forecast-wrapper">
        <div className="heading">
          <h1>HOURLY FORECAST</h1> <hr />
        </div>

        {forecastData.hourly && <div className="forecast">{hour}</div>}

        <div className="heading">
          <h1>DAILY FORECAST</h1> <hr />
        </div>

        <div className="forecast">{day}</div>
      </div>
    </Fade>
  );
};

export default Forecast;
