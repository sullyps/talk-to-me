import { DBActionResult } from "../@types/DBActionResult.ts";
import { DatabaseInstance } from "./database.ts";
import process from "node:process";

const database = new DatabaseInstance();

const dbInitResult = await database.init();

if (dbInitResult === DBActionResult.Failure) {
    console.log("Could not connect to DB");
    process.exit(-1);
}