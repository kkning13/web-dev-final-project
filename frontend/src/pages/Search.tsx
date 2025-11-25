import { useState, useEffect } from "react";
import Dropdown from "../components/lib/Dropdown";
import SongCard from "../components/SongCard";
import PopupDetails from "../components/PopupDetails"; 
import { 
    fetchAllSongs, 
    addSongToPlaylist, 
    removeSongFromPlaylist,
    fetchPlaylist 
} from "../utils";
import "./Search.css";
import "../components/styles.css"

const Search = () => {
    const [allSongs, setAllSongs] = useState<Song[]>([]);
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Song[]>([]);
    const [selectedFromDropdown, setSelectedFromDropdown] = useState<Song | null>(null);
    const [addedSongIds, setAddedSongIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        const loadSongs = async () => {
            try {
                const songs = await fetchAllSongs();
                setAllSongs(songs);
            } catch (error) {
                console.error("Error fetching all songs for search page:", error);
            }
        };

        loadSongs();
    }, []);

    useEffect(() => {
        const loadPlaylist = async () => {
            try {
                const playlist = await fetchPlaylist();
                setAddedSongIds(new Set(playlist.map((song) => song.id)));
            } catch (error) {
                console.error("Error fetching playlist:", error);
            }
        };

        loadPlaylist();
    }, []);

    const handleSongSelection = (song: Song) => {
        setSelectedFromDropdown(song);
        setSearchResults([]);
    };

    const handleEnterSearch = (q: string) => {
        if (!q.trim()) return;

        const results = allSongs.filter((song) =>
            song.title.toLowerCase().includes(q.toLowerCase())
        );
        setSearchResults(results);
        setSelectedFromDropdown(null); 
        setSelectedSong(null); 
        setQuery("");
    };

    const handleAddSongToPlaylist = async (songId: string) => {
        try {
            await addSongToPlaylist(songId);
            const updated = await fetchPlaylist();
            setAddedSongIds(new Set(updated.map(song => song.id)));
        } catch (error) {
            console.error("Error adding song to playlist from search page:", error);
            alert("Failed to add song to playlist");
        }
    };

    const handleRemoveSongFromPlaylist = async (songId: string) => {
        try {
            await removeSongFromPlaylist(songId);
            const updated = await fetchPlaylist();
            setAddedSongIds(new Set(updated.map(song => song.id)));
        } catch (error) {
            console.error("Error removing song from playlist:", error);
            alert("Failed to remove song from playlist");
        }
    };

    return (
        <div className="searchPage">
            <h1>Search for Songs</h1>

            <Dropdown 
                options={allSongs} 
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
                        showPlusButton={true}
                        isInPlaylist={addedSongIds.has(selectedFromDropdown.id)}
                        onAddToPlaylist={handleAddSongToPlaylist}
                        onRemoveFromPlaylist={handleRemoveSongFromPlaylist}
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
                            isInPlaylist={addedSongIds.has(song.id)}
                            onAddToPlaylist={handleAddSongToPlaylist}
                            onRemoveFromPlaylist={handleRemoveSongFromPlaylist}
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