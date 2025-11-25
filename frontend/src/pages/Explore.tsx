import { useEffect, useState } from "react";
import SongMatrix from "../components/SongMatrix";
import { fetchAllSongs, 
    fetchPlaylist, 
    Song
} from "../utils";
import "./Explore.css";

function shuffleArray<T>(array: T[]): T[] {
    let i: number = array.length - 1;
    while (i > 0) {
        const j: number = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
        i--;
    }
    return array;
}

const ExplorePage = () => {
    const [songs, setSongs] = useState<Song[]>([]);

    useEffect(() => {
        const loadRandomSongs = async () => {
            try {
                const allSongs = await fetchAllSongs();

                const playlistSongs = await fetchPlaylist();
                const playlistSongsIds = new Set(playlistSongs.map((song) => song.id));

                const availableSongs = allSongs.filter(
                    (song) => !playlistSongsIds.has(song.id)
                );

                const songsToShuffle = [...availableSongs];
                const shuffled = shuffleArray(songsToShuffle);

                setSongs(shuffled.slice(0, 30));
            } catch (error) {
                console.error("Error loading explore page songs:", error);
            }
        };

        loadRandomSongs();
    }, []);

    return (
        <div>
            <h1>Randomly Generated 30 Songs</h1>
            <div>
                <SongMatrix songs={songs}/>
            </div>
        </div>
    );
};

export default ExplorePage;
