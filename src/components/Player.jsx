import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();
  const [player, setPlayer] = useState("");

  const handleClick = function () {
    setPlayer(playerName.current.value);
    playerName.current.value = "";
  };

  return (
    <section id="player">
      <h2>Welcome {!player ? "unknown entity" : player}</h2>
      <p>
        <input type="text" ref={playerName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
