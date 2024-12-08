import { useState, useEffect } from "react";
import styles from "./Search.module.scss";
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";

export const Search = ({ onSearch, initialValue = "" }) => {
  const [searchValue, setSearchValue] = useState(initialValue);

  useEffect(() => {
    setSearchValue(initialValue);
  }, [initialValue]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    updateQueryParams(value);
    if (value.trim() === "") {
      onSearch("");
    }
  };

  const clearInput = () => {
    setSearchValue("");
    updateQueryParams("");
    onSearch("");
  };

  const handleSearch = () => {
    onSearch(searchValue.trim());
    updateQueryParams(searchValue.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const updateQueryParams = (value) => {
    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  return (
    <div className={styles.search}>
      <CiSearch className={styles.icon} />
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Найти"
        className={styles.input}
      />
      {searchValue && (
        <button className={styles.clearButton} onClick={clearInput}>
          <IoIosClose />
        </button>
      )}
    </div>
  );
};
