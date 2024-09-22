import {IconDropletHalf2Filled, IconEye, IconRipple, IconWind} from "@tabler/icons-react";
import React from "react";

export default function CardToday({weatherData}) {

  // Ambil data yang diperlukan dari weatherData
  const windSpeed = weatherData ? weatherData.wind.speed : null; // Kecepatan angin
  const humidity = weatherData ? weatherData.main.humidity : null; // Kelembapan
  const windDeg = weatherData ? weatherData.wind.deg : null; // Arah angin
  const sunrise = weatherData
    ? new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : ""; // Waktu terbit matahari
  const sunset = weatherData
    ? new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : ""; // Waktu terbenam matahari
  const visibility = weatherData ? weatherData.visibility / 1000 : null; // Visibilitas dalam km

// Fungsi untuk mendapatkan deskripsi kelembapan
  const getHumidityDescription = (humidity) => {
    if (humidity < 30) {
      return "Too low";
    } else if (humidity >= 30 && humidity <= 50) {
      return "Good";
    } else if (humidity > 50 && humidity <= 70) {
      return "High";
    } else {
      return "Very high";
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl text-white border border-slate-600">
      <div className="p-5">
        <p className="text-xl font-semibold pb-5">Today's Highlight</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {/* windstatus */}
          <div className="p-2 bg-slate-700 rounded-2xl text-end space-y-3 border border-slate-500">
            <div className="flex items-center justify-end">
              <IconWind className="text-slate-200" />
              <p className="text-sm font-light ps-2 text-slate-300">
                Wind Status
              </p>
            </div>
            <p className="text-2xl font-semibold">
              {windSpeed ? `${windSpeed.toFixed(1)} km/h` : "Loading..."}
            </p>
            <p className="font-light text-sm text-slate-300">{windDeg}°</p>
          </div>

          {/* Humidity */}
          <div className="p-2 bg-slate-700 rounded-2xl text-end space-y-3 border border-slate-500">
            <div className="flex items-center justify-end">
              <IconDropletHalf2Filled className="text-slate-200" />
              <p className="text-sm ps-2 font-light text-slate-300">Humidity</p>
            </div>
            <p className="text-2xl font-semibold">
              {humidity ? `${humidity}%` : "Loading..."}
            </p>
            <p className="font-light text-sm text-slate-300">
              {humidity ? getHumidityDescription(humidity) : "Loading..."}
            </p>
          </div>

          {/* Sunrise */}
          <div className="flex p-2 py-5 md:py-0 bg-slate-500 border border-slate-400 rounded-2xl col-span-2 justify-around items-center order-1 md:order-none">
            <img src="/weather/sunrise.svg" alt="" />
            <div>
              <p className="font-light text-sm">Sunrise</p>
              <p className="text-xl font-semibold">{sunrise || "Loading..."}</p>
            </div>
          </div>

          {/* Sea Level */}
          <div className="p-2 bg-slate-700 border border-slate-500 rounded-2xl text-end space-y-3">
            <div className="flex items-center justify-end">
              <IconRipple className="text-slate-200" />
              <p className="text-sm ps-2 text-slate-300">Sea Level</p>
            </div>
            <p className="text-2xl font-semibold">
              {weatherData && weatherData.main.sea_level !== undefined
                ? `${weatherData.main.sea_level} hPa`
                : "Loading..."}
            </p>
            <p className="font-light text-sm text-slate-300">
              Sea Level Pressure
            </p>
          </div>

          {/* Visibility */}
          <div className="p-2 bg-slate-700 border border-slate-500 rounded-2xl text-end space-y-3">
            <div className="flex items-center justify-end">
              <IconEye className="text-slate-200" />
              <p className="text-sm ps-2 text-slate-300">Visibility</p>
            </div>
            <p className="text-2xl font-semibold">
              {visibility ? `${visibility} km` : "Loading..."}
            </p>
          </div>

          {/* Sunset */}
          <div className="flex p-2 py-5 md:py-0 bg-slate-500 border border-slate-400 rounded-2xl col-span-2 justify-around items-center">
            <img src="/weather/sunset.svg" alt="" />
            <div>
              <p className="font-light text-sm">Sunset</p>
              <p className="text-xl font-semibold">{sunset || "Loading..."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
