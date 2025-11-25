type SongCardProps = {
    song: Song;
    onClick: (song: Song) => void;
    showPlusButton?: boolean;
    isInPlaylist?: boolean;
    onAddToPlaylist?: (songId: string) => void;
    onRemoveFromPlaylist?: (songId: string) => void;
};

// a function essentially destructuring our object (take out song)
const SongCard = ({ 
    song, 
    onClick, 
    showPlusButton, 
    isInPlaylist = false,
    onAddToPlaylist,
    onRemoveFromPlaylist, 
}: SongCardProps) => {
    if (!song) {
        return null;
    }

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // prevent card click
        if (isInPlaylist) {
            // e.stopPropagation(); // prevent card click
            onRemoveFromPlaylist?.(song.id);
        } else {
            // e.stopPropagation(); // prevent card click
            onAddToPlaylist?.(song.id);
        }
    };

    return (
        <div className="songCard" onClick={() => onClick(song)}>
            <p className="songTitle">
                {song.title}
            </p>
            <p className="artists">
                Artist(s): {song.artists.join(', ')}
            </p>

            {showPlusButton && (
                <button 
                    className="plusButton"
                    onClick={handleButtonClick}
                >
                    {isInPlaylist ? "-" : "+"}
                </button>
            )}
        </div>
    );
};

// expose to outside world/other files so they
// can have access
export default SongCard;