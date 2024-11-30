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
import { Input } from "@/components/ui/input";
import Grid from "./grid";
import {
  saveGridConfiguration,
  loadGridConfiguration,
  listGridConfigurations,
} from "../app/actions/gridActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Enum for cell types for better type safety
enum CellType {
  EMPTY = 0,
  WALL = 1,
  START = 2,
  END = 3,
  VISITED = 4,
  PATH = 5,
}

// Type for grid configuration
interface GridConfiguration {
  id: string;
  name: string;
  grid: CellType[][];
  createdAt?: Date;
}

// Type for saved configuration from the server
interface SavedConfigFromServer {
  id: string;
  name: string;
  createdAt: Date;
}

// Type for algorithm selection
type PathfindingAlgorithm = "BFS" | "DFS" | "Dijkstra" | "A*";

const ALGORITHMS: PathfindingAlgorithm[] = ["BFS", "DFS", "Dijkstra", "A*"];

export default function PathfindingVisualizer() {
  // Explicit type annotations for state
  const [gridSize, setGridSize] = useState<number>(20);
  const [algorithm, setAlgorithm] = useState<PathfindingAlgorithm | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState<number>(50);
  const [grid, setGrid] = useState<CellType[][]>([]);
  const [startNode, setStartNode] = useState<[number, number] | null>(null);
  const [endNode, setEndNode] = useState<[number, number] | null>(null);
  const [configName, setConfigName] = useState<string>("");
  const [savedConfigs, setSavedConfigs] = useState<GridConfiguration[]>([]);
  const [isVisualizing, setIsVisualizing] = useState<boolean>(false);

  useEffect(() => {
    resetGrid();
    fetchSavedConfigurations();
  }, [gridSize]);

  const resetGrid = useCallback((): void => {
    const newGrid: CellType[][] = Array(gridSize)
      .fill(CellType.EMPTY)
      .map(() => Array(gridSize).fill(CellType.EMPTY));
    setGrid(newGrid);
    setStartNode(null);
    setEndNode(null);
  }, [gridSize]);

  const fetchSavedConfigurations = async (): Promise<void> => {
    try {
      const result = await listGridConfigurations();
      if (result.success && result.configs) {
        // Transform server configs to GridConfiguration
        const transformedConfigs: GridConfiguration[] = (
          result.configs as SavedConfigFromServer[]
        ).map((config) => ({
          id: config.id,
          name: config.name,
          grid: [], // This should be populated when actually loading the configuration
          createdAt: config.createdAt,
        }));
        setSavedConfigs(transformedConfigs);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error fetching configurations:", error);
      // toast.error("Failed to fetch saved configurations");
    }
  };

  const handleSaveConfiguration = async (): Promise<void> => {
    if (!configName) {
      toast.error("Please enter a name for the configuration");
      return;
    }
    try {
      const result = await saveGridConfiguration(configName, grid);
      if (result.success) {
        toast.success("Grid configuration saved successfully!");
        setConfigName("");
        fetchSavedConfigurations();
      } else {
        toast.error("Failed to save grid configuration. Please try again.");
      }
    } catch (error) {
      console.error("Save configuration error:", error);
      toast.error("An error occurred while saving the configuration");
    }
  };

  const handleLoadConfiguration = async (id: string): Promise<void> => {
    try {
      const result = await loadGridConfiguration(id);

      if (result.success && result.config) {
        const loadedGrid = result.config.grid as CellType[][];
        if (Array.isArray(loadedGrid) && loadedGrid.length > 0) {
          setGrid(loadedGrid);
          setGridSize(loadedGrid.length);

          // Find start and end nodes in the loaded grid
          let foundStart: [number, number] | null = null;
          let foundEnd: [number, number] | null = null;

          for (let i = 0; i < loadedGrid.length; i++) {
            for (let j = 0; j < loadedGrid[i].length; j++) {
              if (loadedGrid[i][j] === CellType.START) foundStart = [i, j];
              if (loadedGrid[i][j] === CellType.END) foundEnd = [i, j];
            }
          }

          setStartNode(foundStart);
          setEndNode(foundEnd);
        } else {
          toast.error("Invalid grid configuration");
        }
      } else {
        toast.error("Failed to load grid configuration. Please try again.");
      }
    } catch (error) {
      console.error("Load configuration error:", error);
      toast.error("An error occurred while loading the configuration");
    }
  };

  const startVisualizer = useCallback((): void => {
    // Null checks with type guards
    if (!algorithm) {
      toast.error("Please select an algorithm before visualizing");
      return;
    }

    if (!startNode || !endNode) {
      toast.error("Please set both start and end points before visualizing");
      return;
    }

    setIsVisualizing(true);
    const visited = new Set<string>();
    const queue: Array<[number, number, [number, number][]]> = [
      [...startNode, []],
    ]; // [row, col, path]
    const delay = 101 - animationSpeed;

    const visualize = (): void => {
      if (queue.length === 0) {
        setIsVisualizing(false);
        return;
      }

      const currentItem = queue.shift();
      if (!currentItem) {
        setIsVisualizing(false);
        return;
      }

      const [row, col, path] = currentItem;
      const key = `${row},${col}`;

      if (
        row < 0 ||
        row >= gridSize ||
        col < 0 ||
        col >= gridSize ||
        visited.has(key) ||
        grid[row][col] === CellType.WALL
      ) {
        setTimeout(visualize, delay);
        return;
      }

      visited.add(key);
      const newPath: [number, number][] = [...path, [row, col]];

      if (row === endNode[0] && col === endNode[1]) {
        // Found the end node, highlight the path
        newPath.forEach(([r, c]) => {
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
        return;
      }

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

      queue.push(
        [row - 1, col, newPath],
        [row + 1, col, newPath],
        [row, col - 1, newPath],
        [row, col + 1, newPath]
      );
      setTimeout(visualize, delay);
    };

    visualize();
  }, [algorithm, animationSpeed, grid, gridSize, startNode, endNode]);

  const increaseSpeed = (): void => {
    setAnimationSpeed((prevSpeed) => Math.min(prevSpeed + 10, 100));
  };

  return (
    <div className="w-full max-w-4xl px-4 py-8">
      <div className="flex flex-col space-y-4 mb-4 md:flex-row md:justify-between md:space-y-0">
        <Select
          onValueChange={(value: PathfindingAlgorithm) => setAlgorithm(value)}
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
        <Button onClick={resetGrid}>Reset Grid</Button>
        <Button onClick={startVisualizer} disabled={isVisualizing}>
          {isVisualizing ? "Visualizing..." : "Visualize"}
        </Button>
        {isVisualizing && (
          <Button onClick={increaseSpeed}>Increase Speed</Button>
        )}
        {/* <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Configuration Name"
            value={configName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfigName(e.target.value)
            }
            className="w-full md:w-auto"
          />
          <Button onClick={handleSaveConfiguration}>Save Configuration</Button>
        </div> */}
      </div>
      {/* <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Saved Configurations</h3>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {savedConfigs.map((config) => (
            <Button
              key={config.id}
              onClick={() => handleLoadConfiguration(config.id)}
              className="w-full"
            >
              {config.name}
            </Button>
          ))}
        </div>
      </div> */}
      <ToastContainer position="top-right" />
    </div>
  );
}
