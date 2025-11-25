import { useState } from "react";
import PopupDetails from "../components/PopupDetails";
import { Song } from "../utils";
import SongCard from "./SongCard";
import "./styles.css";

interface PlaylistProps {
    songs: Song[];
    onAddSong: (songId: string) => void;
    onRemoveSong: (songId: string) => void;
}

const Playlist = ({ songs, onAddSong, onRemoveSong }: PlaylistProps) => {
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);

    return (
        <div>
            {songs.slice(0, 10).map((song) => (
                <SongCard 
                    song={song}
                    onClick={() => setSelectedSong(song)}
                    showPlusButton={true} 
                    isInPlaylist={true}
                    onAddToPlaylist={onAddSong}
                    onRemoveFromPlaylist={onRemoveSong}
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
