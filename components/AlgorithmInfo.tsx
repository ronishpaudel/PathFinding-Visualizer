import React from "react";
import { Button } from "@/components/ui/button";
import { Info, Map, Route, Search } from "lucide-react";

const AlgorithmInfo: React.FC = () => {
  return (
    <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Info className="mr-2 text-blue-600" />
        Pathfinding Algorithms
      </h2>

      <p className="mb-4 text-gray-700">
        This pathfinding visualizer implements four popular grid-based search
        algorithms, each with unique exploration strategies.
      </p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Map className="mr-2 text-green-600" />
            Breadth-First Search (BFS)
          </h3>
          <p className="mb-2">
            <strong>Exploration Strategy:</strong> Explores all neighboring
            nodes at the current depth before moving deeper.
          </p>
          <ul className="list-disc pl-5 mb-2">
            <li>Uses a queue data structure</li>
            <li>Guarantees the shortest path in unweighted grids</li>
            <li>Explores nodes level by level</li>
          </ul>
          <div className="bg-blue-50 p-2 rounded">
            <pre className="text-sm text-gray-700">
              {`// Key Implementation Details
function bfs(grid, start, end):
  - Maintains a queue of nodes to explore
  - Tracks visited nodes to avoid revisiting
  - Builds path while exploring
  - Stops when end node is reached
  - Explores in 4 directions: Up, Down, Left, Right`}
            </pre>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Best for: Finding shortest paths in uniform-cost grids
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Search className="mr-2 text-purple-600" />
            Depth-First Search (DFS)
          </h3>
          <p className="mb-2">
            <strong>Exploration Strategy:</strong> Explores as deep as possible
            along each branch before backtracking.
          </p>
          <ul className="list-disc pl-5 mb-2">
            <li>Uses a stack data structure</li>
            <li>Does not guarantee the shortest path</li>
            <li>Explores one path completely before trying alternatives</li>
          </ul>
          <div className="bg-purple-50 p-2 rounded">
            <pre className="text-sm text-gray-700">
              {`// Key Implementation Details
function dfs(grid, start, end):
  - Uses a stack instead of a queue
  - Explores neighbors in reverse order
  - Tracks visited nodes
  - Builds path during exploration
  - Stops when end node is found`}
            </pre>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Best for: Exploring all possible paths, maze generation
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Route className="mr-2 text-orange-600" />
            Dijkstra's Algorithm
          </h3>
          <p className="mb-2">
            <strong>Exploration Strategy:</strong> Finds the shortest path by
            systematically exploring nodes with minimum distance.
          </p>
          <ul className="list-disc pl-5 mb-2">
            <li>Uses a priority queue</li>
            <li>
              Assumes uniform cost for all moves (1 in this implementation)
            </li>
            <li>Tracks and updates minimum distances</li>
          </ul>
          <div className="bg-orange-50 p-2 rounded">
            <pre className="text-sm text-gray-700">
              {`// Key Implementation Details
function dijkstra(grid, start, end):
  - Maintains distances to each node
  - Uses sorted priority queue
  - Explores neighbors with minimum distance
  - Uniform cost of 1 for all moves
  - Builds path during exploration`}
            </pre>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Best for: Finding shortest paths in uniform-cost grids
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Route className="mr-2 text-red-600" />
            A* Search Algorithm
          </h3>
          <p className="mb-2">
            <strong>Exploration Strategy:</strong> Uses heuristics to guide
            search, making it more efficient than Dijkstra's.
          </p>
          <ul className="list-disc pl-5 mb-2">
            <li>Uses Manhattan distance as heuristic</li>
            <li>Calculates f-score (g-score + heuristic)</li>
            <li>Prioritizes nodes closer to the goal</li>
          </ul>
          <div className="bg-red-50 p-2 rounded">
            <pre className="text-sm text-gray-700">
              {`// Key Implementation Details
function aStar(grid, start, end):
  - Uses Manhattan distance heuristic
  - Maintains g-scores and f-scores
  - Prioritizes nodes with lowest f-score
  - Builds path during exploration
  - More efficient path finding`}
            </pre>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Best for: Efficient pathfinding with estimated distance to goal
          </p>
        </div>
      </div>

      <p className="mt-4 text-gray-700">
        Grid Exploration Details: - 4-directional movement (Up, Down, Left,
        Right) - Avoids walls and out-of-bounds cells - Tracks visited nodes for
        visualization
      </p>

      <Button
        onClick={() =>
          window.open(
            "https://github.com/ronishpaudel/pathfinding-visualizer",
            "_blank"
          )
        }
        className="mt-4 flex items-center"
      >
        <Search className="mr-2" /> View Project on GitHub
      </Button>
    </div>
  );
};

export default AlgorithmInfo;
