import { useState } from "react";
import PopupDetails from "../components/PopupDetails";
import { SONGS } from "../constants/consts";
import SongCard from "./SongCard";
import "./styles.css";

const SongMatrix = () => {
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);

    const [randomSongs, setRandomSongs] = useState<Song[]>(() => {
        const arr: Song[] = [];
        const selectedIndices = new Set<number>();

        while (arr.length < 30) {
            const index = Math.floor(Math.random() * SONGS.length);
            if (!selectedIndices.has(index)) {
                selectedIndices.add(index);
                arr.push(SONGS[index]);
            }
        }

        return arr;
    });

    return (
        <div className="songMatrix">
            {randomSongs.map((song) => (
                <div className="matrixSongCard">
                    <SongCard 
                        song={song}
                        onClick={() => setSelectedSong(song)}
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
