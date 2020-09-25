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
    <table className="board">
      <tbody className="table-body">
        {grid.map((gridRow, rowIndex) => (
          <tr className="board-row" key={rowIndex}>
            {gridRow.map((node, nodeIndex) => {
              const { row, col, isFinish, isStart, isWall, isVisited } = node;
              return (
                <Node
                  key={nodeIndex}
                  row={row}
                  col={col}
                  isFinish={isFinish}
                  isVisited={isVisited}
                  isStart={isStart}
                  isWall={isWall}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PathfindingVisualizer;
