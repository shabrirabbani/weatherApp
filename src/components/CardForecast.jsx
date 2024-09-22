import React from "react";

export default function CardForecast({forecastData}) {
  return (
    <div className="bg-gray-800 text-white rounded-2xl p-6 border border-slate-600">
      <h2 className="text-xl font-semibold mb-5">5 Day Forecast</h2>
      <div className="grid md:grid-cols-5 gap-4 max-h-64 overflow-y-scroll">
        {forecastData.map((day, index) => {
          const date = new Date(day.dt * 1000);
          const dayNameOptions = {weekday: "short"};
          const dayName = date.toLocaleDateString("en-US", dayNameOptions);

          // Format the date as DD/MM/YYYY
          const formattedDate = `${String(date.getDate()).padStart(
            2,
            "0"
          )}/${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )}/${date.getFullYear()}`;

          const temperature = Math.round(day.main.temp);
          const weatherIcon = day.weather[0].icon;

          // Display data every 8 hours
          if (index % 8 === 0) {
            return (
              <div
                key={day.dt}
                className="text-center bg-slate-500 rounded-2xl space-y-2 py-4 px-4 md:px-0 justify-between items-center flex md:flex-col">
                    <div className="text-start md:text-center">
                        <p>{dayName}</p>
                        <p className="text-sm">{formattedDate}</p>{" "}
                    </div>
                {/* Display the formatted date */}
                <div>
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                    alt={day.weather[0].description}
                  />
                </div>
                <p className="text-xl mt-2 font-semibold">{temperature}°C</p>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
