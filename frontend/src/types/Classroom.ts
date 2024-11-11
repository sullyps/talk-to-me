import Student from "./Student";


type Classroom = {
    /**
     * Name of the classroom
     */
    name: string,

    /**
     * Teacher/Instructor's chosen name
     */
    instructorName: string

    /**
     * List of student display names enrolled in this class
     */
    enrolledStudentDisplayNames: Array<string>

    /**
     * Map of student pairings that have access to eachothers
     * videos
     */
    studentPairs: Map<Student, Student>
}

export default Classroom;