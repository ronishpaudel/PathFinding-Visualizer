-- CreateTable
CREATE TABLE "GridConfiguration" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grid" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GridConfiguration_pkey" PRIMARY KEY ("id")
);
