import React, { useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [previousTime, setPreviousTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);

  const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer();

  const cardTexts = [
    "Bunny 🐰",
    "Frog 🐸",
    "Panda 🐼",
    "Doggy 🐶",
    "Kitty 😺",
    "Duck 🦆",
  ];

  function handleGameStart() {
    timerReset();
    timerStart();
    setIsPlaying(true);
  }

  function handleGameEnd() {
    timerStop();
    setIsPlaying(false);

    setPreviousTime(time);

    setBestTime((prevBest) => {
      if (prevBest === null || time < prevBest) {
        return time;
      }
      return prevBest;
    });
  }

  return (
    <>
      <Header
        time={isPlaying ? time : null}
        previousTime={previousTime}
        bestTime={bestTime}
        openModal={() => setShowModal(true)}
      />
      <CardGame
        cardTexts={cardTexts}
        onGameStart={handleGameStart}
        onGameEnd={handleGameEnd}
      />
      <Modal isShown={showModal} close={() => setShowModal(false)} />
    </>
  );
}

