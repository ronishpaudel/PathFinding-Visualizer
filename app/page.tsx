"use client";
import AlgorithmInfo from "@/components/AlgorithmInfo";
import PathfindingVisualizer from "@/components/pathFinidingVisualizer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5 md:p-24">
      <h1 className="text-4xl font-bold mb-8">Pathfinding Visualizer</h1>
      <PathfindingVisualizer />
      <AlgorithmInfo />
    </main>
  );
}
