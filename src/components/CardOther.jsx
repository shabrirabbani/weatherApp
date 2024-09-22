import {useEffect, useState} from "react";
import {getWeatherForCities} from "../services/weatherService";

export default function CardOther({setCity}) {
  const [otherCities, setOtherCities] = useState([]); 

  // Fungsi untuk mengambil data cuaca dari kota-kota lain
  const fetchOtherCitiesWeather = async () => {
    const cities = ["Canberra", "New York", "Tokyo", "London", "Paris"];
    try {
      const weatherData = await getWeatherForCities(cities); // Mengambil data cuaca
      setOtherCities(weatherData);
    } catch (error) {
      console.error("Error fetching weather data for other cities:", error);
    }
  };

  // useEffect untuk pengambilan data pertama kali
  useEffect(() => {
    fetchOtherCitiesWeather(); 
  }, []);

  return (
    <div className="bg-gray-800 rounded-2xl p-5 text-white border border-slate-600">

      <div className="flex justify-between">
        <p className="text-xl font-semibold pb-5">Other Countries</p>
      </div>

        {/* List untuk menampilkan kota*/}
      <div className="max-h-64 overflow-y-scroll">
        {otherCities.map((city, index) => (
          <div
            key={index}
            className="flex justify-between p-5 bg-slate-600 hover:bg-slate-400 rounded-xl items-center mt-2 cursor-pointer"
            onClick={() => setCity(city.name)}
          >
            {/* Menampilkan nama kota, negara, deskripsi cuaca, icon cuaca, dan suhu */}
            <div>
              <p className="font-light text-sm">{city.sys.country}</p>
              <p className="text-2xl">{city.name}</p>
              <p className="font-light text-sm">{city.weather[0].description}</p>
            </div>
            <div>
              <img
                src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                alt={`${city.name} weather`}
                className="w-16 h-16"
              />
            </div>
            <div>
              <p className="text-xl font-semibold">
                {Math.round(city.main.temp)}°C
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
