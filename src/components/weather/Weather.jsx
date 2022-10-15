import React from "react";
import "./weather.css";

export default function Weather({ data }) {
  return (
    <div className="weather">
      <label className="title">Weather Details</label>

      <div className="details">
        <div className="parameter-row">
          <span className="parameter-label">Wind</span>
          <span className="parameter-value">{data.wind.speed} m/s</span>
        </div>
        <div className="parameter-row">
          <span className="parameter-label">Humidity</span>
          <span className="parameter-value">{data.main.humidity}%</span>
        </div>
        <div className="parameter-row">
          <span className="parameter-label">Pressure</span>
          <span className="parameter-value">{data.main.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
}
