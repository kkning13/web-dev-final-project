import { useState } from "react";
import PopupDetails from "../components/PopupDetails";
import SongCard from "./SongCard";
import { 
    Song, 
    addSongToPlaylist, 
    removeSongFromPlaylist,
    fetchPlaylist 
} from "../utils"
import "./styles.css";

interface SongMatrixProps {
    songs: Song[];
}

const SongMatrix = ({ songs }: SongMatrixProps) => {
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);
    const [addedSongIds, setAddedSongIds] = useState<Set<string>>(new Set());

    const handleAddSongToPlaylist = async (songId: string) => {
        try {
            await addSongToPlaylist(songId);
            const updated = await fetchPlaylist();
            setAddedSongIds(new Set(updated.map(song => song.id)));
        } catch (error) {
            console.error("Error adding song to playlist from explore page:", error);
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
        <div className="songMatrix">
            {songs.map((song) => (
                <div className="matrixSongCard">
                    <SongCard 
                        song={song}
                        onClick={() => setSelectedSong(song)}
                        showPlusButton={true}
                        isInPlaylist={addedSongIds.has(song.id)}
                        onAddToPlaylist={handleAddSongToPlaylist}
                        onRemoveFromPlaylist={handleRemoveSongFromPlaylist}
                    />
                </div>
            ))}
            <PopupDetails
                song={selectedSong} 
                onClose={() => setSelectedSong(null)} 
            />
        </div>
    );
};

export default SongMatrix;
