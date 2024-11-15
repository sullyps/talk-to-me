import dotenv from "npm:dotenv";
import process from "node:process";
import { Collection, Db, MongoClient } from "npm:mongodb"
import { DBActionResult } from "../@types/DBActionResult.ts";
import { CredentialResponse } from "npm:@react-oauth/google";
import {
    StudentSchema,
} from "../@types/schemas.ts";
import { v6 as newUUID } from "npm:uuid";
import { google } from "npm:googleapis";
import { Credentials } from "npm:google-auth-library/build/src/index.js";


export class DatabaseAPI {
    public static instance: DatabaseAPI = new DatabaseAPI();
    public static mongoClient: MongoClient | null;

    private static mongoClientDB: Db | null;
    private static collections: Map<string, Collection> = new Map();
    private static DB_NOT_CONNECTED_ERR: Error = new Error(
        "INTERNAL DB ERROR: Tried to use DB method before connecting"
    );

    static async initalize(): Promise<DBActionResult> {
        console.log('DB: Initializing...');

        dotenv.config({ path: "../.env" });

        console.log(process.env.MONGODB_CONN_STRING);
        
        const client = new MongoClient(
            process.env.MONGODB_CONN_STRING as string
        );

        await client.close();

        try {
            await client.connect();
            console.log("DB: Connected, mapping collections...");

            DatabaseAPI.mongoClientDB = client.db("oauth");

            for (
                const collection of await DatabaseAPI.mongoClientDB.collections()
            )
            {
                DatabaseAPI.collections.set(
                    collection.collectionName,
                    collection
                );
            }

            console.log("DB: ready!");
            return DBActionResult.Success;

        } catch (e) {
            console.error("DB INITALIZATION ERROR:", e);
            return DBActionResult.Failure;
        }
    }

    async fetchUserFromKey(apiKey: string) {
        if (!DatabaseAPI.instance) throw DatabaseAPI.DB_NOT_CONNECTED_ERR;

        const clientsCollection =
            DatabaseAPI.collections.get("clients") as Collection;

        const user = await clientsCollection.findOne((client: StudentSchema) => {
            return (client.apiKey === apiKey)
        });

        if (user) return DBActionResult.Success;

        return DBActionResult.Failure;
    }

    async updateUserDriveCredentials(
        apiKey: string, credentials: Credentials
    ): Promise<DBActionResult>
    {
        if (!DatabaseAPI.instance) throw DatabaseAPI.DB_NOT_CONNECTED_ERR;

        const studentsCollection =
            DatabaseAPI.collections.get("clients") as Collection;

        const updatedStudent = await studentsCollection
            .findOneAndUpdate(
                {
                    apiKey
                },
                {
                    $set: {
                        gDriveCredentials: credentials
                    }
                }
            )

        console.log('updated student:', updatedStudent);

        if (updatedStudent) return DBActionResult.Success;

        return DBActionResult.Failure;
    }

    async uploadVideo(videoStream: ReadableStream, apiKey: string) {

    }

    async verifyEmailRegistered(email: string):
        Promise<true | DBActionResult.Failure>
    {
        try {
        const studentsCollection =
            DatabaseAPI.collections.get("clients") as Collection;

            const studentWithEmail = await studentsCollection
                .findOne((student: StudentSchema) => 
                    student.email === email
                );

            if (studentWithEmail) return true;
            return DBActionResult.Failure

        } catch (e) {
            console.error("DB INTERNAL ERROR:", e);
            return DBActionResult.Failure;
        }
    }

    async verifyAPIKey(apiKey: string):
        Promise<boolean | DBActionResult.Failure>
    {
        try {
            const studentsCollection =
                DatabaseAPI.collections.get("clients") as Collection

            const studentWithKey = await studentsCollection
                .findOne((student: StudentSchema) => 
                    student.apiKey === apiKey
                );

            return Boolean(studentWithKey);

        } catch (e) {
            console.error("INTERNAL DB ERROR:", e);
            return DBActionResult.Failure;
        }
    }

    async uploadUserFromOAuthCredentials(
        displayName: string,
        realName: string,
        oAuthLoginCredentials: CredentialResponse,
    ): Promise<string | DBActionResult.Failure>
    {
        const apiKey = newUUID();

        // TODO: Get google identity

        try {
            const newUser: StudentSchema = {
              displayName,
              realName,
              classes: [],
              oAuthLoginCredentials,
              apiKey,
              email: ""
            }

            const studentsCollection =
                DatabaseAPI.collections.get("clients") as Collection

            await studentsCollection.insertOne(
                newUser
            );

            return apiKey;
        } catch (e) {
            console.error("DB ERROR:", e);
            return DBActionResult.Failure;
        }
    }
}