import { useEffect, useState } from "react";
import Playlist from "../components/Playlist";
import "./Home.css";
import { BACKEND_BASE_PATH } from "../constants/Navigation";

const HomePage = () => {
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        // example fetch
        fetch(`${BACKEND_BASE_PATH}/playlist`)
        .then(res => res.json())
        .then(data => {
            console.log(data); 
            setPlaylist(data);
        })
        .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Personal Playlist</h1>
            <div className="playlistLayout">
                <Playlist />
            </div>
        </div>
    );
};

export default HomePage;
