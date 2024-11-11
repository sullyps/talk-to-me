import { NO_ROUTE_FOUND_RESPONSE } from "./responses.ts";
import { API_ROUTE, AUTH_ROUTE } from "./router.ts";

// Routes
import authenticate from "./routes/authenticate.ts";

// Developer Note:
// This is the backend entry point for any request
Deno.serve((request: Request): Response => {
    console.log(request);
    const url = new URL(request.url);

    const isApiRoute = API_ROUTE.exec(url);
    const isAuthRoute = AUTH_ROUTE.exec(url);

    // === Begin Route handling ===
    try {
        // /api/auth
        if (isAuthRoute) return authenticate(request);

    } catch {
        return new Response("Unknown error");
    }
    // === End Route handling ===

    return NO_ROUTE_FOUND_RESPONSE;
});