// used for jsdoc reference
// deno-lint-ignore no-unused-vars
import { CredentialResponse } from "@react-oauth/google/dist/index.js";

/**
 * @description HTTP Route handler for /api/auth
 * @summary Takes a Google credentials request and links it to
 * the user request. Nessasary for authentication
 * @param request The OAuth HTTP request containing credentials
 * @see {CredentialResponse} The credentials response from the
 * react-oauth library used in this application
 * @returns {Response} A response indicating if the request was
 * successful or not
 */
export default function authenticate(request: Request): Response {
    const url = new URL(request.url);
    console.log(url.searchParams);

    return new Response("okay");
}