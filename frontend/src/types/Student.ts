import StudentVideo from "./StudentVideo";
import Classroom from "./Classroom";


type Student = {
    /**
     * Name that will be displayed on the website
     */
    displayName: string,

    /**
     * Name that will be used internally for administration purposes
     */
    studentRealName: string,

    /**
     * Gmail address associated with account after authenticating
     * with Google OAuth
     */
    studentEmail: string,

    /**
     * List of Classrooms that the student is enrolled in
     * @see{Classroom}
     */
    belongsToClassrooms: Classroom[],

    /**
     * Other students that this student can access uploaded videos for
     */
    partnerStudents: Student[],

    /**
     * Videos uploaded by this student
     * @see{StudentVideo}
     */
    uploadedVideos: StudentVideo[]
}

export default Student;