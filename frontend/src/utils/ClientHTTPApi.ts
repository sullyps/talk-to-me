import AccountType from "../types/AccountType";
import APIActionStatus from "../types/APIActionStatus";
import Classroom from "../types/Classroom";
import axios from "axios";


/**
 * @summary Utility class that interacts with the backend authentication server
 * @description All HTTP requests in this application should go through this class
 * - [See design philosophy here]({@link ../../../developer-notes.md})
 */
class ClientHTTPAPI {
    /**
     * Can either be "Student" or "Teacher"
     */
    accountType: AccountType;

    /**
     * OAuth access token for backend authentication
     */
    accessToken: string;

    /**
     * OAuth refresh token for backend authentication
     */
    refreshToken: string;

    constructor(
        accountType: AccountType,
        accessToken: string,
        refreshToken: string) {
            this.accountType = accountType;
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
    }

    /**
     * 
     * @param authToken 
     * @param refreshToken 
     */
    authenticateWithGoogle = async (authToken: string, refreshToken: string) => {

    }

    /**
     * @summary Fetches a classroom from the database
     * @param id The ID of the classroom to fetch
     * @see{Classroom}
     */
    getClassroomByID = async (id: string): Classroom | APIActionStatus.Failed => {

    }

    /**
     * @summary Creates a classroom
     * @param className The classroom name that will be displayed to students
     */
    createClassroom = async (className: string): APIActionStatus => {

    }

    /**
     * @summary Deletes a student from a classroom
     * @param studentID The ID of the student to remove
     * @param classID The ID of the classroom to remove the student from
     * @see{Student}
     * @see{Classroom}
     */
    deleteStudent = async (studentID: string, classID: string): APIActionStatus => {

    }

    /**
     * @summary Deletes a classroom
     * @param classID
     */
    deleteClassroom = async (classID: string): APIActionStatus => {

    }

    /**
     * NOTE: WEBSITE ADMINISTRATION ONLY ROUTE
     * @param teacherName The name of the teacher to be created
     * @returns{APIActionStatus} "Succeeded" if request succeeded, "Failed" if not
     */
    createTeacher = (teacherName: string): APIActionStatus => {

    }
}

export default ClientHTTPAPI;