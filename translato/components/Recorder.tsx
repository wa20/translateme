
'use client'

import { MicIcon } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useFormStatus } from 'react-dom';

function Recorder( {uploadAudio}: { uploadAudio: (blob: Blob) => void } ){
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive")
    const { pending } = useFormStatus()


  useEffect(() => {
        getMicrophonePermission()
  }, [])

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err: any) {
        alert(err.message);
      }
    } else {
      alert("Your browser does not support the MediaRecorder API");
    }
  };
    

  return (
    <div>
        <MicIcon size={20} className='group-hover:underline'/>

        {!permission && (
            <button onClick={getMicrophonePermission}>Get Microphone</button>
        )}

        {{pending && (
            <p>
                {recordingStatus === "recording"
                    ? "Recording..."
                    : "Stopping recording..."
                }
            </p>
        )}}

        
    </div>
  )
}

export default Recorder