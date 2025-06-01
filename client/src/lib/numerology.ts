import { apiRequest } from "./queryClient";

export interface NumerologyAnalysis {
  input_dob: string;
  psychic_number: {
    number: number;
    planet: string;
  };
  destiny_number: {
    number: number;
    planet: string;
  };
  planetary_associations: Record<number, string>;
  lusho_grid: {
    grid_population: Record<number, number[]>;
    present_numbers: number[];
    missing_numbers: number[];
    number_counts: Record<number, number>;
  };
  friendly_unfriendly: {
    based_on_psychic: number;
    friendly: number[];
    unfriendly: number[];
  };
  simplified_mahadasha_sequence: Array<{
    number: number;
    planet: string;
    duration: number;
  }>;
  yogas_found: Array<{
    name: string;
    description: string;
  }>;
}

export interface DateOfBirth {
  day: number;
  month: number;
  year: number;
}

export async function calculateNumerology(dateOfBirth: DateOfBirth): Promise<NumerologyAnalysis> {
  const response = await apiRequest("POST", "/api/calculate-numerology", dateOfBirth);
  return response.json();
}

export async function generateAIAnalysis(analysis: NumerologyAnalysis): Promise<{ aiAnalysis: string }> {
  const response = await apiRequest("POST", "/api/generate-ai-analysis", { analysis });
  return response.json();
}
