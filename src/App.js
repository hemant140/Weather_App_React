//  Name -  Hemant Singh 
//  Project - Assigment task
//  Description: This is an assignment project to get weather details of any city using openweather api and display
//  Date -  8/Aug/2023
//  Visit My PortFolio - https://hemant14.netlify.app/

import './App.css';
import React, { useEffect, useState } from 'react';
import cloudSunImage from './images/cloudy_1163661.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTint
} from '@fortawesome/free-solid-svg-icons';
const API_KEY = '602a3c09bad82e8f4265c87eb7b54734';

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="App">
      <div className="inputFormDiv">
        {loading && <div class="loader">Loading...</div>}

        <div className='heading'>
          {hidden && <p className='backIcon' onClick={backIcon}><i class="fas fa-arrow-left"></i></p>}
          {hidden ? <p className='headingName'>Weather App</p> : <p className='headingName'>Weather App</p>}
        </div>
        {error && <p className="error">{error}</p>}
        {hidden ?
          (weatherData && (
            <div className='weatherCrad'>
              <div className='weatherImg'><img src={cloudSunImage} alt="" /></div>
              <span className='temp'>{weatherData.main.temp.toFixed(0)} <span>°C</span></span>
              <p className='description'>{weatherData.weather[0].description}</p>
              <span className='location'><i class="fas fa-map-marker-alt" style={{ marginRight: "3px" }}></i>{weatherData.name}, {weatherData.sys.country}</span>
              <div className='footerCard'>
                <p><i class="fas fa-temperature-low"></i> {weatherData.main.feels_like.toFixed(0)}% °C <br />Feel Like</p>
                <p><FontAwesomeIcon icon={faTint} style={{ marginRight: "3px" }} />{weatherData.main.humidity}% <br /> Humidity</p>
              </div>
            </div>
          )
          ) : (
            < form className="weatherForm" onSubmit={handleSubmit}>
              <input required type="text" value={location} placeholder="Enter location" onChange={(e) => setLocation(e.target.value)} />
              <button type="submit">Get Device Location</button>
            </form>
          )
        }
      </div>
    </div >
  );
}

export default App;
