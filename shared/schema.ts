import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const numerologyAnalyses = pgTable("numerology_analyses", {
  id: serial("id").primaryKey(),
  inputDate: text("input_date").notNull(),
  day: integer("day").notNull(),
  month: integer("month").notNull(),
  year: integer("year").notNull(),
  analysis: jsonb("analysis").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertNumerologyAnalysisSchema = createInsertSchema(numerologyAnalyses).pick({
  inputDate: true,
  day: true,
  month: true,
  year: true,
  analysis: true,
  createdAt: true,
});

export type InsertNumerologyAnalysis = z.infer<typeof insertNumerologyAnalysisSchema>;
export type NumerologyAnalysis = typeof numerologyAnalyses.$inferSelect;

// Validation schemas for the API
export const dateOfBirthSchema = z.object({
  day: z.number().min(1).max(31),
  month: z.number().min(1).max(12),
  year: z.number().min(1900).max(2100),
});

export type DateOfBirth = z.infer<typeof dateOfBirthSchema>;
