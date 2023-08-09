//  Name -  Hemant Singh 
//  Project - Assigment task
//  Description: This is an assignment project to get weather details of any city using openweather api and display
//  Date -  8/Aug/2023
//  Visit My PortFolio - https://hemant14.netlify.app/

import './App.css';
import React, { useState } from 'react';
import cloudSunImage from './images/sun_9361662.png'
import sunnyImage from './images/sun_4814268.png'
import cloudyImage from './images/clouds_414927.png'
import rainyImage from './images/rain_2469994.png'
import snowyImage from './images/snowy_1779887.png'
import errorImage from './images/error.png'
import FeelLike from './images/hot.png'
import humidity from './images/humidity.png'

const API_KEY = '602a3c09bad82e8f4265c87eb7b54734';

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const weatherCondition = weatherData && weatherData.weather[0].main;
  let weatherImageUrl;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHidden(true)
    if (!location) {
      setError('Please Enter a location.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        setError('Location not found. Please enter a valid location.');
        setWeatherData(null);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError('Error occurred. Please try again later.');
      setWeatherData(null);
      setLoading(false);
    }
  };

  const backIcon = () => {
    setHidden(false);
    setLocation("");
    setWeatherData(null);
    setError('');
  }

  if (weatherCondition === 'Clear') {
    weatherImageUrl = sunnyImage;
  } else if (weatherCondition === 'Clouds') {
    weatherImageUrl = cloudyImage;
  } else if (weatherCondition === 'Rain') {
    weatherImageUrl = rainyImage;
  } else if (weatherCondition === 'Snow') {
    weatherImageUrl = snowyImage;
  } else {
    weatherImageUrl = cloudSunImage;
  }

  // console.log(weatherData)

  return (
    <div className="App">
      <div className="inputFormDiv">
        <div className='heading'>
          {hidden && <p className='backIcon' onClick={backIcon}><i class="fas fa-arrow-left "></i></p>}
          {hidden ? <p className='headingName'>Weather App</p> : <p className='headingName'>Weather App</p>}
        </div>
        {error &&
          <div className="error">
            <div>
              <img src={errorImage} alt="" />
            </div>
            <p >{error}</p>
            <button onClick={backIcon} className='backButton'><i class="fas fa-arrow-left arrowIcon"></i> Back</button>
          </div>
        }
        {loading && <div class="loaderDiv"></div>}
        {hidden ?
          (weatherData && (
            <div className='weatherCrad'>
              <div className='weatherImg'><img src={weatherImageUrl} alt="" /></div>
              <span className='temp'>{weatherData.main.temp.toFixed(0)} <span>°C</span></span>
              <p className='description'>{weatherData.weather[0].description}</p>
              <span className='location'><i class="fas fa-map-marker-alt" style={{ marginRight: "5px" }}></i>{weatherData.name}, {weatherData.sys.country}</span>
              <div className='footerCard'>
                <div class="footer-text-1">
                  <div class="icon-f-1"><img src={FeelLike} alt="" width="30" height="30" /></div>
                  <div class="icon-f-2">
                    <span class="c-17">{weatherData.main.feels_like.toFixed(0)} °C</span>
                    <span class="feel-like">Feel like</span>
                  </div>
                </div>
                <div class="footer-text-2">
                  <div class="icon-f-1"><img src={humidity} alt="" width="30" height="30" /></div>
                  <div class="icon-f-2">
                    <span class="c-17">{weatherData.main.humidity}%</span>
                    <span class="feel-like">Humidity</span>
                  </div>
                </div>
              </div>
            </div>
          )
          ) : (
            <form className="weatherForm" onSubmit={handleSubmit}>
              <input required type="text" value={location} placeholder="Enter location" onChange={(e) => setLocation(e.target.value)} />
              <div class="form-control">
                <div class="line-1"></div>
                <div class="line-text"><p>Or</p></div>
                <div class="line-2"></div>
              </div>
              <button type="submit">Get Device Location</button>
            </form>
          )
        }
      </div>
    </div >
  );
}

export default App;
