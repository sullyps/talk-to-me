export interface APIResponse {
    success: boolean,
    errorCode: number,
    message: string,
}

export interface LoginAPIResponse extends APIResponse {
    userApiKey: string
}