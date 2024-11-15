import { CredentialResponse } from "@react-oauth/google/dist/index.js";
import { CorsEnabledResponse } from
    "../../@types/CorsEnabledResponse.ts";
import { DatabaseAPI } from "../../db/database.ts";
import { DBActionResult } from "../../@types/DBActionResult.ts";
import { internalErrorResponse, loginResponse } from "../responses.ts";


/**
 * @description HTTP Route handler for /api/auth
 * @summary Takes a Google credentials request and links it to
 * the user request. Nessasary for authentication
 * @param request The OAuth HTTP request containing credentials
 * @returns {Response} A response indicating if the request was
 * successful or not
 */
export default async function authenticate(
    request: any,
    response: any,
    ): Promise<CorsEnabledResponse> {
    try {
        if (!DatabaseAPI.instance) throw new Error(
            `Internal error while authenticating: DB was not initalized
            before usage`
        );

        if (request.body.apiKey) {
            const keyExists = await DatabaseAPI.instance
                .verifyAPIKey(request.body.apiKey);

            if (keyExists) {
                return response.send(
                    loginResponse(request.body.apiKey)
                );
            }

            // Fallback to upload user method below
        }

        const credentials: CredentialResponse = request.body;

        // returns string(apiKey) || DBActionResult.Failure || undefined
        const dbResponse =
            await DatabaseAPI.instance.uploadUserFromOAuthCredentials(
                "sullybowie@gmail.com",
                "Sullivan Bowie-Smith",
                credentials
            );

        if (!dbResponse || dbResponse === DBActionResult.Failure)
            return response.send(
                internalErrorResponse()
            );

        return response.send(
            loginResponse(dbResponse)
        );
    } catch (e) {
        console.error("INTERNAL ERROR:", e);
        return response.send(
            internalErrorResponse()
        )
    }
}