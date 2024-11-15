export default class CorsEnabledHeaders extends Headers {
    constructor () {
    super();
    super.append("Access-Control-Allow-Origin", "http://localhost:5173");
    super.append(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    super.append(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    }
}