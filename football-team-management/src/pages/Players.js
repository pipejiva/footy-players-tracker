import React from "react";
import useComponents from "../components";

const PlayersPage = () => {
  const { Players } = useComponents();

  return (
    <div>
      <h1>Players Page</h1>
      <Players />
    </div>
  );
};

export default PlayersPage;
