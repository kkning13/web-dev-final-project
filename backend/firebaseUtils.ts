/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "./firebase";
import admin from "firebase-admin";
import { Song } from "./types";

// Get all songs
export const fetchAllSongs = async (): Promise<
  {
    id: string;
    artists: string[];
    genres: string[];
    releaseYr: number;
    title: string;
  }[]
> => {
  try {
    const docRef = await db.collection("songs").get();

    return docRef.docs.map(doc => ({
      id: doc.id,
      artists: doc.data().artists,
      genres: doc.data().genres,
      releaseYr: doc.data().releaseYr,
      title: doc.data().title,
    }));
  } catch (e) {
    console.error("Error fetching songs:", e);
    return [];
  }
};

// Get song by ID
export const fetchSongById = async (id: string): Promise<
{
  id: string;
  artists: string[];
  genres: string[];
  releaseYr: number;
  title: string;
} | null
> => {
  try {
    const docRef = db.collection("songs").doc(id);
    const snapshot = await docRef.get();

    if(!snapshot.exists) {
      return null;
    }

    return {
      id: snapshot.id,
      artists: snapshot.data()?.artists,
      genres: snapshot.data()?.genres,
      releaseYr: snapshot.data()?.releaseYr,
      title: snapshot.data()?.title,
    };
  } catch (e) {
    console.error("Error fetching song by ID:", e);
    return null;
  }
}

// Ensure user exists
export const ensureUserExists = async (userId: string): Promise<boolean> => {
  try {
    const userRef = db.collection("users").doc(userId);
    const snapshot = await userRef.get();

    if(!snapshot.exists) {
      await userRef.set({
        userId,
        playlistName: "My Playlist",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    return true;
  } catch (e) {
    console.error("Error ensuring user exists:", e);
    return false;
  }
}

// Get user's playlist
export const fetchPlaylist = async (userId: string): Promise<Song[]> => {
  try {
    const playlistRef = db.collection(`users/${userId}/playlist`);
    const playlistSnapshot = await playlistRef.get();

    const songs: Song[] = [];

    for (const doc of playlistSnapshot.docs) {
      const songId = doc.id;
      const songDoc = await db.collection("songs").doc(songId).get();
      if (songDoc.exists) {
        songs.push({
          ...songDoc.data(),
          id: songDoc.id,
          addedAt: doc.data().addedAt || null,
        } as Song);
      }
    }

    return songs;
  } catch (e) {
    console.error("Error fetching user playlist:", e);
    return [];
  }
}

// Add song to user's playlist
export const addSongToPlaylist = async (
  userId: string,
  songId: string
): Promise<boolean> => {
  try {
    const songRef = db.collection("users").doc(userId).collection("playlist").doc(songId);

    await songRef.set({
      addedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return true;
  } catch (e) {
    console.error("Error adding song to playlist:", e);
    return false;
  }
}

// Remove song from user's playlist
export const removeSongFromPlaylist = async (
  userId: string,
  songId: string
): Promise<boolean> => {
  try {
    const songRef = db.collection("users").doc(userId).collection("playlist").doc(songId);

    await songRef.delete();

    return true;
  } catch (e) {
    console.error("Error removing song from playlist:", e);
    return false;
  }
}

// update user's playlist name
export const updatePlaylistName = async (
  userId: string,
  newName: string
): Promise<boolean> => {
  try {
    const userRef = db.collection("users").doc(userId);

    await userRef.update({
      playlistName: newName,
    });

    return true;
  } catch (e) {
    console.error("Error updating playlist name:", e);
    return false;
  }
}

// export const initialaddAllSongs = async (): Promise<{
//   id: string | null; // last inserted song's ID
//   addedCount: number;
// }> => {
//   try {
//     const songsCollection = collection(db, "songs");

//     let count: number = 0;
//     let lastInsertedId: string | null = null;

//     for (const song of SONGS) {
//       const docRef = await addDoc(songsCollection, song);
//       lastInsertedId = docRef.id;
//       count++;
//     }
//     return {
//       id: lastInsertedId,
//       addedCount: count,
//     };
//   } catch (e) {
//     console.error("Error adding all songs", e);
//     return {
//       id: null,
//       addedCount: 0,
//     }
//   }
// }