import { useEffect, useState } from "react";
import ParticleWrapper from "./particleWrapper";
import ParticleWrapperProps, { ParticalFadeState } from "./types/ParticleWrapperProps";
import Student from "./types/Student";
import Classroom from "./types/Classroom";


function Students(props: ParticleWrapperProps) {
    const [students, setStudents] = useState<Array<Student>>([]);

    useEffect(() => {
        // TODO: Remove this (Exists only for testing right now)
        const tmpStudents: Student[] = [
            {
                displayName: "@sullybs",
                studentRealName: "Sullivan Bowie-Smith",
                studentEmail: "sullybowie@gmail.com",
                belongsToClassrooms: [],
                partnerStudents: [],
                uploadedVideos: []
            },
            {
                displayName: "@jamessellon",
                studentRealName: "James Sellon",
                studentEmail: "jamessellon@gmail.com",
                belongsToClassrooms: [],
                partnerStudents: [],
                uploadedVideos: []
            },
            {
                displayName: "@autumngriffith",
                studentRealName: "Autumn Griffith",
                studentEmail: "autumngriffith@gmail.com",
                belongsToClassrooms: [],
                partnerStudents: [],
                uploadedVideos: []
            },
            {
                displayName: "@johndoe",
                studentRealName: "John Doe",
                studentEmail: "johndoe@gmail.com",
                belongsToClassrooms: [],
                partnerStudents: [],
                uploadedVideos: []
            }
        ];

        const studentPairingMap = new Map<Student, Student>();

        const availableClasses: Classroom[] = [
            {
                name: "Spanish I (US)",
                instructorName: "LeAnn Gilroy",
                enrolledStudentDisplayNames: ["@sullybs", "@jamessellon"],
                studentPairs: studentPairingMap
            },
            {
                name: "English I (Mexico)",
                instructorName: "Random Guy",
                enrolledStudentDisplayNames: ["@timapple", "@johndoe"],
                studentPairs: studentPairingMap
            }
        ];

        // Assign classes & pairings
        //(realistically this would be randomized or manually inputted)
        tmpStudents.forEach((student) => {
            let partnerStudent: Student | undefined;

            switch (student.displayName) {
                case "@sullybs":
                    student.belongsToClassrooms.push(availableClasses[0])
                    partnerStudent = 
                        tmpStudents.find(student => student.displayName === "@timapple");

                    if (partnerStudent) {
                        student.partnerStudents.push(partnerStudent);
                    }
                    break;
                case "@jamessellon":
                    student.belongsToClassrooms.push(availableClasses[0])
                    partnerStudent = 
                        tmpStudents.find(student => student.displayName === "@johndoe");

                    if (partnerStudent) {
                        student.partnerStudents.push(partnerStudent);
                    }
                    break;
                case "@timapple":
                    student.belongsToClassrooms.push(availableClasses[1])
                    partnerStudent = 
                        tmpStudents.find(student => student.displayName === "@sullybs");

                    if (partnerStudent) {
                        student.partnerStudents.push(partnerStudent);
                    }
                    break;
                case "@johndoe":
                    student.belongsToClassrooms.push(availableClasses[1])
                    partnerStudent = 
                        tmpStudents.find(student => student.displayName === "@jamessellon");

                    if (partnerStudent) {
                        student.partnerStudents.push(partnerStudent);
                    }
                    break;
            }
        });

        setStudents(tmpStudents);
    }, []);

    function StudentCard({ student }: { student: Student }) {
        return (
            <div className='p-4 bg-indigo-400 rounded-md flex flex-col'>
                <h1 className='text-2xl font-bold text-indigo-800'>
                    {student.displayName}
                </h1>
                <h1 className='text-xl text-indigo-800'>
                    {student.studentRealName}
                </h1>
                <h1 className='text-lg text-indigo-800'>
                    {student.studentEmail}
                </h1>
            </div>
        )
    }

    return (
        <ParticleWrapper
        fadeStateController={props.fadeStateController}
        >
            <div
                className='animate__animated animate__fadeIn flex flex-col gap-12 justify-center items-center'
            >
                <h1 className='text-3xl font-bold text-white'>Manage Students</h1>
                <div className='flex flex-col gap-12'>
                    <input
                        className='p-4 bg-white rounded-md w-1/2 self-center'
                        type='text'
                        placeholder='Search for students by name...'
                    />
                    <div className='grid grid-cols-4 p-12 bg-indigo-200 rounded-xl gap-6'>
                    {
                        students.map((student, index) => {
                            return <StudentCard
                                student={student}
                                key={index}
                            />
                        })
                    }
                    </div>
                </div>
            </div>
        </ParticleWrapper>
    )
}

export default Students;