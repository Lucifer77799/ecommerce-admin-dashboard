import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Product name is required")
    .max(100, "Product name must be less than 100 characters"),

  description: z
    .string()
    .trim()
    .max(1000, "Description must be under 1000 characters")
    .optional(),

  price: z
    .coerce
    .number()
    .finite("Price must be a valid number")
    .positive("Price must be greater than 0")
    .max(1_000_000, "Price is unrealistically high"),

  stock: z
    .coerce
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .max(1_000_000, "Stock limit exceeded"),

  image: z
    .string()
    .url("Image must be a valid URL")
    .optional(),
});
