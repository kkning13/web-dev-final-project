import { useState } from "react";
import PopupDetails from "../components/PopupDetails";
import { SONGS } from "../constants/consts";
import SongCard from "./SongCard";
import "./styles.css";

const Playlist = () => {
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);

    return (
        <div>
            {SONGS.slice(0, 10).map((song) => (
                <SongCard 
                    song={song}
                    onClick={() => setSelectedSong(song)}
                />
            ))}
            <PopupDetails
                song={selectedSong} 
                onClose={() => setSelectedSong(null)} 
            />
        </div>
    );
};

export default Playlist;
