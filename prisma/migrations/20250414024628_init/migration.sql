/*
  Warnings:

  - Added the required column `category` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `category` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `slider` (
    `slider_id` INTEGER NOT NULL AUTO_INCREMENT,
    `slider_image` VARCHAR(255) NOT NULL,
    `active` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`slider_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_history` (
    `transaction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `trx_id` VARCHAR(255) NOT NULL,
    `product_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
