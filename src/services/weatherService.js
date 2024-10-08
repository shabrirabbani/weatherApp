import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

// Fungsi untuk mengambil data cuaca berdasarkan kota
export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    return response.data; // Mengembalikan data cuaca
  } catch (error) {
    throw new Error("City not found"); // Mengirimkan error jika kota tidak ditemukan
  }
};

// Fungsi untuk mengambil data cuaca dari beberapa kota
export const getWeatherForCities = async (cities) => {
  const requests = cities.map((city) =>
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    ).then((response) => response.json()) // Mengubah response menjadi JSON
  );

  return Promise.all(requests); // Mengembalikan data cuaca dari beberapa kota
};

// Fungsi untuk mengambil data cuaca 10 hari ke depan
export const getWeatherForecast = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch forecast data");
  }
  return response.json();
};

