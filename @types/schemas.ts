import { CredentialResponse } from "npm:@react-oauth/google/dist/index.js";
import { Credentials } from "npm:google-auth-library/build/src/index.js";


export interface StudentSchema {
    displayName: string
    realName: string
    classes: ClassSchema[]
    email: string
    oAuthLoginCredentials: CredentialResponse
    gDriveCredentials?: Credentials
    apiKey: string
}

export interface TeacherSchema {
    displayName: string
    password: string,
    email: string
}

export interface ClassSchema {
    teacherDisplayName: string
    className: string
    enrolledStudentEmails: string[]
}