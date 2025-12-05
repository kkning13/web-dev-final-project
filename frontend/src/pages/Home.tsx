import { useEffect, useState } from "react";
import Playlist from "../components/Playlist";
import { 
    fetchPlaylist, 
    addSongToPlaylist, 
    removeSongFromPlaylist, 
    fetchPlaylistName,
    updatePlaylistName,
    Song,
    ensureUserExists 
} from "../utils";
import "./Home.css";

const HomePage = () => {
    const [playlist, setPlaylist] = useState<Song[]>([]);
    const [playlistName, setPlaylistName] = useState<string>("");
    const [editing, setEditing] = useState<boolean>(false);

    useEffect(() => {
        const loadPlaylist = async () => {
            await ensureUserExists();
            // const playlistData = await fetchPlaylist();
            const [name, playlistData] = await Promise.all([
                fetchPlaylistName(),
                fetchPlaylist()
            ]);
            setPlaylistName(name ?? "Personal Playlist");
            setPlaylist(playlistData);
        };

        loadPlaylist();
    }, []);

    const handleRename = async () => {
        try {
            await updatePlaylistName(playlistName);
            setEditing(false);
        } catch (error) {
            console.error("Error renaming playlist:", error);
        }
    };

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
            {/* <h1>Personal Playlist</h1> */}
            <div className="playlistNameWrapper">
                {editing ? (
                    <div className="editRow">
                        <input
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            autoFocus
                        />
                        <button onClick={handleRename}>Save</button>
                        <button onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                ) : (
                    <h1 onClick={() => setEditing(true)} className="editableTitle">
                        {playlistName}
                    </h1>
                )}
            </div>

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
