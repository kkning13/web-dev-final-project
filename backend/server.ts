// import path from "path";
import express, { Express } from "express";
import cors from "cors";
import { authenticate, AuthenticatedRequest } from "./middleware/authMiddleware";
// import { WeatherResponse } from "@full-stack/types";
// import fetch from "node-fetch";
import { 
    // initialaddAllSongs,
    fetchAllSongs,
    fetchSongById,
    fetchPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    updatePlaylistName,
    ensureUserExists, 
    fetchUser,
} from "./firebaseUtils";

const app: Express = express();

const hostname = "0.0.0.0";
const port = 8080;

app.use(cors());
app.use(express.json());

// route outlines

// temporary route to initially add all songs to database
// app.post("/initial-add-all-songs", async (req, res) => {
//     console.log("POST /initial-add-all-songs was called");
//     try {
//         const result = await initialaddAllSongs();
//         res.json(result);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Something went wrong" });
//     }
// });

// fetch all songs from database
app.get("/songs", async (req, res) => {
    // console.log("GET /songs was called");
    try {
        const songs = await fetchAllSongs();
        res.status(200).json(songs);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// fetch a song by ID
app.get("/songs/:id", async (req, res) => {
    // console.log("GET /songs/:id was called");
    try {
        const song = await fetchSongById(req.params.id);
        if (!song) {
            return res.status(404).json({ error: "Song not found" });
        }
        res.status(200).json(song);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.use(authenticate);

// fetch current user's playlist
app.get("/playlist", async (req: AuthenticatedRequest, res) => {
    // console.log("GET /playlist was called");
    try {
        const uid = req.uid!;
        await ensureUserExists(uid);
        const playlist = await fetchPlaylist(uid);
        res.status(200).json(playlist);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// add a song to the current user's playlist
app.post("/playlist/:songId", async (req: AuthenticatedRequest, res) => {
    // console.log("POST /playlist was called");
    try {
        const uid = req.uid!;
        const { songId } = req.params;
        await ensureUserExists(uid);
        await addSongToPlaylist(uid, songId);
        res.status(201).json({ message: `Successfully added ${songId} to ${uid}'s playlist` });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// fetch playlist name
app.get("/playlist/name", async (req: AuthenticatedRequest, res) => {
    try {
        const uid = req.uid!;
        const userDoc = await fetchUser(uid); 
        if (!userDoc) {
            console.error("User doc not found");
            throw new Error("User doc missing");
        }
        res.status(200).json({ playlistName: userDoc.playlistName });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// update the current user's playlist name
app.put("/playlist/name", async (req: AuthenticatedRequest, res) => {
    // console.log("PUT /playlist was called");
    try {
        const uid = req.uid!;
        const { newName } = req.body;
        await updatePlaylistName(uid, newName);
        res.status(200).json({ message: `Successfully updated ${uid}'s playlist name` });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// remove a song from the current user's playlist
app.delete("/playlist/:songId", async (req: AuthenticatedRequest, res) => {
    // console.log("DELETE /playlist/:songId was called");
    try {
        const uid = req.uid!;
        const { songId } = req.params;
        await removeSongFromPlaylist(uid, songId);
        res.status(200).json({ message: `Successfully deleted song ${songId} from ${uid}'s playlist` });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// ensure user exists
app.post("/users", async (req: AuthenticatedRequest, res) => {
    // console.log("POST /users was called");
    try {
        const uid = req.uid!;
        await ensureUserExists(uid);
        res.status(201).json({ message: `Successfully ensured user ${uid} exists` });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, hostname, () => {
    console.log("Listening");
});

// type WeatherData = {
//     latitude: number;
//     longitude: number;
//     timezone: string;
//     timezone_abbreviation: string;
//     current: {
//         time: string;
//         interval: number;
//         precipitation: number;
//     };
// };

// app.get("/weather", async (req, res) => {
//     console.log("GET /api/weather was called");
//     try {
//         const response = await fetch(
//             "https://api.open-meteo.com/v1/forecast?latitude=40.7411&longitude=73.9897&current=precipitation&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=America%2FNew_York&forecast_days=1"
//         );
//         const data = (await response.json()) as WeatherData;
//         const output: WeatherResponse = {
//             raining: data.current.precipitation > 0.5,
//         };
//         res.json(output);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Something went wrong" });
//     }
// });
