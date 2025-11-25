import { useEffect, useState } from "react";
import Playlist from "../components/Playlist";
import { 
    fetchPlaylist, 
    addSongToPlaylist, 
    removeSongFromPlaylist, 
    Song,
    ensureUserExists 
} from "../utils";
import "./Home.css";

const HomePage = () => {
    const [playlist, setPlaylist] = useState<Song[]>([]);

    useEffect(() => {
        const loadPlaylist = async () => {
            await ensureUserExists();
            const playlistData = await fetchPlaylist();
            setPlaylist(playlistData);
        };

        loadPlaylist();
    }, []);

    const handleAddSong = async (songId: string) => {
        try {
            await addSongToPlaylist(songId);
            setPlaylist(await fetchPlaylist());
        } catch (error) {
            console.error("Error adding song:", error);
        }
    };

    const handleRemoveSong = async (songId: string) => {
        try {
            await removeSongFromPlaylist(songId);
            setPlaylist(await fetchPlaylist());
        } catch (error) {
            console.error("Error removing song:", error);
        }
    };

    return (
        <div>
            <h1>Personal Playlist</h1>
            <div className="playlistLayout">
                <Playlist 
                    songs={playlist}
                    onAddSong={handleAddSong}
                    onRemoveSong={handleRemoveSong}
                />
            </div>
        </div>
    );
};

export default HomePage;
