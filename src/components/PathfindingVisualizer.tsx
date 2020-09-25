import React, { useEffect, useState } from "react";
import { getInitialGrid, getNewGridWithWallToggled } from "../helpers/helpers";
import { NodeType } from "../helpers/Types";
import Node from "./Node";

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState<NodeType[][]>([]);
  const [mouseIsPressed, setMouseIsPressed] = useState<boolean>(false);

  // Mouse events

  // Clicking mouse button, but not releasing
  const handleMouseDown = (row: number, col: number) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };
  // Moving mouse
  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };
  // Releasing mouse button
  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  useEffect(() => {
    setGrid(getInitialGrid());
  }, []);
  return (
    <table className="board">
      <tbody className="table-body">
        {grid.map((row, rowIndex) => (
          <tr className="board-row" key={rowIndex}>
            {row.map((node, nodeIndex) => {
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
                  handleMouseDown={handleMouseDown}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseUp={handleMouseUp}
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
