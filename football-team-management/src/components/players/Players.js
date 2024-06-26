import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [clothingSize, setClothingSize] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      console.log(token);
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp > currentTime) {
          setIsAuthenticated(true);
          fetchPlayers();
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
    } else {
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/player", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPlayers(response.data.players);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const handleCreatePlayer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/player",
        {
          name,
          weight,
          height,
          clothingSize,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchPlayers();
      setName("");
      setWeight("");
      setHeight("");
      setClothingSize("");
    } catch (error) {
      console.error("Error creating player:", error);
    }
  };

  const handleDeletePlayer = async (playerId) => {
    if (window.confirm("¿Estás seguro de eliminar este jugador?")) {
      try {
        await axios.delete(`http://localhost:3000/api/${playerId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        fetchPlayers();
      } catch (error) {
        console.error("Error deleting player:", error);
      }
    }
  };

  return (
    <div>
      <h2>Players</h2>
      {!isAuthenticated && (
        <p>Debe iniciar sesión para acceder a esta página.</p>
      )}
      {isAuthenticated && (
        <>
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
              <li key={player.id}>
                {player.name} - Weight: {player.weight} - Height:{" "}
                {player.height} - Clothing Size: {player.clothingSize}
                <button onClick={() => handleDeletePlayer(player.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Players;
