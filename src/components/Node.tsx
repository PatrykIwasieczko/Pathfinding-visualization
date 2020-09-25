import React from "react";

type Props = {
  key: number;
  col: number;
  row: number;
  isStart: boolean;
  isFinish: boolean;
  isVisited: boolean;
  isWall: boolean;
};

const Node: React.FC<Props> = (
  { key, col, row, isFinish, isStart, isWall },
) => {
  return (
    <td key={key}>
      Node
    </td>
  );
};

export default Node;
