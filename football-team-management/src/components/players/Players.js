import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/AuthContext";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [clothingSize, setClothingSize] = useState("");
  const { setIsAuthenticated, isAuthenticated, validateSession, handleLogout } =
    useAuth();
  const [isCreateMode, setCreateMode] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("Token:", token);
    if (token) {
      validateSession();
      fetchPlayers();
    } else {
      handleLogout(); // No token found, log out
    }
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/players", {
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
      await axios.post(
        "http://localhost:3000/api/players",
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
      await axios.put(
        `http://localhost:3000/api/players/${id}`,
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
        await axios.delete(`http://localhost:3000/api/players/${playerId}`, {
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
    <div className="players-container">
      {!isAuthenticated && <p>Please Login to access here!</p>}
      {isAuthenticated && (
        <>
          <form
            onSubmit={isCreateMode ? handleCreatePlayer : handleEditPlayer}
            className="player-form"
          >
            {!isCreateMode && (
              <div>
                <input
                  type="hidden"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="weight">Weight:</label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="height">Height:</label>
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="clothingSize">Clothing Size:</label>
              <input
                type="text"
                id="clothingSize"
                value={clothingSize}
                onChange={(e) => setClothingSize(e.target.value)}
              />
            </div>
            <button type="submit" className="btn">
              {isCreateMode ? "Create Player" : "Edit Player"}
            </button>
          </form>
          <div className="table-container">
            <table className="player-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Weight</th>
                  <th>Height</th>
                  <th>Clothing Size</th>
                  <th>Created At</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player.id}>
                    <td>{player.name}</td>
                    <td>{player.weight}</td>
                    <td>{player.height}</td>
                    <td>{player.clothingSize}</td>
                    <td>
                      {moment(player.createdAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => editPlayer(player)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeletePlayer(player.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Players;
