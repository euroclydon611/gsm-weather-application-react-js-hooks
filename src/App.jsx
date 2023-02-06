import React, { useEffect, useState } from "react";
import {  Fade } from "react-awesome-reveal";
import Input from "./Component/Input";
import TimeAndLocation from "./Component/TimeAndLocation";
import TemperatureAndDetails from "./Component/TemperatureAndDetails";
import Forecast from "./Component/Forecast";
import { useGlobalContext } from "./Context/AppProvider";
import Footer from "./Component/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";


const App = () => {
  const { weatherData, forecastData, SearchWithLocationButton, temp } =
    useGlobalContext();


   
  

  return (
    <div className={temp <= 40 ?"app-wrapper normal":"app-wrapper hot"}>
      <Input />
      {weatherData.main ? (
        <>
          <Fade direction="up" duration={2000} delay={300} easing="ease-in-out">
            <TimeAndLocation />
            <TemperatureAndDetails />
          </Fade>
          {forecastData.hourly && forecastData.daily && <Forecast />}
          <Footer />
        </>
      ) : (
        <>
          <div className="search-for-location-container">
            <Fade
              direction="up"
              duration={2000}
              delay={300}
              easing="ease-in-out"
            >
              <button onClick={SearchWithLocationButton} className="info-text">
                Current location{" "}
                <FontAwesomeIcon className="icon" icon={faLocation}/>
              </button>
            </Fade>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
