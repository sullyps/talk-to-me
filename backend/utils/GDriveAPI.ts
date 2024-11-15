import { google } from "npm:googleapis";
import dotenv from "npm:dotenv";
import process from "node:process";
import fs from "node:fs";
import { Credentials, OAuth2Client } from "google-auth-library/build/src/index.js";
import { GDriveActionResult } from "../../@types/GDriveActionResult.ts";
import { DatabaseAPI } from "../../db/database.ts";
import { DBActionResult } from "../../@types/DBActionResult.ts";


/**
 * Singleton implementation of every function needed for Google Drive authentication
 * within this applicaiton
 * @param {GDriveAPI} instance Reference to the GDriveAPI instance
 */
export class GDriveAPI {
    private static DRIVE_NOT_INITALIZED_ERR = new Error(
        `INTERNAL ERROR: GDriveAPI not initalized, call GDriveAPI.initalize()
        before making any calls to its static or instance methods`
    );

    public static instance: GDriveAPI = new GDriveAPI();

    private static clientSecret?: string = process.env.GOOGLE_CLIENT_SECRET;
    private static clientId?: string = process.env.GOOGLE_CLIENT_ID;
    private static redirectUrl?: string = process.env.GOOGLE_REDIRECT_URL;
    private static driveScopes: string[] = [
        'https://www.googleapis.com/auth/drive',
    ];


    private static oAuthInstance: OAuth2Client | null;

    static initalize() {
        dotenv.config({ path: "../../.env" });

        console.log(process.env.GOOGLE_CLIENT_SECRET);
        console.log(process.env.GOOGLE_CLIENT_ID);
        console.log(process.env.GOOGLE_REDIRECT_URL);

        GDriveAPI.oAuthInstance = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URL
        );
    }

    /**
     * @summary Takes an oauth code and handles user authentication status
     * in the DB
     * @param code The Google OAuth access code
     */
    static async updateUserAuth(apiKey: string, code: string):
        Promise<GDriveActionResult>
    {
        try {
                if (!GDriveAPI.oAuthInstance) throw GDriveAPI.DRIVE_NOT_INITALIZED_ERR;
                if (!DatabaseAPI.instance) throw new Error(
                    "Tried to access DB before it was initalized @ updateUserAuth"
                );

                const driveCredentials: Credentials =
                    (await (GDriveAPI.oAuthInstance.getToken(code)))
                        .tokens;

                const result = await DatabaseAPI.instance.updateUserDriveCredentials(
                    apiKey,
                    driveCredentials
                );

                if (result === DBActionResult.Failure) {
                    console.error(`
                        INTERNAL ERROR: Failed to update a user's
                        auth data in the DB
                        (see DatabaseAPI.updateUserDriveCredentails)
                        `);

                    return GDriveActionResult.Failure;
                }

                return GDriveActionResult.Success;

        } catch (e) {
            console.log(e);
            console.warn(`
                WARN: Encountered an error updating
                a user's token. User possibly revoked privledges`
            );

            return GDriveActionResult.Failure;
        }

        // Save auth data in DB
    }

    static generateDriveAuthURL(): string {
        if (!GDriveAPI.oAuthInstance) throw GDriveAPI.DRIVE_NOT_INITALIZED_ERR;

        const url = GDriveAPI.oAuthInstance.generateAuthUrl({
            // 'online' (default) or 'offline' (gets refresh_token)
            access_type: 'online',
          
            // If you only need one scope, you can pass it as a string
            scope: this.driveScopes
          });

        return url;
    }

    async uploadVideo(blob: Blob, apiKey: string) {
        const drive = google.drive({
            version: "v3",
            auth: ""
        });

        const response = await drive.files.create({
            media: {
                mimeType: "mp4",
                body: blob
            },
            requestBody: {
                originalFilename: ""
            },
            fields: "id,name"
        })
    }
}