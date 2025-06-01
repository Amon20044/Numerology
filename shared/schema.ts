import { z } from "zod";

// Validation schemas for the API
export const dateOfBirthSchema = z.object({
  day: z.number().min(1).max(31),
  month: z.number().min(1).max(12),
  year: z.number().min(1900).max(2100),
});

export type DateOfBirth = z.infer<typeof dateOfBirthSchema>;
