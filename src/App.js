import axios from "axios";
import './App.css';
import { useEffect, useState } from "react";
// import weatherIcon from './img/pngwing.com.png';
import { getFormattedWeatherData } from "./weatherServices";
import  Descriptions  from "./Descriptions";




function App() {

  const [city, setCity] = useState("Jammu");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");    // imperial for fehrenhiet

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units)
      setWeather(data);
      // console.log( data);
    };

    fetchWeatherData();

  }, [units, city]);

  const enterKeyPressed = (e) => {
    if(e.keyCode === 13){
      setCity(e.currentTarget.value);
      // e.currentTarget.blur();
    }
  }


  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
    };

 

  const apiKey = "5fa957a6cbd2c5e398e28868eded2766";
  const [inputCity, setInputCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
    // const forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=5fa957a6cbd2c5e398e28868eded2766&units=metric  `;

    axios.all([axios.get(currentWeatherURL), axios.get(forecastURL)])
      .then(axios.spread((currentRes, forecastRes) => {
        console.log("Current Weather response", currentRes.data);
        console.log("Forecast response", forecastRes.data);
        setCurrentWeather(currentRes.data);
        setForecast(forecastRes.data.list);

      }))
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    // Fetch default city weather on initial load
    getWeatherDetails("Jammu");
  
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  

  
  return (
    <div className="w-[100%]  h-[100%] bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... ">
      <div className=" justify-center items-center flex flex-col font-bold ">
        <h1 className=" m-5 p-5 text-7xl font-extrabold  text-transparent bg-clip-text    bg-gradient-to-r from-orange-600 via-yellow-400 to-rose-400 ...">Weather App</h1>
        <h4 className=" text-4xl ">Enter Your City Name &#9759;</h4>
        <div className="text-2xl p-3 m-5 flex flex-col  ">

          <input
            type="text"
            className="p-1 mx-40 w-[50%] text-center text-black bg-gradient-to-r from-white to-rose-400 ..."
            // value={city}
            onKeyDown={enterKeyPressed}
            
            // onChange={handleChangeInput}

          />
          <div>
            <button
              className=" font-bold p-4 size-44 h-16 m-5 mx-20 rounded text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ..."
              type="button"
              // onClick={handleSearch}
              
            >
              Search
            </button>

            <button className="font-bold p-4 size-44 h-16 m-5 mx-20 rounded text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ..."
              type="button"
              onClick={ (e) => handleUnitsClick(e)}  
            >
              °FER
            </button>
          </div>
        </div>
      </div>

      <div className=" ">
        <div className=" ">
          {weather && (
            <div className=" ">
              <div className="flex flex-col items-center justify-between content-center p-4 font-bold gap-2 w-[50%] mx-96 text-3xl rounded-md bg-gradient-to-r from-pink-500 hover:to-yellow-500 ...  ">
                <div className=" flex flex-col justify-center items-center ">
                  <h3> {`${weather.name} , ${weather.country}`} </h3>
                  <img src={weather.iconURL} alt="weatherIcon" />
                  <h3 className=" capitalize"> {weather.description} </h3>
                </div>

                <div className="temerature">
                  <h1>
                      {`  ${weather.temp.toFixed()} 
                          °${units === "metric" ? "C" : "F"}
                      `}
                  </h1>
                </div>
              </div>
             

              <Descriptions weather={weather} units= {units} />

            </div>
          )}

        </div>

      </div>

      {/* Display forecast data */}
      {/* {forecast.length > 0 && ( */}
        <h2 className="text-5xl font-bold flex flex-row justify-center items-center ">6-Day Forecast</h2>
      <div className=" p-10  ">
        <div className="grid-cols-6 flex flex-row  space-x-7 > * + *	 ">
          {forecast.slice(0, 6).map((forecastItem, index) => (
            <div className=" items-center justify-between p-10 font-bold gap-10 w-60 text-2xl rounded-md bg-gradient-to-r from-pink-500 hover:to-yellow-500 ..." key={index}>
              <div className="flex flex-col justify-between items-start capitalize text-lg gap-1 ">
                <h6>{forecastItem.dt_txt}</h6>

                <p>Temp: {(forecastItem.main.temp - 273.15).toFixed()}°C</p>
                <p>Description: {forecastItem.weather[0].description}</p>
                <div className=" flex flex-col justify-center items-center ">
                  <h3> {`${weather.name} , ${weather.country}`} </h3>
                  <img src={weather.iconURL} alt="weatherIcon" />
                  <h3 className=" capitalize"> {weather.description} </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* )} */}



    </div>
  );
}

export default App;






{/* <img
              className=" mt-2 w-[100px] h-[100px]"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
              alt="Weather Icon"
            /> */}

{/* src="https://openweathermap.org/img/wn/02d@2x.png" */ }


{/* {Object.keys(currentWeather).length > 0 && (
        <div className="col-md-12 text-center mt-5 p-5 flex flexr">
          <div className="shadow rounded weatherResultBox">
           
          <h3> {`${weather.name}, ${weather.country}`} </h3>
            <img className=" mt-2 w-[100px] h-[100px]"
              src={weather.iconURL} 
              alt="Weather Icon"
              />
          <h3> {weather.description} </h3>

           


            <h5 className=" font-bold text-[24px] mb-[20px] ">{currentWeather?.name}</h5>

            <h6 className=" text-[36px] font-bold mb-[20px]  ">
              {(currentWeather?.main?.temp - 273.15).toFixed(2)}°C <i class="fa-solid fa-temperature-low"></i>
            </h6>
            <div className="resultBox">
              <h3 >
                Max Temp:{" "}
                {(currentWeather?.main?.temp_max - 273.15).toFixed(2)}°C <i class="fa-solid fa-temperature-arrow-up text-red-600	"  /> <br></br>Min
                Temp: {(currentWeather?.main?.temp_min - 273.15).toFixed(2)}°C <i class="fa-solid fa-temperature-arrow-down text-zinc-400"  />
              </h3>
              <h3 >Humidity: {currentWeather?.main?.humidity} % </h3>
              <h3>
                Wind Speed: {currentWeather?.wind?.speed} M/s <i class="fa-solid fa-flag-checkered" id="windspeed" /> <br></br>{" Direction: "}
                {getWindDirection(currentWeather?.wind?.deg)} <i class="fa-regular fa-compass" id="direction"></i>
              </h3>
              <h3>
                Description: {currentWeather?.weather[0]?.description ?? "N/A"}
              </h3>
            </div>
          </div>
        </div>
      )} */}
