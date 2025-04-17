/*
  Warnings:

  - A unique constraint covering the columns `[name,price,image,description,category]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Product_name_price_description_category_key";

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_price_image_description_category_key" ON "Product"("name", "price", "image", "description", "category");
