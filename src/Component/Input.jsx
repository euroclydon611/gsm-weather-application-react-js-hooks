import React from "react";
import { useGlobalContext } from "../Context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";

const Input = () => {
  const {
    location,
    handleChange,
    searchLocationWithEnter,
    searchLocationWithSearchButton,
    SearchWithLocationButton,
  } = useGlobalContext();

  return (
    <div className="input-wrapper">
      <div>
        <input
          type="search"
          value={location}
          onKeyPress={searchLocationWithEnter}
          name="location"
          onChange={handleChange}
          placeholder="Search for city..."
        />
      </div>
      <div>
        <button className="search-btn" onClick={searchLocationWithSearchButton}>
          <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
        </button>
      </div>
      <div>
        <FontAwesomeIcon
          className="icon"
          icon={faLocation}
          onClick={SearchWithLocationButton}
        />
      </div>
    </div>
  );
};

export default Input;
