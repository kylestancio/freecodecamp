"use client"

import React, { ChangeEvent, Ref, createRef, useEffect, useRef, useState } from 'react'
import DrumMachinePad from './DrumMachinePad'

export default function DrumMachine() {
  const [powered, setPowered] = useState(true);
  const [audioName, setAudioName] = useState("On");
  const [audioKeyMapping] = useState([
    { key: "Q", id:"clap", name:"Clap", audioFilePath: "/audio/Clap.mp3" },
    { key: "W", id:"closedHH", name:"Closed Hi Hat", audioFilePath: "/audio/Closed-HH.mp3" },
    { key: "E", id:"heater1", name:"Heater 1", audioFilePath: "/audio/Heater-1.mp3" },
    { key: "A", id:"heater2", name:"Heater 2", audioFilePath: "/audio/Heater-2.mp3" },
    { key: "S", id:"heater3", name:"Heater 3", audioFilePath: "/audio/Heater-3.mp3" },
    { key: "D", id:"heater4", name:"Heater 4", audioFilePath: "/audio/Heater-4.mp3" },
    { key: "Z", id:"kick", name:"Kick", audioFilePath: "/audio/Kick.mp3" },
    { key: "X", id:"kickNHat", name:"Kick n' Hat", audioFilePath: "/audio/Kick-n-Hat.mp3" },
    { key: "C", id:"openHH", name:"Open Hi Hat", audioFilePath: "/audio/Open-HH.mp3" },
  ]);
  const [audioVolume, setAudioVolume] = useState(100);

  const handleChangeAudioName = (_audioName:string) => {
    setAudioName(_audioName);
  }

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) >= 0 || parseInt(e.target.value) <= 100){
      setAudioVolume(parseInt(e.target.value))
    }
  }

  const handlePowerChange = () => {
    setPowered(!powered);
    setAudioName(powered ? "Off" : "On");
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (audioKeyMapping.filter(el => el.key.toLowerCase() === e.key).length === 0) return;
      const audio = audioKeyMapping.filter(el => el.key.toLowerCase() === e.key)[0];
      const audioElement = document.getElementById(audio.id) as HTMLAudioElement;
      
      if (!powered) return;
      audioElement.play();
      handleChangeAudioName(audio.name);
    }
    
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  },[audioKeyMapping, powered])

  return (
    <div id="drum-machine" className="m-auto p-3 bg-zinc-900">
      <div className='flex justify-between mb-3'>
        <div className={`flex w-5 h-5 rounded-full cursor-pointer ${powered ? "bg-green-500" : "bg-red-500"}`} onClick={handlePowerChange}>
          <p className="text-xs m-auto">{ powered ? "on" : "off"}</p>
        </div>
        <div className='text-white'>
          Drum v1.0
        </div>
      </div>
      <div className={`${powered ? "bg-zinc-500" : "bg-zinc-700"} text-zinc-100 mb-5 h-14 rounded-md text-center text-3xl flex`}>
        <p className='m-auto'>{audioName}</p>
      </div>
      <div className="w-[30rem] h-[30rem] grid grid-cols-3 grid-rows-3 gap-3">
        { audioKeyMapping.map((mapping,i) => {          
          return (
            <DrumMachinePad 
            key={i} 
            powered={powered}
            audioId={mapping.id}
            audioName={mapping.name} 
            text={mapping.key} 
            audioFilePath={mapping.audioFilePath}
            audioVolume={audioVolume}
            handleChangeAudioName={handleChangeAudioName} 
          />
          )
        }) }
      </div>
      <div className='py-5'>
        <div className='text-white flex gap-3'>
          { String(audioVolume).padStart(2, "0") }
          <input 
            type="range" 
            min={0} 
            max={100} 
            value={audioVolume} 
            onChange={handleVolumeChange} 
            className='w-full m-0 p-0 grow'
          />
        </div>
        
      </div>
    </div>
  )
}
