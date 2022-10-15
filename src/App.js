import "./App.css";
import "./components/search/Search";
import Search from "./components/search/Search";
import { useState } from "react";
import Weather from "./components/weather/Weather";
import Forecast from "./components/forcast/Forcast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api/Api";
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])

      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log("err"));
  };
  console.log(currentWeather);
  console.log(forecast);
  return (
    <div className="App">
      <p className="theweather">the.weather</p>
      <div className="home"> 
      {currentWeather?<>
      <p className="temperature">{Math.round(currentWeather?.main.temp)}°</p>
      <p className="city">{currentWeather?.city}</p>
      <div>
      <img
      
      alt="weather"
      className="weather-icon"
      src={`icons/${currentWeather?.weather[0].icon}.png`}
    />
      <p className="weather-description">{currentWeather?.weather[0].description}</p>
      </div>
      </>:""}
      </div>
      <div className="right">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <Weather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      </div>
    </div>
    


 

  );
}

export default App;
