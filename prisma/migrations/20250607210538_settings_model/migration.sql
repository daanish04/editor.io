-- CreateEnum
CREATE TYPE "AutosaveMode" AS ENUM ('DISABLED', 'LOCAL', 'DB');

-- CreateEnum
CREATE TYPE "FontSize" AS ENUM ('SM', 'MD', 'LG');

-- CreateEnum
CREATE TYPE "SortBy" AS ENUM ('NAME', 'LAST_MODIFIED');

-- AlterTable
ALTER TABLE "Code" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Markdown" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "autosaveMode" "AutosaveMode" NOT NULL DEFAULT 'DISABLED',
    "keepToasts" BOOLEAN NOT NULL DEFAULT true,
    "buttonSounds" BOOLEAN NOT NULL DEFAULT true,
    "sortBy" "SortBy" NOT NULL DEFAULT 'LAST_MODIFIED',
    "fontSize" "FontSize" NOT NULL DEFAULT 'MD',
    "theme" TEXT NOT NULL DEFAULT 'dark',
    "lineNumbers" BOOLEAN NOT NULL DEFAULT true,
    "enableGFM" BOOLEAN NOT NULL DEFAULT true,
    "syntaxHighlighting" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_userId_key" ON "Settings"("userId");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
