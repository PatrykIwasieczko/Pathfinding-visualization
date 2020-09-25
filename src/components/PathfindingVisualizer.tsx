import React, { useEffect, useState } from "react";
import { getInitialGrid } from "../helpers/helpers";
import { NodeType } from "../helpers/Types";
import Node from "./Node";

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState<NodeType[][]>([]);

  useEffect(() => {
    setGrid(getInitialGrid());
  }, []);
  return (
    <div>
      <Node />
    </div>
  );
};

export default PathfindingVisualizer;
