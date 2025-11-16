// import { useState } from "react";

/*
 * Treat this as a library component. Often times, you don't want to code basic components from
 * scratch, but rather rely on a pre-built library.
 */

type DropdownProps = {
  options: Song[];
  query: string;
  setQuery: (value: string) => void;
  onChange: (value: Song) => void;
  onEnterSearch: (query: string) => void;
};

const getSongTitle = (song: Song) =>
    `${song.title}`;

/**
 * A dropdown menu.
 * @param options The list of courses that can be selected.
 * @param onChange A callback function to be called whenever a course is selected.
 */
const Dropdown = ({ options, query, setQuery, onChange, onEnterSearch }: DropdownProps) => {
  const handleOptionClick = (value: Song) => {
    setQuery("");
    onChange(value);
  };

  const searchOptions = options
    .filter((option) =>
        getSongTitle(option)
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()))
    .slice() // makes a copy
    .sort((first, second) => first.title.localeCompare(second.title));

  return (
    <div className="dropdown">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="songSearchBar"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // stop default behavior
            onEnterSearch(query); // handle Enter search in parent
          }
        }}
      />
      {query.length >= 2 && (
        <div className="dropdownMenu">
          {searchOptions.map((option) => (
            <p
              className="dropdownOption"
              onClick={() => handleOptionClick(option)}
            >
              {getSongTitle(option)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
export default Dropdown;
