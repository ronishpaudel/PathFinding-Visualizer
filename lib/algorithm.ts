// Enum cell types
export enum CellType {
  EMPTY = 0,
  WALL = 1,
  START = 2,
  END = 3,
  VISITED = 4,
  PATH = 5,
}

// Type for pathfinding algorithms
export type PathfindingAlgorithmType = "BFS" | "DFS" | "Dijkstra" | "A*";

// Type definitions for path finding
export interface PathfindingResult {
  path: [number, number][];
  visitedNodes: [number, number][];
}

export class Algorithms {
  // Utility method to get valid neighbors
  private static getNeighbors(
    grid: CellType[][],
    row: number,
    col: number
  ): [number, number][] {
    const neighbors: [number, number][] = [
      [row - 1, col], // Up
      [row + 1, col], // Down
      [row, col - 1], // Left
      [row, col + 1], // Right
    ];

    return neighbors.filter(
      ([r, c]) =>
        r >= 0 &&
        r < grid.length &&
        c >= 0 &&
        c < grid[0].length &&
        grid[r][c] !== CellType.WALL
    );
  }

  // Breadth-First Search (BFS)
  static bfs(
    grid: CellType[][],
    start: [number, number],
    end: [number, number]
  ): PathfindingResult {
    const visited = new Set<string>();
    const queue: Array<[number, number, [number, number][]]> = [
      [...start, [start]],
    ];
    const visitedNodes: [number, number][] = [];

    while (queue.length > 0) {
      const [row, col, path] = queue.shift()!;
      const key = `${row},${col}`;

      // Skip if already visited or out of bounds
      if (visited.has(key)) continue;
      visited.add(key);
      visitedNodes.push([row, col]);

      // Check if reached end
      if (row === end[0] && col === end[1]) {
        return { path, visitedNodes };
      }

      // Explore neighbors
      const neighbors = this.getNeighbors(grid, row, col);
      for (const [nr, nc] of neighbors) {
        if (!visited.has(`${nr},${nc}`)) {
          queue.push([nr, nc, [...path, [nr, nc]]]);
        }
      }
    }

    // No path found
    return { path: [], visitedNodes };
  }

  // Depth-First Search (DFS)
  static dfs(
    grid: CellType[][],
    start: [number, number],
    end: [number, number]
  ): PathfindingResult {
    const visited = new Set<string>();
    const stack: Array<[number, number, [number, number][]]> = [
      [...start, [start]],
    ];
    const visitedNodes: [number, number][] = [];

    while (stack.length > 0) {
      const [row, col, path] = stack.pop()!;
      const key = `${row},${col}`;

      // Skip if already visited
      if (visited.has(key)) continue;
      visited.add(key);
      visitedNodes.push([row, col]);

      // Check if reached end
      if (row === end[0] && col === end[1]) {
        return { path, visitedNodes };
      }

      // Explore neighbors (in reverse to maintain DFS behavior)
      const neighbors = this.getNeighbors(grid, row, col).reverse();
      for (const [nr, nc] of neighbors) {
        if (!visited.has(`${nr},${nc}`)) {
          stack.push([nr, nc, [...path, [nr, nc]]]);
        }
      }
    }

    // No path found
    return { path: [], visitedNodes };
  }

  // Dijkstra's Algorithm (with uniform cost)
  static dijkstra(
    grid: CellType[][],
    start: [number, number],
    end: [number, number]
  ): PathfindingResult {
    const rows = grid.length;
    const cols = grid[0].length;

    // Initialize distances and previous nodes
    const distances = Array.from({ length: rows }, () =>
      Array(cols).fill(Infinity)
    );
    distances[start[0]][start[1]] = 0;

    const visited = new Set<string>();
    const pq: Array<[number, number, number, [number, number][]]> = [
      [0, start[0], start[1], [start]],
    ];
    const visitedNodes: [number, number][] = [];

    while (pq.length > 0) {
      // Sort and get the node with minimum distance
      pq.sort((a, b) => a[0] - b[0]);
      const [dist, row, col, path] = pq.shift()!;
      const key = `${row},${col}`;

      // Skip if already visited
      if (visited.has(key)) continue;
      visited.add(key);
      visitedNodes.push([row, col]);

      // Check if reached end
      if (row === end[0] && col === end[1]) {
        return { path, visitedNodes };
      }

      // Explore neighbors
      const neighbors = this.getNeighbors(grid, row, col);
      for (const [nr, nc] of neighbors) {
        const newDist = dist + 1; // Uniform cost

        if (newDist < distances[nr][nc]) {
          distances[nr][nc] = newDist;
          pq.push([newDist, nr, nc, [...path, [nr, nc]]]);
        }
      }
    }

    // No path found
    return { path: [], visitedNodes };
  }

  // A* Algorithm
  static aStar(
    grid: CellType[][],
    start: [number, number],
    end: [number, number]
  ): PathfindingResult {
    // Heuristic: Manhattan distance
    const heuristic = (a: [number, number], b: [number, number]): number => {
      return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
    };

    const rows = grid.length;
    const cols = grid[0].length;

    // Initialize distances and previous nodes
    const fScores = Array.from({ length: rows }, () =>
      Array(cols).fill(Infinity)
    );
    const gScores = Array.from({ length: rows }, () =>
      Array(cols).fill(Infinity)
    );

    fScores[start[0]][start[1]] = heuristic(start, end);
    gScores[start[0]][start[1]] = 0;

    const visited = new Set<string>();
    const pq: Array<[number, number, number, [number, number][]]> = [
      [fScores[start[0]][start[1]], start[0], start[1], [start]],
    ];
    const visitedNodes: [number, number][] = [];

    while (pq.length > 0) {
      // Sort and get the node with minimum f-score
      pq.sort((a, b) => a[0] - b[0]);
      const [, row, col, path] = pq.shift()!;
      const key = `${row},${col}`;

      // Skip if already visited
      if (visited.has(key)) continue;
      visited.add(key);
      visitedNodes.push([row, col]);

      // Check if reached end
      if (row === end[0] && col === end[1]) {
        return { path, visitedNodes };
      }

      // Explore neighbors
      const neighbors = this.getNeighbors(grid, row, col);
      for (const [nr, nc] of neighbors) {
        const tentativeGScore = gScores[row][col] + 1;

        if (tentativeGScore < gScores[nr][nc]) {
          gScores[nr][nc] = tentativeGScore;
          const fScore = tentativeGScore + heuristic([nr, nc], end);
          pq.push([fScore, nr, nc, [...path, [nr, nc]]]);
        }
      }
    }

    // No path found
    return { path: [], visitedNodes };
  }
}
