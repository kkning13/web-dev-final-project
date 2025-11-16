import SongMatrix from "../components/SongMatrix";
import "./Explore.css";

const ExplorePage = () => {
    return (
        <div>
            <h1>Randomly Generated 30 Songs</h1>
            <div>
                <SongMatrix />
            </div>
        </div>
    );
};

export default ExplorePage;
