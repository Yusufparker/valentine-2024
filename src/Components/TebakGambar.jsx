import React, { useState, useEffect } from "react";

const images = [
  "gambar0.png",
  "gambar1.png",
  "gambar2.png",
  "gambar3.png",
  "gambar4.png",
  "gambar5.png",
  "gambar0.png",
  "gambar1.png",
  "gambar2.png",
  "gambar3.png",
  "gambar4.png",
  "gambar5.png",
];

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const TebakGambar = ({ onGameComplete }) => {
  const [cards, setCards] = useState(shuffleArray(images));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [mistakes, setMistakes] = useState(0);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      if (cards[card1] === cards[card2]) {
        setMatchedPairs([...matchedPairs, cards[card1]]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setMistakes(mistakes + 1); // Menambahkan jumlah kesalahan
        }, 1000);
      }
    }
    if (matchedPairs.length === images.length / 2) {
      onGameComplete(); // Memanggil fungsi ketika semua pasangan cocok
    }
  }, [flippedCards, cards, matchedPairs, mistakes, onGameComplete]);

  const handleCardClick = (index) => {
    if (
      flippedCards.length < 2 &&
      !flippedCards.includes(index) &&
      !matchedPairs.includes(cards[index])
    ) {
      setFlippedCards([...flippedCards, index]);
    }
  };

  return (
    <>
      <h1 className="text-caveat text-pink">Cocokin Gambarnya Dulu..</h1>
      <div>
        <p className="text-caveat text-pink">Banyak Salah : {mistakes}</p>{" "}
        {/* Menampilkan jumlah kesalahan */}
      </div>
      <div className="card-container container p-4">
        <div className="row mt-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`card col-4 d-flex justify-content-center align-items-center ${
                flippedCards.includes(index) || matchedPairs.includes(card)
                  ? "flipped"
                  : ""
              }`}
              onClick={() => handleCardClick(index)}
            >
              {flippedCards.includes(index) || matchedPairs.includes(card) ? (
                <img src={card} alt={`Card ${index}`} />
              ) : (
                " "
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TebakGambar;
