import React, { useState, useEffect } from "react";
import axios from "axios";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [clothingSize, setClothingSize] = useState("");

  useEffect(() => {
    fetchPlayers();
  }, []); // Run once on component mount

  const fetchPlayers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/players");
      setPlayers(response.data); // Update state with players data
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const handleCreatePlayer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/player", {
        name,
        weight,
        height,
        clothingSize,
      });
      console.log(response.data); // Handle response based on your logic
      // Refetch players after successful creation
      fetchPlayers();
    } catch (error) {
      console.error("Error creating player:", error);
    }
  };

  return (
    <div>
      <h2>Players</h2>
      <form onSubmit={handleCreatePlayer}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div>
          <label>Height:</label>
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div>
          <label>Clothing Size:</label>
          <input
            type="text"
            value={clothingSize}
            onChange={(e) => setClothingSize(e.target.value)}
          />
        </div>
        <button type="submit">Create Player</button>
      </form>
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Players;
