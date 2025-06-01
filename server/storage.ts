import { numerologyAnalyses, type NumerologyAnalysis, type InsertNumerologyAnalysis } from "@shared/schema";

export interface IStorage {
  getNumerologyAnalysis(id: number): Promise<NumerologyAnalysis | undefined>;
  createNumerologyAnalysis(analysis: InsertNumerologyAnalysis): Promise<NumerologyAnalysis>;
  getNumerologyAnalysesByDate(day: number, month: number, year: number): Promise<NumerologyAnalysis[]>;
}

export class MemStorage implements IStorage {
  private analyses: Map<number, NumerologyAnalysis>;
  private currentId: number;

  constructor() {
    this.analyses = new Map();
    this.currentId = 1;
  }

  async getNumerologyAnalysis(id: number): Promise<NumerologyAnalysis | undefined> {
    return this.analyses.get(id);
  }

  async createNumerologyAnalysis(insertAnalysis: InsertNumerologyAnalysis): Promise<NumerologyAnalysis> {
    const id = this.currentId++;
    const analysis: NumerologyAnalysis = { ...insertAnalysis, id };
    this.analyses.set(id, analysis);
    return analysis;
  }

  async getNumerologyAnalysesByDate(day: number, month: number, year: number): Promise<NumerologyAnalysis[]> {
    return Array.from(this.analyses.values()).filter(
      (analysis) => analysis.day === day && analysis.month === month && analysis.year === year
    );
  }
}

export const storage = new MemStorage();
