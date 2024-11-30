# Pathfinding Visualizer

A React-based application for visualizing various pathfinding algorithms, such as BFS, DFS, Dijkstra, and A\*. The tool lets users set up a grid with walls, start, and end nodes, and watch how different algorithms find the shortest path.

## Features

- **Interactive Grid:** Click to toggle walls, set start and end points.
- **Algorithm Selection:** Choose from BFS, DFS, Dijkstra, and A\*.
- **Visualization:** See the algorithms in action with adjustable animation speed.
- **Configurable Grid:** Adjust grid size dynamically.
- **State Persistence:** Save and load grid configurations.
- **Modern UI:** Built with React and Tailwind CSS for a clean and responsive design.

## Tech Stack

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - React Hook Form
  - Toastify
- **Backend:**
  - Node.js (for grid configuration management)
- **UI Components:**
  - Custom-built components for Grid and UI controls
  - `@radix-ui/react-select` for dropdowns
  - `@shadcn/ui` for sliders and inputs

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/pathfinding-visualizer.git
   cd pathfinding-visualizer
   ```

2. Installation

Start the development server:

```bash
npm run dev
```

3. Open the app in your browser:

http://localhost:3000

## Usage

1. Grid Controls

Set Start Node: Click an empty cell
Set End Node: Click another empty cell after setting the start node
Toggle Walls: Click any other cell to add/remove a wall

2. Configuration

Save Configuration: Enter a name and click the save button
Load Configuration: Select a saved configuration from the dropdown

3. Visualization

Choose an algorithm from the dropdown
Set a start and end point
Click the "Visualize" button to start the algorithm

4. Adjust Animation Speed
   Use the slider to control the visualization speed

## Future Enhancements

Add diagonal movement for algorithms
Support for weighted grids and obstacles
Export and import configurations as JSON
Add more algorithms (e.g., Greedy Best-First Search)

## Contributing

Contributions are welcome! Please follow these steps:

Open an issue to discuss proposed changes
Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
