import Classroom from "./Classroom";


type StudentVideo = {
    /**
     * Google Drive URL for the video
     */
    url: string,

    /**
     * Upload date of the video
     */
    uploadDate: Date,

    /**
     * Classroom that the video was uploaded to
     */
    classroom: Classroom
}

export default StudentVideo;