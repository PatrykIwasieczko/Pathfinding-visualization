import {
  START_NODE_COL,
  START_NODE_ROW,
  FINISH_NODE_COL,
  FINISH_NODE_ROW,
} from "./constants";
import { NodeType } from "./Types";

export const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 28; row++) {
    const currentRow = [];
    for (let col = 0; col < 73; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col: number, row: number) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

export const getNewGridWithWallToggled = (
  grid: NodeType[][],
  row: number,
  col: number,
) => {
  let newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
