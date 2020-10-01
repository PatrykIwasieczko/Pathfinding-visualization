import {
  FINISH_NODE_COL,
  FINISH_NODE_ROW,
  START_NODE_COL,
  START_NODE_ROW,
} from "../helpers/constants";
import { NodeType } from "../helpers/Types";

export const dijkstra = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType,
) => {
  const visitedNodesInOrder: NodeType[] = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    // If closest node is a wall we skip it.
    if (closestNode!.isWall) continue;

    // If closest node is at a distance of infinity algorithm
    // cannot continue
    if (closestNode!.distance === Infinity) return visitedNodesInOrder;

    closestNode!.isVisited = true;
    visitedNodesInOrder.push(closestNode!);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode!, grid);
  }
};

const sortNodesByDistance = (unvisitedNodes: NodeType[]) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const getAllNodes = (grid: NodeType[][]) => {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

const getUnvisitedNeighbors = (node: NodeType, grid: NodeType[][]) => {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) {
    neighbors.push(grid[row - 1][col]);
  }
  if (row < grid.length - 1) {
    neighbors.push(grid[row + 1][col]);
  }
  if (col > 0) {
    neighbors.push(grid[row][col - 1]);
  }
  if (col < grid[0].length - 1) {
    neighbors.push(grid[row][col + 1]);
  }
  return neighbors.filter((neighbor) => !neighbor.isVisited);
};

const updateUnvisitedNeighbors = (node: NodeType, grid: NodeType[][]) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};

export const visualizeDijkstra = (grid: NodeType[][]) => {
  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
  const nodesInShortestOrder = getShortestPath(finishNode);
  animateDijkstra(visitedNodesInOrder!, nodesInShortestOrder);
};

const animateDijkstra = (
  visitedNodesInOrder: NodeType[],
  nodesInShortestOrder: NodeType[],
) => {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(nodesInShortestOrder);
      }, 10 * i);
      return;
    }
    setTimeout(() => {
      const node = visitedNodesInOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`)!.className =
        "node node-visited";
    }, 10 * i);
  }
};

export const getShortestPath = (finishNode: NodeType) => {
  const nodesInShortestPath = [];
  let currentNode: NodeType | null = finishNode;
  while (currentNode !== null) {
    nodesInShortestPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPath;
};

const animateShortestPath = (nodesInShortestPath: NodeType[]) => {
  for (let i = 0; i < nodesInShortestPath.length; i++) {
    setTimeout(() => {
      const node = nodesInShortestPath[i];
      document.getElementById(`node-${node.row}-${node.col}`)!.className =
        "node node-shortest-path";
    }, 50 * i);
  }
};
