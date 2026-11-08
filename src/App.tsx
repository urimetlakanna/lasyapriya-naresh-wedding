import { useState } from "react";
import { LangProvider } from "./i18n";
import { PhotosProvider } from "./photos";
import { Gate } from "./components/Gate";
import { Controls, useMusic } from "./components/Controls";
import { Hero } from "./components/Hero";
import { Invitation } from "./components/Invitation";
import { CoupleSection } from "./components/Couple";
import { Families } from "./components/Families";
import { Events } from "./components/Events";
import { Countdown } from "./components/Countdown";
import { Gallery } from "./components/Gallery";
import { Share } from "./components/Share";
import { Closing } from "./components/Closing";

function Site() {
  const [started, setStarted] = useState(false);
  const music = useMusic();

  return (
    <>
      <Gate
        onOpen={() => {
          setStarted(true);
          void music.start(); // runs inside the tap — satisfies mobile autoplay rules
        }}
      />
      <Controls visible={started} playing={music.playing} onToggle={music.toggle} />
      <main>
        <Hero started={started} />
        <Invitation />
        <CoupleSection />
        <Families />
        <Events />
        <Countdown />
        <Gallery />
        <Share />
        <Closing />
      </main>
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <PhotosProvider>
        <Site />
      </PhotosProvider>
    </LangProvider>
  );
}
