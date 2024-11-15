// This file contains all the HTTP responses and interfaces
// made for this application
import { APIResponse, LoginAPIResponse }
from "../@types/APIResponse.ts";

// TODO: Make base interface for application specific
// responses that extends CorsEnabledResponse


/**
 * @summary Error response as a fallback for any API route.
 * @prop errorCode: -1
 */
export const internalErrorResponse = (): APIResponse => ({
    success: false,
    errorCode: -1,
    message: `An internal error occured while processing your
    request. Please contact the developer at sullybowie@gmail.com
    if this error persists`
});

/**
 * @summary Error response when a client tries to
 * reach a route that doesn't exist
 * @prop errorCode: 1
 */
export const unknownRouteResponse = (): APIResponse => ({
  success: false,
  errorCode: 1,
  message: "The route you tried to reach does not exist."
});

/**
 * @summary Error response as a fallback for any API route.
 * @prop errorCode: 2
 */
export const malformedDataResponse = (): APIResponse => ({
  success: false,
  errorCode: 2,
  message: `Malformed data was sent to the server. Please
  try again momentarily.`
});

/**
 * @summary Error response as a fallback for any API route.
 */
export const loginResponse =
    (apiKey: string): LoginAPIResponse => ({
    success: true,
    errorCode: 0,
    message: `SuccessfulLogin`,
    userApiKey: apiKey
});