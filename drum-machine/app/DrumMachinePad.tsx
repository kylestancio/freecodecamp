"use client"

import React, { Dispatch, ForwardedRef, Ref, SetStateAction, forwardRef, useEffect, useRef } from 'react'

type Props = {
  text: string,
  powered: boolean,
  audioId: string,
  audioName: string,
  audioFilePath: string,
  audioVolume: number,
  handleChangeAudioName: (name:string) => void,
}
  
export default function DrumMachinePad(props: Props, ref: HTMLAudioElement) {

  const { 
    text, 
    powered,
    audioId, 
    audioName, 
    audioVolume, 
    audioFilePath, 
    handleChangeAudioName 
  } = props;

  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = () => {
    if (!powered) return;
    handleChangeAudioName(audioName);
    audioRef.current!.play();
  }

  useEffect(()=>{
    const changeVolume = () => {
      audioRef.current!.volume = audioVolume/100;
    }
    changeVolume();
  },[audioVolume]);
  
  return (
    <div className={`drum-pad ${!powered && "bg-zinc-800 hover:bg-zinc-800 active:bg-zinc-800"}`} onClick={playAudio}>
      <audio id={audioId} src={audioFilePath} ref={audioRef} ></audio>
      <p className="m-auto">{text}</p>
    </div>
  )
}