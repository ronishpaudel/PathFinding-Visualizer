import React from "react";

interface GridProps {
  grid: number[][];
  setGrid: React.Dispatch<React.SetStateAction<number[][]>>;
  startNode: [number, number] | null;
  setStartNode: React.Dispatch<React.SetStateAction<[number, number] | null>>;
  endNode: [number, number] | null;
  setEndNode: React.Dispatch<React.SetStateAction<[number, number] | null>>;
}

const CELL_TYPES = {
  EMPTY: 0,
  WALL: 1,
  START: 2,
  END: 3,
  VISITED: 4,
  PATH: 5,
} as const;

export default function Grid({
  grid,
  setGrid,
  startNode,
  setStartNode,
  endNode,
  setEndNode,
}: GridProps) {
  const handleCellClick = (row: number, col: number) => {
    const newGrid = grid.map((row) => [...row]); // Deep copy
    const clickedCellType = newGrid[row][col];

    if (clickedCellType === CELL_TYPES.START) {
      // If clicking on start node, remove it
      newGrid[row][col] = CELL_TYPES.EMPTY;
      setStartNode(null);
    } else if (clickedCellType === CELL_TYPES.END) {
      // If clicking on end node, remove it
      newGrid[row][col] = CELL_TYPES.EMPTY;
      setEndNode(null);
    } else if (!startNode) {
      // If no start node, set it
      newGrid[row][col] = CELL_TYPES.START;
      setStartNode([row, col]);
    } else if (!endNode) {
      // If no end node, set it
      newGrid[row][col] = CELL_TYPES.END;
      setEndNode([row, col]);
    } else {
      // Toggle wall if both start and end are set
      newGrid[row][col] =
        clickedCellType === CELL_TYPES.WALL
          ? CELL_TYPES.EMPTY
          : CELL_TYPES.WALL;
    }

    setGrid(newGrid);
  };

  const getCellClassName = (cellValue: number) => {
    switch (cellValue) {
      case CELL_TYPES.WALL:
        return "bg-gray-800";
      case CELL_TYPES.START:
        return "bg-green-500";
      case CELL_TYPES.END:
        return "bg-red-500";
      case CELL_TYPES.VISITED:
        return "bg-blue-300";
      case CELL_TYPES.PATH:
        return "bg-yellow-300";
      default:
        return "bg-white";
    }
  };

  return (
    <div
      className="grid gap-px"
      style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)` }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-6 h-6 border border-gray-200 ${getCellClassName(
              cell
            )}`}
            onClick={() => handleCellClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
}
