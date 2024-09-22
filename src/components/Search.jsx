import {IconSearch} from "@tabler/icons-react";
import React, {useState} from "react";
import Swal from "sweetalert2";

export default function Search({setCity, fetchWeather}) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a city name!",
      });
      return;
    }
      setCity(inputValue);
      fetchWeather(inputValue); // Fetch weather data
  };

  return (
    <div className="max-w-screen-2xl mx-auto flex justify-center mb-5 px-4 md:px-0">
      <form className="max-w-lg w-full " onSubmit={handleSearch}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <IconSearch color="white" />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-white border border-gray-600 rounded-lg bg-gray-700 focus:outline-none"
            placeholder="Search Location"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
