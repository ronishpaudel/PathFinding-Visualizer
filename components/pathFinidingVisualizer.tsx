"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Grid from "./grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Algorithms,
  CellType,
  PathfindingAlgorithmType,
} from "@/lib/algorithm";

const ALGORITHMS: PathfindingAlgorithmType[] = ["BFS", "DFS", "Dijkstra", "A*"];

export default function PathfindingVisualizer() {
  const [gridSize, setGridSize] = useState<number>(20);
  const [algorithm, setAlgorithm] = useState<PathfindingAlgorithmType | null>(
    null
  );
  const [animationSpeed, setAnimationSpeed] = useState<number>(50);
  const [grid, setGrid] = useState<CellType[][]>([]);
  const [startNode, setStartNode] = useState<[number, number] | null>(null);
  const [endNode, setEndNode] = useState<[number, number] | null>(null);
  const [isVisualizing, setIsVisualizing] = useState<boolean>(false);

  useEffect(() => {
    resetGrid();
  }, [gridSize]);

  const resetGrid = useCallback((): void => {
    const newGrid: CellType[][] = Array(gridSize)
      .fill(CellType.EMPTY)
      .map(() => Array(gridSize).fill(CellType.EMPTY));
    setGrid(newGrid);
    setStartNode(null);
    setEndNode(null);
  }, [gridSize]);

  const startVisualizer = useCallback((): void => {
    if (!algorithm) {
      toast.error("Please select an algorithm before visualizing");
      return;
    }

    if (!startNode || !endNode) {
      toast.error("Please set both start and end points before visualizing");
      return;
    }

    setIsVisualizing(true);
    const delay = 101 - animationSpeed;

    let result;
    switch (algorithm) {
      case "BFS":
        result = Algorithms.bfs(grid, startNode, endNode);
        break;
      case "DFS":
        result = Algorithms.dfs(grid, startNode, endNode);
        break;
      case "Dijkstra":
        result = Algorithms.dijkstra(grid, startNode, endNode);
        break;
      case "A*":
        result = Algorithms.aStar(grid, startNode, endNode);
        break;
      default:
        toast.error("Invalid algorithm selected");
        setIsVisualizing(false);
        return;
    }

    // Visualize the path and visited nodes
    const visualizePath = () => {
      if (result.visitedNodes.length === 0) {
        toast.error("No path found!");
        setIsVisualizing(false);
        return;
      }

      // Visualize visited nodes
      result.visitedNodes.forEach(([row, col], index) => {
        setTimeout(() => {
          setGrid((prevGrid) => {
            const newGrid = [...prevGrid];
            if (
              newGrid[row][col] !== CellType.START &&
              newGrid[row][col] !== CellType.END
            ) {
              newGrid[row][col] = CellType.VISITED;
            }
            return newGrid;
          });

          // If this is the last visited node, highlight the path
          if (index === result.visitedNodes.length - 1) {
            result.path.forEach(([r, c]) => {
              setGrid((prevGrid) => {
                const newGrid = [...prevGrid];
                if (
                  newGrid[r][c] !== CellType.START &&
                  newGrid[r][c] !== CellType.END
                ) {
                  newGrid[r][c] = CellType.PATH;
                }
                return newGrid;
              });
            });
            setIsVisualizing(false);
          }
        }, index * delay);
      });
    };

    visualizePath();
  }, [algorithm, animationSpeed, grid, startNode, endNode]);

  const increaseSpeed = (): void => {
    setAnimationSpeed((prevSpeed) => Math.min(prevSpeed + 10, 100));
  };

  return (
    <div className="w-full max-w-4xl px-4 py-8">
      <div className="flex flex-col space-y-4 mb-4 md:flex-row md:justify-between md:space-y-0">
        <Select
          onValueChange={(value: PathfindingAlgorithmType) =>
            setAlgorithm(value)
          }
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Select Algorithm" />
          </SelectTrigger>
          <SelectContent>
            {ALGORITHMS.map((algo) => (
              <SelectItem key={algo} value={algo}>
                {algo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
          <span className="text-sm">
            Grid Size: {gridSize}x{gridSize}
          </span>
          <Slider
            min={5}
            max={50}
            step={1}
            value={[gridSize]}
            onValueChange={(value: number[]) => setGridSize(value[0])}
            className="w-full md:w-[200px]"
          />
        </div>
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
          <span className="text-sm">Speed: {animationSpeed}%</span>
          <Slider
            min={1}
            max={100}
            step={1}
            value={[animationSpeed]}
            onValueChange={(value: number[]) => setAnimationSpeed(value[0])}
            className="w-full md:w-[200px]"
          />
        </div>
      </div>
      <Grid
        grid={grid}
        setGrid={setGrid}
        startNode={startNode}
        setStartNode={setStartNode}
        endNode={endNode}
        setEndNode={setEndNode}
      />
      <div className="flex flex-col space-y-4 mt-4 md:flex-row md:justify-between md:space-y-0">
        <Button onClick={resetGrid} disabled={isVisualizing}>
          Reset Grid
        </Button>
        <Button
          onClick={startVisualizer}
          disabled={isVisualizing || !algorithm || !startNode || !endNode}
        >
          {isVisualizing ? "Visualizing..." : "Visualize"}
        </Button>
        {isVisualizing && (
          <Button onClick={increaseSpeed}>Increase Speed</Button>
        )}
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}
