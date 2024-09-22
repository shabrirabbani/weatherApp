import { useEffect, useState } from "react";
import CardForecast from "./components/CardForecast"
import CardNow from "./components/CardNow"
import CardOther from "./components/CardOther"
import CardToday from "./components/CardToday"
import Search from "./components/Search";
import { getWeatherByCity, getWeatherForecast } from "./services/weatherService";
import Swal from "sweetalert2";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {

  const [city, setCity] = useState("Jakarta");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil cuaca menggunakan weatherService.js
    const fetchWeather = async (city) => {
    setLoading(true);
    try {
      const data = await getWeatherByCity(city);
      setWeatherData(data);
      const forecast = await getWeatherForecast(data.coord.lat, data.coord.lon);
      setForecastData(forecast.list);
      setError(null);
    } catch (err) {
      // If city not found, show error alert
      Swal.fire({
        icon: "error",
        title: "City Not Found",
        text: "Please enter a valid city name!",
      });
      setError(err.message);
      setCity("Jakarta");
    } finally {
      setLoading(false);
    }
  };

  // useEffect untuk pengambilan data pertama kali
  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return (
    console.log(weatherData),
    (
      <>
        <div className="p-1 md:p-3 bg-gray-900 min-h-screen">
          <Navbar />
          <Search setCity={setCity} fetchWeather={fetchWeather} />
          {/* Cards */}
          <div className="flex flex-wrap justify-between max-w-screen-2xl mx-auto">
            {/* Card for Current Weather */}
            <div className="w-full lg:w-1/2 p-4">
              <CardNow weatherData={weatherData} error={error} />
            </div>

            {/* Today's Highlight */}
            <div className="w-full lg:w-1/2 p-4 mb-5 sm:mb-0">
              <CardToday weatherData={weatherData} />
            </div>

            {/* Other Countries */}
            <div className="w-full lg:w-1/2 p-4 -mt-6">
              <CardOther setCity={setCity} />
            </div>

            {/* 10 Day Forecast */}
            <div className="w-full lg:w-1/2 p-4">
              <CardForecast forecastData={forecastData} />
            </div>
            <div className="w-full">
              <Footer/>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default App
