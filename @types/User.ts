import { CredentialResponse } from "npm:@react-oauth/google/dist/index.js";

export type User = {
    displayName: string
    realName: string
    credentials: CredentialResponse
}