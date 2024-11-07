import ParticleWrapper from "./particleWrapper";
import ParticleWrapperProps from "./types/ParticleWrapperProps";
import { Link } from "react-router-dom";


function Students(props: ParticleWrapperProps) {
    return (
        <ParticleWrapper
        fadeStateController={props.fadeStateController}
        >
        <div className='h-screen w-screen'>
        <h1 className='w-screen text-center text-white absolute text-5xl py-12 font-semibold'>Administration Control</h1>
            <div className='h-screen w-screen flex justify-center items-center flex-row gap-12 z-10'>
            <div className='flex flex-row gap-48 text-5xl text-blue-200 font-bold'>
                <Link
                    to={"/admin/students"}
                    className='hover:text-blue-300 italic underline'
                >
                Students
                </Link>
                <Link
                    to={"/admin/classes"}
                    className='hover:text-blue-300 italic underline'
                >
                Classes
                </Link>
            </div>
            </div>
        </div>
        </ParticleWrapper>
    )
}

export default Students;