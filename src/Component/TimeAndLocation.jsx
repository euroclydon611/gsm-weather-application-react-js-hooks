import React from "react";
import { useGlobalContext } from "../Context/AppProvider";
import { DateTime } from "luxon";

const TimeAndLocation = () => {
  const { weatherData, forecastData } = useGlobalContext();

  const location = weatherData.name;
  const country = weatherData.sys.country;
  const timeZone = forecastData.timezone;
  const dateTime = weatherData.dt;

  //time and date format using luxon
  const formattedDateTime = () => {
    return DateTime.fromSeconds(parseInt(dateTime))
      .setZone(timeZone)
      .toFormat("cccc, dd LLL yyyy' Local time: 'hh:mm a");
  };

  return (
    <div className="time-location">
      <p className="time-and-date">{formattedDateTime()}</p>
      <h1 className="location">
        {location}({country})
      </h1>
    </div>
  );
};

export default TimeAndLocation;
