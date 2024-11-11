export const NO_ROUTE_FOUND_RESPONSE =
    new Response(
        JSON.stringify({ errored: true, message: "No route with this name was found!" }),
        { status: 404 }
    );