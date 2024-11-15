import CorsEnabledHeaders from "./CorsEnabledHeaders.ts";


export class CorsEnabledResponse extends Response {
    override headers: CorsEnabledHeaders = new CorsEnabledHeaders();
}