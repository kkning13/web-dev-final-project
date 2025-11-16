type SongCardProps = {
    song: Song;
    onClick: (song: Song) => void;
    showPlusButton?: boolean;
};

// a function essentially destructuring our object (take out song)
const SongCard = ({ song, onClick, showPlusButton }: SongCardProps) => {
    if (!song) {
        return null;
    }

    return (
        <div className="songCard" onClick={() => onClick(song)}>
            <p className="songTitle">
                {song.title}
            </p>
            <p className="artists">
                Artist(s): {song.artists.join(', ')}
            </p>

            {showPlusButton && (
                <button className="plusButton">+</button>
            )}
        </div>
    );
};

// expose to outside world/other files so they
// can have access
export default SongCard;