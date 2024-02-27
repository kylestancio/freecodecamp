import Image from "next/image";
import DrumMachine from "./DrumMachine";

export default function Home() {
  return (
    <main className="bg-zinc-950 w-screen h-screen flex">
      <DrumMachine />
    </main>
  );
}
