import React from "react";
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api/Api";
import './search.css'

export default function Search({ onSearchChange }) {
  const [search, setSeatch] = useState("");

  const handleOnChange = (searchData) => {
    setSeatch(searchData);
    onSearchChange(searchData);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,

      backgroundColor: "rgba(0, 0, 0, 0.614)",
      height: "15px",
      color: state.isSelected ? "black" : "white",
      padding: 20,
    }),

    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 250,
      color: "white",
      borderBottom: "1px solid white",
      //   borderButtom:"30px"
    }),
  };

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  return (
    <AsyncPaginate
      className="input"
      placeholder="Search location"
      debounceTimeout={600}
      value={search}
      styles={customStyles}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
}
