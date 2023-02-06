import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";


const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [location, setLocation] = useState("");
  const [temp, setTemp] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState({});
  const [latitude, setLatitude] = useState("8");
  const [longitude, setLongitude] = useState("-2");

  //openWeatherApi keys and urls
  const apikey = [API_KEY];//GET YOUR API KEY FROM OPENWEATHERAPI
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apikey}`;

  const secondApiKey = [ONECALL_API_KEY];//GET YOUR KEY FROM OPENWEATHERAPI
  const secondBaseUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,alerts&appid=${secondApiKey}&units=metric`;

  //function for the onChange event on the input (search) box
  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  //function to fetch weather data when the enter key is clicked
  const searchLocationWithEnter = (event) => {
    if (event.key === "Enter") {
      axios
        .get(baseUrl)
        .then((response) => {
          setWeatherData(response.data);
          setLatitude(response.data.coord.lat);
          setLongitude(response.data.coord.lon);
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });

      //clear the text box
      setLocation("");
    }
  };

  //function to fetch weather data when the search button is clicked
  const searchLocationWithSearchButton = () => {
    axios
      .get(baseUrl)
      .then((response) => {
        // console.log(response.data);
        setWeatherData(response.data);
        setLatitude(response.data.coord.lat);
        setLongitude(response.data.coord.lon);
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });

    //clear the search box
    setLocation("");
  };

  //fetch with the location button
  const SearchWithLocationButton = () => {
    console.log("location button clicked");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("latitude", position.coords.latitude);
        setLatitude(position.coords.latitude);
        console.log("Longitude", position.coords.longitude);
        setLongitude(position.coords.longitude);
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;

        console.log(lat, lon);

        axios
          .get(url)
          .then((res) => {
            console.log("location button fetch");
            // console.log(res.data);
            setWeatherData(res.data);
            setLatitude(res.data.coord.lat);
            setLongitude(res.data.coord.lon);
          })
          .catch((error) => {
            alert(error);
            console.log(error);
          });
      });
    }
  };

  //when the component first loads, it should make request to the open weather api with the curren navigator.geolocation
  useEffect(() => {
    if (Object.keys(weatherData).length != 0) {
      return;
    }
    console.log("effect run only once");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;

        axios
          .get(url)
          .then((res) => {
            console.log("location button fetch");
            setWeatherData(res.data);
            setLatitude(res.data.coord.lat);
            setLongitude(res.data.coord.lon);
          })
          .catch((error) => {
            alert(error);
            console.log(error);
          });
      });
    }

    return () => {
      console.log("Unmouted");
      return;
    };
  }, []);

  //side effect to reach the second api for the forecast weather data
  useEffect(() => {
    if (Object.keys(weatherData).length === 0) {
      console.log("empty");
      return;
    }
    axios
      .get(secondBaseUrl)
      .then((response) => {
        setForecastData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      console.log("unmounted");
    };
  }, [weatherData]);

  //side effect to get the temperature
  useEffect(() => {
    if (Object.keys(weatherData).length == 0) {
      return;
    }
    setTemp(weatherData.main.temp);
  });

  return (
    <AppContext.Provider
      value={{
        location,
        handleChange,
        searchLocationWithEnter,
        searchLocationWithSearchButton,
        SearchWithLocationButton,
        temp,
        weatherData,
        forecastData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
