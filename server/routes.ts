import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { dateOfBirthSchema } from "@shared/schema";
import { spawn } from "child_process";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Calculate numerology analysis
  app.post("/api/calculate-numerology", async (req, res) => {
    try {
      const { day, month, year } = dateOfBirthSchema.parse(req.body);

      // Run Python script for calculations
      const pythonScript = path.join(process.cwd(), "server", "numerology.py");
      const pythonProcess = spawn("python3", [pythonScript, day.toString(), month.toString(), year.toString()]);

      let output = "";
      let errorOutput = "";

      pythonProcess.stdout.on("data", (data) => {
        output += data.toString();
      });

      pythonProcess.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      pythonProcess.on("close", async (code) => {
        if (code !== 0) {
          console.error("Python script error:", errorOutput);
          return res.status(500).json({ error: "Failed to calculate numerology" });
        }

        try {
          const analysis = JSON.parse(output);
          
          // Store the analysis
          const savedAnalysis = await storage.createNumerologyAnalysis({
            inputDate: `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`,
            day,
            month,
            year,
            analysis,
            createdAt: new Date().toISOString(),
          });

          res.json(analysis);
        } catch (parseError) {
          console.error("Failed to parse Python output:", parseError);
          res.status(500).json({ error: "Failed to parse analysis results" });
        }
      });

    } catch (error) {
      console.error("Numerology calculation error:", error);
      res.status(400).json({ error: "Invalid input data" });
    }
  });

  // Generate AI-enhanced analysis
  app.post("/api/generate-ai-analysis", async (req, res) => {
    try {
      const { analysis } = req.body;

      if (!analysis) {
        return res.status(400).json({ error: "Analysis data required" });
      }

      const openRouterApiKey = process.env.OPENROUTER_API_KEY || "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";

      if (!openRouterApiKey) {
        return res.status(500).json({ error: "OpenRouter API key not configured" });
      }

      // Prepare prompt for AI analysis
      const prompt = `As a professional Vedic numerologist, provide a detailed analysis based on the following numerological profile:

Psychic Number: ${analysis.psychic_number.number} (${analysis.psychic_number.planet})
Destiny Number: ${analysis.destiny_number.number} (${analysis.destiny_number.planet})
Present Numbers: ${analysis.lusho_grid.present_numbers.join(', ')}
Missing Numbers: ${analysis.lusho_grid.missing_numbers.join(', ')}
Friendly Numbers: ${analysis.friendly_unfriendly.friendly.join(', ')}
Unfriendly Numbers: ${analysis.friendly_unfriendly.unfriendly.join(', ')}
Yogas Found: ${analysis.yogas_found.map((y: any) => y.name).join(', ')}

Please provide:
1. A comprehensive personality analysis
2. Life path insights and recommendations
3. Career and relationship guidance
4. Spiritual and personal growth suggestions
5. Specific advice for leveraging strengths and addressing challenges

Keep the analysis professional, insightful, and actionable. Format in well-structured paragraphs.`;

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openRouterApiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5000",
          "X-Title": "Vedic Numerology Calculator"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.1-405b-instruct",
          messages: [
            {
              role: "system",
              content: "You are an expert Vedic numerologist with deep knowledge of ancient Indian numerology traditions. Provide detailed, accurate, and insightful numerological analyses."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.statusText}`);
      }

      const aiResponse = await response.json();
      const aiAnalysis = aiResponse.choices[0]?.message?.content;

      if (!aiAnalysis) {
        throw new Error("No analysis generated from AI");
      }

      res.json({ aiAnalysis });

    } catch (error) {
      console.error("AI analysis error:", error);
      res.status(500).json({ error: "Failed to generate AI analysis" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
