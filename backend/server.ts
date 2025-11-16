// import path from "path";
import express, { Express } from "express";
import cors from "cors";
// import { WeatherResponse } from "@full-stack/types";
// import fetch from "node-fetch";

const app: Express = express();

const hostname = "0.0.0.0";
const port = 8080;

app.use(cors());
app.use(express.json());

// route outlines

// fetch all songs from database
app.get("/songs", async (req, res) => {
    // TODO: return list of all songs
    console.log("GET /songs was called");
    try {
        res.json({ message: "GET all songs" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// fetch a song by ID (still figuring out if I need this)
app.get("/songs/:id", async (req, res) => {
    // TODO: return a song by ID
    console.log("GET /songs/:id was called");
    try {
        res.json({ message: `GET song ${req.params.id}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// fetch all songs in the current user's playlist
app.get("/playlist", async (req, res) => {
    // TODO: Retrieve songs in the current user's playlist
    console.log("GET /playlist was called");
    try {
        res.json({ message: "GET current user's playlist" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// add a song to the current user's playlist
app.post("/playlist", async (req, res) => {
    // TODO: Add a song to the user's playlist from request body
    console.log("POST /playlist was called");
    try {
        res.json({ message: "POST add song to playlist" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// update the current user's playlist name
app.put("/playlist", async (req, res) => {
    // TODO: Update the playlist name for the current user
    console.log("PUT /playlist was called");
    try {
        res.json({ message: "PUT update playlist name" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// remove a song from the current user's playlist
app.delete("/playlist/:songId", async (req, res) => {
    // TODO: Remove a song from the playlist
    console.log("DELETE /playlist/:songId was called");
    try {
        res.json({ message: `DELETE song ${req.params.songId} from playlist` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// register a new user
app.post("/users", async (req, res) => {
    // TODO: save new user from request body
    console.log("POST /users was called");
    try {
        res.json({ message: "POST new user" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
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
