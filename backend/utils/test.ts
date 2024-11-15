// Standalone test script
// TODO: Move to "tests" folder?
import { GDriveAPI } from "./GDriveAPI.ts";
import express from "express";
import cors from "npm:cors";
import { DatabaseAPI } from "../../db/database.ts";


const server = express();

server.use(cors());
server.use(express.json());

GDriveAPI.initalize();
await DatabaseAPI.initalize();

const API_KEY = "1efa1542-a765-6e60-ba9b-0f034b1cb693";

const url = GDriveAPI.generateDriveAuthURL();
console.log("Go here to authenticate with Google Drive:", url);

server.get("/", (req, res) => {
    console.log("Got authentication callback!");

    const code = req.query.code as string;

    GDriveAPI.updateUserAuth(API_KEY, code);

    res.send("okay");
});

server.listen(8000, () => console.log("Listening for authentication requests on port 8000"));