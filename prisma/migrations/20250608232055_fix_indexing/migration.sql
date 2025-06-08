-- DropIndex
DROP INDEX "Code_userId_createdAt_idx";

-- DropIndex
DROP INDEX "Markdown_userId_createdAt_idx";

-- CreateIndex
CREATE INDEX "Code_userId_name_updatedAt_idx" ON "Code"("userId", "name", "updatedAt");

-- CreateIndex
CREATE INDEX "Markdown_userId_name_updatedAt_idx" ON "Markdown"("userId", "name", "updatedAt");
