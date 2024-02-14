import React, { useState, useEffect } from "react";
import TebakGambar from "./Components/TebakGambar";

function App() {
  const [showPopup, setShowPopup] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [audio] = useState(new Audio("musik.mp3"));

  const closePopup = () => {
    setShowPopup(false);
    setShowGame(true);
  };

  const handleGameComplete = () => {
    setShowGame(false);
    setShowCongratulations(true);
  };

  useEffect(() => {
    if (showGame) {
      audio.play(); // Putar musik saat memulai permainan
    } else {
      audio.pause(); // Jeda musik jika permainan dihentikan
      audio.currentTime = 0; // Kembalikan waktu pemutaran ke awal
    }
  }, [showGame, audio]);

  useEffect(() => {
    if (showCongratulations) {
      audio.play(); // Lanjutkan memutar musik saat tampilan "congrats" ditampilkan
    }
  }, [showCongratulations, audio]);

  return (
    <div className="App">
      {showPopup && (
        <div className="popup shadow-lg text-pacifico text-pink p-5">
          <h2>Halo Sayang</h2>
          <img src="/love.gif" className="w-100" alt="" />
          <p className="text-caveat mt-3">
            Happy February 14th, Thank you for being my better half. Today,
            tomorrow and forever, I am with you.
          </p>
          <button onClick={closePopup}>Get Rewards 🎁</button>
        </div>
      )}
      {showGame && <TebakGambar onGameComplete={handleGameComplete} />}
      {showCongratulations && (
        <div className="popup shadow-lg text-pacifico text-pink  pt-2 ps-5 pe-5 congrats">
          <h5 className="mb-4">Septi Khairunisa💖</h5>
          <img src="/ayang.jpeg" alt="" className="img-fluid" />
          <p className="text-caveat mt-3">
            Today and every day, I'm grateful for your love and support. Keep
            making my life beautiful with the smile from rosy lips.
          </p>
          <p className="text-caveat">
            Terima kasih karena telah mengisi hidupku dengan cinta dan
            kebahagiaan
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
