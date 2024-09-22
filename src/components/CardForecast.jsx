import React from "react";

export default function CardForecast({forecastData}) {
  return (
    <div className="bg-gray-800 text-white rounded-2xl p-6 border border-slate-600">
      <h2 className="text-xl font-semibold mb-5">5 Day Forecast</h2>
        {/* Menampilkan forecast data */}
      <div className="grid md:grid-cols-5 gap-4 max-h-64 overflow-y-scroll">
        {forecastData.map((day, index) => {
          const date = new Date(day.dt * 1000); // Mengubah timestamp menjadi Date object, * 1000 karena timestamp dalam satuan detik
          const dayNameOptions = {weekday: "short"}; // Format nama hari menjadi singkat (3 huruf)
          const dayName = date.toLocaleDateString("en-US", dayNameOptions); // Mengambil nama hari 

          // Format tanggal menjadi dd/mm/yyyy
          const formattedDate = `${String(date.getDate()).padStart(2,"0")} 
                               / ${String(date.getMonth() + 1).padStart(2,"0")}
                               / ${date.getFullYear()}`;

          const temperature = Math.round(day.main.temp); // Ambil suhu dalam celcius 
          const weatherIcon = day.weather[0].icon; // Ambil icon cuaca

          // Jika index adalah kelipatan 8, tampilkan data cuaca karena data cuaca hanya tersedia setiap 3 jam
          if (index % 8 === 0) {
            return (
              <div
                key={day.dt}
                className="text-center bg-slate-500 rounded-2xl space-y-2 py-4 px-4 md:px-0 justify-between items-center flex md:flex-col">
                    {/* Menampilkan nama hari dan tanggal */}
                    <div className="text-start md:text-center">
                        <p>{dayName}</p>
                        <p className="text-sm">{formattedDate}</p>{" "}
                    </div>
                <div>
                    {/* Menampilkan icon cuaca */}
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                    alt={day.weather[0].description}
                  />
                </div>
                {/* Menampilkan suhu */}
                <p className="text-xl mt-2 font-semibold">{temperature}°C</p>
              </div>
            );
          }
          return null; // Jika bukan kelipatan 8, return null
        })}
      </div>
    </div>
  );
}
