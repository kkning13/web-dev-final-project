import { useState } from "react";
import Dropdown from "../components/lib/Dropdown";
import SongCard from "../components/SongCard";
import { SONGS } from "../constants/consts"; 
import PopupDetails from "../components/PopupDetails"; 
import "./Search.css";
import "../components/styles.css"

const Search = () => {
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Song[]>([]);
    const [selectedFromDropdown, setSelectedFromDropdown] = useState<Song | null>(null);

    const handleSongSelection = (song: Song) => {
        setSelectedFromDropdown(song);
        setSearchResults([]);
    };

    const handleEnterSearch = (q: string) => {
        if (!q.trim()) return;

        const results = SONGS.filter((song) =>
            song.title.toLowerCase().includes(q.toLowerCase())
        );
        setSearchResults(results);
        setSelectedFromDropdown(null); 
        setSelectedSong(null); 
        setQuery("");
    };

    return (
        <div className="searchPage">
            <h1>Search for Songs</h1>

            <Dropdown 
                options={SONGS} 
                query={query}
                setQuery={setQuery}
                onChange={handleSongSelection} 
                onEnterSearch={handleEnterSearch}
            />

            <div className="searchResultsContainer">
                {selectedFromDropdown && (
                    <SongCard
                        song={selectedFromDropdown}
                        onClick={() => setSelectedSong(selectedFromDropdown)}
                    />
                )}
                {[...searchResults]
                    .sort((first, second) => first.title.localeCompare(second.title))
                    .slice(0, 10)
                    .map((song) => (
                        <SongCard 
                            song={song} 
                            onClick={() => setSelectedSong(song)}
                            showPlusButton={true}
                        />
                    ))
                }
            </div>

            <PopupDetails
                song={selectedSong} 
                onClose={() => setSelectedSong(null)} 
            />
        </div>
    );
};

export default Search;