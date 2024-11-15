/*
import * as responses from "./responses.ts";
import { API_ROUTE, AUTH_ROUTE } from "./router.ts";
import { CorsEnabledResponse } from "../@types/CorsEnabledResponse.ts";
import { CustomGlobalInterface } from "../@types/global.ts";
import { Application, Router } from "@oak/oak";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import process from "node:process";
import dotenv from "npm:dotenv";

// Route handlers
import authenticate from "./routes/authenticate.ts"; // /api/auth
import { DatabaseInstance } from "../db/index.ts";

// === BACKEND ENTRY POINT ===
// TODO: Move this into a startup script in a seperate file?
dotenv.config();

const database = new DatabaseInstance();
await database.init();

const app = new Application();
const port = Number.parseInt(process.env.BACKEND_SERVER_PORT);

const router = new Router();

app.use(await oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
// === END ENTRY POINT ===

router.post("/api/auth", async (context) => {
    const req = context.request;
    const res = context.response;
    const data = await req.body.json();
    console.log(data);
});


app.addEventListener('listen', () => {
    console.log(
        "HTTP server online @ port",
        port
    );
});

app.listen({ port });
*/

import express from "npm:express";
import cors from "npm:cors";
import authenticate from "./routes/authenticate.ts";
import dotenv from "npm:dotenv";
import { DatabaseAPI } from "../db/database.ts";

// === BACKEND ENTRY POINT === //
dotenv.config();

const database = new DatabaseAPI();
await database.initalize();

const server = express();

server.use(cors());
server.use(express.json());
// === END BACKEND ENTRY POINT ===

// Routes
server.post("/api/auth", authenticate);

server.listen(8000, () => {
    console.log('liteningegwgo');
});