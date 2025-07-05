/*
  Warnings:

  - A unique constraint covering the columns `[unique_id]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[unique_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_authorId_fkey";

-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "authorId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Blog_unique_id_key" ON "Blog"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_unique_id_key" ON "User"("unique_id");

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("unique_id") ON DELETE RESTRICT ON UPDATE CASCADE;
