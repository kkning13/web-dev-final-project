import axios from "axios";
import { getAuth } from "firebase/auth";

const API_BASE_URL = "http://localhost:8080";

export interface Song {
  id: string;
  title: string;
  artists: string[];
  genres: string[];
  releaseYr: number;
  addedAt?: any;
}

/** Get Firebase ID token */
const getAuthHeaders = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return {};

  const token = await user.getIdToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/** Fetch all songs */
export const fetchAllSongs = async (): Promise<Song[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/songs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all songs:", error);
    return [];
  }
};

/** Fetch a song by ID */
export const fetchSongById = async (songId: string): Promise<Song | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/songs/${songId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching song by ID:", error);
    return null;
  }
};

/** Fetch the current user's playlist */
export const fetchPlaylist = async (): Promise<Song[]> => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}/playlist`, headers);
    return response.data;
  } catch (error) {
    console.error("Error fetching playlist:", error);
    return [];
  }
};

/** Add a song to user's playlist */
export const addSongToPlaylist = async (songId: string): Promise<boolean> => {
  try {
    const headers = await getAuthHeaders();
    await axios.post(`${API_BASE_URL}/playlist/${songId}`, {}, headers);
    return true;
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    return false;
  }
};

/** Remove a song from user's playlist */
export const removeSongFromPlaylist = async (songId: string): Promise<boolean> => {
  try {
    const headers = await getAuthHeaders();
    await axios.delete(`${API_BASE_URL}/playlist/${songId}`, headers);
    return true;
  } catch (error) {
    console.error("Error removing song from playlist:", error);
    return false;
  }
};

/** Update user's playlist name */
export const updatePlaylistName = async (newName: string): Promise<boolean> => {
  try {
    const headers = await getAuthHeaders();
    await axios.put(
      `${API_BASE_URL}/playlist`,
      { newName },
      headers
    );
    return true;
  } catch (error) {
    console.error("Error updating playlist name:", error);
    return false;
  }
};

/** Ensure user exists in database */
export const ensureUserExists = async (): Promise<boolean> => {
  try {
    const headers = await getAuthHeaders();
    await axios.post(`${API_BASE_URL}/users`, null, headers);
    return true;
  } catch (error) {
    console.error("Error ensuring user exists:", error);
    return false;
  }
};