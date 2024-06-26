import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [clothingSize, setClothingSize] = useState("");
  const { setIsAuthenticated, isAuthenticated, handleLogout } = useAuth();
  const [isCreateMode, setCreateMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          setIsAuthenticated(true);
          fetchPlayers();
        } else {
          handleLogout(); // Token expired, log out
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        handleLogout(); // Error decoding token, log out
      }
    } else {
      handleLogout(); // No token found, log out
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
      clearForm();
    } catch (error) {
      console.error("Error creating player:", error);
    }
  };

  const handleEditPlayer = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/${id}`,
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
      clearForm();
      setCreateMode(true);
    } catch (error) {
      console.error("Error editing player:", error);
    }
  };

  const editPlayer = (player) => {
    setId(player.id);
    setName(player.name);
    setWeight(player.weight);
    setHeight(player.height);
    setClothingSize(player.clothingSize);
    setCreateMode(false);
  };

  const handleDeletePlayer = async (playerId) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
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

  const clearForm = () => {
    setId("");
    setName("");
    setWeight("");
    setHeight("");
    setClothingSize("");
  };

  return (
    <div>
      <h2>Players</h2>
      {!isAuthenticated && <p>Please Login to access here!</p>}
      {isAuthenticated && (
        <>
          <form onSubmit={isCreateMode ? handleCreatePlayer : handleEditPlayer}>
            {!isCreateMode && (
              <div>
                <input
                  type="hidden"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
            )}
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
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div>
              <label>Height:</label>
              <input
                type="number"
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
            <button type="submit">
              {isCreateMode ? "Create Player" : "Edit Player"}
            </button>
          </form>
          <ul>
            {players.map((player) => (
              <li key={player.id}>
                {player.name} - Weight: {player.weight} - Height:{" "}
                {player.height} - Clothing Size: {player.clothingSize}
                <button onClick={() => editPlayer(player)}>Edit</button>
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
