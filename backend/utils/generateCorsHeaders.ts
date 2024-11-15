/**
 * @summary Defines and generates the CORS headers for all of
 * the responses in this application
 * @returns {Headers} Configured CORS headers to send back
 * in the response to the client
 */
export default function generateCorsHeaders(): Headers {
    const headers = new Headers();
  
    // Allow all origins
    // TODO: Define explicit rules
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return headers;
}