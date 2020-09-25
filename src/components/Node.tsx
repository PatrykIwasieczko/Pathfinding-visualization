import React from "react";

type Props = {
  key: number;
  col: number;
  row: number;
  isStart: boolean;
  isFinish: boolean;
  isVisited: boolean;
  isWall: boolean;
  handleMouseDown: (row: number, col: number) => void;
  handleMouseEnter: (row: number, col: number) => void;
  handleMouseUp: () => void;
};

const Node: React.FC<Props> = (
  {
    col,
    row,
    isFinish,
    isStart,
    isWall,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  },
) => {
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";
  return (
    <td
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
      onMouseUp={() => handleMouseUp()}
    >
    </td>
  );
};

export default Node;
