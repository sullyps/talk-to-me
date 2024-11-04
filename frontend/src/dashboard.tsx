import { useState, useRef, useEffect } from 'react';
import { redirect } from 'react-router-dom';
import './index.css';
import { Camera, CameraProps } from 'react-camera-pro';
import DashboardMode from './types/DashboardMode';

// TODO: Move this?
const sleep = async (time: number) =>
    new Promise((res => setTimeout(res, time)));

function Dashboard() {
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>();
  const [videoAudioStream, setVideoAudioStream] =
    useState<MediaStream | null>();
  const [dashboardMode, setDashboardMode] =
    useState<DashboardMode>(DashboardMode.NotRecording);

  const screenRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<CameraProps>(null);
  const instructionRef = useRef<HTMLDivElement>(null);

  // Setting navigator settings immediately ensures
  // video will be available for stream, reduces possible
  // amount of permission errors later in recording process
  useEffect(() => {
    obtainUserStream();
  }, []);

  // TODO: Add size limit to video with this hook -> autostop vid
  useEffect(() => {
    if (!recordingBlob) return;
    console.log('Size:', (recordingBlob.size / 1000).toFixed(4) + "KB");
  }, [recordingBlob]);

  useEffect(() => {
    if (dashboardMode === DashboardMode.ReadyToSend && instructionRef.current)
        instructionRef.current.textContent = "Ready to send?";
    if (
        dashboardMode === DashboardMode.NotRecording
        ||
        !recordingBlob
    ) return;
  }, [dashboardMode]);

  async function obtainUserStream() {
    try {
        const stream = await navigator.mediaDevices
            .getUserMedia({ video: true, audio: true });

        setVideoAudioStream(stream);
    } catch (e) {
        console.error("Navigator Error:", e);
        // TODO: Finish implementing, ensure this works properly
        redirect("/troubleshoot");
    }
  }

  async function startRecording() {
        try {
            const stream = await navigator.mediaDevices
                .getUserMedia({ video: true, audio: true });

            const recorder = new MediaRecorder(stream);
            const recordedChunks: BlobPart[] | undefined = [];

            // NOTE: MediaRecorder.ondataavailable will not
            // fire unless timeslice parameter is used here
            // 1 Indicates 1ms between ondataavailable executions
            // (This number was chosen arbitrarily -> performance could
            // be better with a larger delay)
            recorder.start(1);

            recorder.ondataavailable = event => {
                if (event.data.size > 0)
                    recordedChunks.push(event.data);
                
                const videoBlob = new Blob(recordedChunks);
                setRecordingBlob(videoBlob);
            };

            setTimeout(() => {
                recorder.ondataavailable = null;
                console.log("Setting dashboard state to 'Ready to Send'")
                setDashboardMode(DashboardMode.ReadyToSend);
            }, 3000);
        

        } catch (error) {
            console.error('Error accessing media devices.', error);
        }
    }

  async function runRecordingCountdown() {
    await new Promise(async (res) => {
        let secondsElapsed = 0;

        const intervalId = setInterval(async () => {
            if (!instructionRef.current)
                return clearInterval(intervalId);

            const secondsRemaining = 3 - secondsElapsed;

            if (secondsRemaining === 0)
                instructionRef.current.textContent = "";
            else instructionRef.current.textContent =
                secondsRemaining.toString()

            secondsElapsed++;

            if (secondsElapsed === 4) {
                res("Recording countdown completed");
                clearInterval(intervalId);
            }
        }, 1000)
    });

    startRecording();
  }

  function recordModeButtonPressed() {
    screenRef.current?.classList.add(
        'animate__animated',
        'animate__fadeOut'
    );

    // Allows time for fadeOut animation
    setTimeout(async () => {
        setDashboardMode(DashboardMode.Recording);
        screenRef.current?.classList.remove(
            'animate__animated',
            'animate__fadeOut'
        )

        await sleep(1000);

        screenRef.current?.classList.add(
            'animate__animated',
            'animate__fadeIn'
        )

        await sleep(1000);
    }, 2000);
  }

  function sendVideo() {
    if (!recordingBlob) return
        console.error("Attempted to send video but no recording was found.");

    const formData = new FormData();
  }

  if (
    dashboardMode === DashboardMode.Recording
    ||
    dashboardMode === DashboardMode.ReadyToSend
  )
  return (
    <div ref={screenRef} className='absolute h-screen w-screen flex justify-around items-center flex-row gap-12'>
        <h1 ref={instructionRef} className='absolute left-1 ml-24 text-white text-5xl font-bold animate__animated animate__fadeIn animate__delay-1s'>Ready to Record?</h1>
            <div className='absolute right-1 mr-24 w-1/2 h-1/2 flex flex-col justify-center align-middle animate__animated animate__fadeIn animate__delay-2s'>
                {
                dashboardMode === DashboardMode.Recording ?
                <Camera
                  ref={cameraRef}
                  aspectRatio={16 / 9}
                  errorMessages={{
                      noCameraAccessible: undefined,
                      permissionDenied: undefined,
                      switchCamera: undefined,
                      canvas: undefined
                  }} />
                :
                <video
                    className='text-white text-6xl'
                    //@ts-ignore
                    src={URL.createObjectURL(recordingBlob)}
                    autoPlay
                    loop
                    controls
                />
                }
                <button
                    className={
                        dashboardMode === DashboardMode.ReadyToSend ?
                            'p-2 bg-indigo-300 hover:bg-indigo-400 px-16 rounded-md self-center my-12'
                            :
                            'p-2 bg-red-400 hover:bg-red-500 px-16 rounded-md self-center my-12'
                    }
                    onClick={
                        dashboardMode === DashboardMode.ReadyToSend
                        ?
                        sendVideo
                        :
                        runRecordingCountdown
                    }
                >
                {
                    dashboardMode === DashboardMode.ReadyToSend ?
                    'Send'
                    :
                    'Record'
                }
                </button>
    </div>
    </div>
  )

  // Base mode (not recording) of dashboard
  return (
    <div ref={screenRef} className='absolute h-screen w-screen bg-black flex justify-around items-center flex-row gap-12'>
        <div className='flex flex-col'>
            <h1 className='text-4xl text-white font-bold mb-52'>John Doe's Videos</h1>
            <h1 className='text-4xl font-bold text-white text-center'>No Videos Yet...</h1>
        </div>

        <div className='flex flex-col space-y-48'>
            <h1 className='text-4xl text-white font-bold'>Your Videos</h1>
            <button
                className='bg-slate-200 hover:bg-slate-300 rounded-lg py-4 text-center'
                onClick={recordModeButtonPressed}
            >
            Record a video
            </button>
        </div>
    </div>
  )
}

export default Dashboard;
