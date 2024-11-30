"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";

export async function saveGridConfiguration(name: string, grid: number[][]) {
  try {
    const savedConfig = await prisma.gridConfiguration.create({
      data: {
        name,
        grid: grid,
      },
    });

    revalidatePath("/");
    return { success: true, id: savedConfig.id };
  } catch (error) {
    console.error("Failed to save grid configuration:", error);
    return { success: false, error: "Failed to save grid configuration" };
  }
}

export async function loadGridConfiguration(id: string) {
  try {
    const config = await prisma.gridConfiguration.findUnique({
      where: { id },
    });

    if (!config) {
      return { success: false, error: "Configuration not found" };
    }

    return { success: true, config };
  } catch (error) {
    console.error("Failed to load grid configuration:", error);
    return { success: false, error: "Failed to load grid configuration" };
  }
}

export async function listGridConfigurations() {
  try {
    const configs = await prisma.gridConfiguration.findMany({
      select: { id: true, name: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, configs };
  } catch (error) {
    console.error("Failed to list grid configurations:", error);
    return { success: false, error: "Failed to list grid configurations" };
  }
}
