type PopupProps = {
  song: Song | null;
  onClose: () => void;
}

const PopupDetails = ({ song, onClose }: PopupProps) => {
  if (!song) {
    return null;
  }

  return (
    <div className="popupOverlay" onClick={onClose}>
      <div className="popupContent" onClick={(e) => e.stopPropagation()}>
        <p className="songTitle">
            {song.title}
        </p>
        <p className="artists">
            Artist(s): {song.artists.join(', ')}
        </p>
        <p className="genres">
            Genre(s): {song.genres.join(', ')}
        </p>
        <p className="releaseYr">
            Release Year: {song.releaseYr}
        </p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PopupDetails;