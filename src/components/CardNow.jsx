import { IconMapPin } from '@tabler/icons-react';
import React, { useState } from 'react';

export default function CardNow({ weatherData, error }) {
  const [unit, setUnit] = useState("C"); // State untuk melacak unit suhu

  // Fungsi untuk mengubah suhu dari Celsius ke Fahrenheit
  const convertTemp = (tempCelsius) => {
    if (unit === "F") {
      return (tempCelsius * 9/5) + 32; // Konversi ke Fahrenheit
    }
    return tempCelsius; // Tetap Celsius jika unit adalah "C"
  };

  const getCurrentDate = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date();
    const day = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}, ${dayOfMonth} ${month}, ${year}`;
  };

  return (
    <div className="bg-gray-800 p-5 rounded-2xl text-white border border-slate-600">
      <div className="flex justify-between">
        
        <div className="flex p-2 bg-slate-300 rounded-xl text-black">
          <IconMapPin size={24} />
          {/* Menampilkan Nama Kota dan Negara */}
          <p>
            {weatherData
              ? `${weatherData.name}, ${weatherData.sys.country}`
              : "Loading..."}
          </p>
        </div>
        
        <div>
          {/* Dropdown untuk memilih unit Celsius atau Fahrenheit */}
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)} // Ubah state unit saat dropdown berubah
            className="p-2 bg-slate-300 rounded-xl outline-none text-black">
            <option value="C">°C</option>
            <option value="F">°F</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between mt-7">
        <div className="w-1/2">
          {/* Menampilkan Hari dan Tanggal */}
          <p className="text-4xl font-semibold">
            {getCurrentDate().split(",")[0]}
          </p>
          <p className="font-light text-sm">{getCurrentDate()}</p>
        </div>
        <div className="w-3/4 flex justify-end items-center md:justify-center">
          {/* Menampilkan Ikon Cuaca */}
          <p className="">
            {weatherData
              ? (() => {
                  const mainWeather = weatherData.weather[0].main;
                  let weatherIcon;
                  switch (mainWeather) {
                    case "Clear":
                      weatherIcon = "/weather/clear.svg";
                      break;
                    case "Clouds":
                      weatherIcon = "/weather/clouds.svg";
                      break;
                    case "Rain":
                      weatherIcon = "/weather/rain.svg";
                      break;
                    case "Thunderstorm":
                      weatherIcon = "/weather/thunderstorm.svg";
                      break;
                    case "Drizzle":
                      weatherIcon = "/weather/rain.svg";
                      break;
                    case "Snow":
                      weatherIcon = "/weather/snowy.svg";
                      break;
                    case "Haze":
                    case "Mist":
                    case "Fog":
                      weatherIcon = "/weather/haze.svg";
                      break;
                    default:
                      weatherIcon = "/weather/clear.png";
                      break;
                  }
                  return (
                    <img
                      src={weatherIcon}
                      alt={mainWeather}
                      className="w-24 h-24 translate-x-16 md:w-56 md:h-56 md:translate-x-0 md:-mt-4 -mt-0"
                    />
                  );
                })()
              : "Loading..."}
          </p>
        </div>
        <div className="w-1/2 md:text-end">
          {/* Menampilkan Suhu berdasarkan unit */}
          <p className="text-2xl font-semibold md:text-4xl md:mb-12 md:mt-10 mt-0 mb-0">
            {weatherData
              ? `${convertTemp(weatherData.main.temp).toFixed(1)}°${unit}`
              : "Loading..."}
          </p>
          <div className="font-light text-sm text-start md:text-end md:text-lg text-slate-300">
            {/* Menampilkan Deskripsi Cuaca dan Feels Like */}
            <p>
              {weatherData ? weatherData.weather[0].description : "Loading..."}
            </p>
            <p>
              {weatherData
                ? `Feels like ${convertTemp(
                    weatherData.main.feels_like
                  ).toFixed(1)}°${unit}`
                : "Loading..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
