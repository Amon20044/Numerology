import type { Express } from "express";
import { createServer, type Server } from "http";
import { dateOfBirthSchema } from "@shared/schema";
import { getNumerologyAnalysis } from "./numerology.js";

export async function registerRoutes(app: Express): Promise<Server> {
  // Calculate numerology analysis
  app.post("/api/calculate-numerology", async (req, res) => {
    try {
      const { day, month, year } = dateOfBirthSchema.parse(req.body);

      // Use JavaScript implementation for calculations
      const analysis = getNumerologyAnalysis(day, month, year);
      res.json(analysis);

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

      const openRouterApiKey = process.env.OPEN_ROUTER_META_LLAMA_4;

      if (!openRouterApiKey) {
        return res.status(500).json({ error: "OpenRouter API key not configured" });
      }

      // Create comprehensive numerology prompt covering all life aspects
      const systemPrompt = `You are a master Vedic numerologist with 30+ years of experience helping people understand their life path through ancient Indian numerology. You provide deep, practical insights about personality, relationships, career, health, wealth, and spiritual growth. Your analyses are compassionate, accurate, and actionable - helping people understand their true nature and life purpose.

Focus on real-life applications and practical guidance that people can use to improve their lives. Be specific about timing, challenges, opportunities, and remedies when relevant.`;

      const userPrompt = `Please provide a comprehensive life analysis based on this numerological profile:

**CORE NUMBERS:**
• Psychic Number: ${analysis.psychic_number.number} (${analysis.psychic_number.planet}) - Your personality and how others see you
• Destiny Number: ${analysis.destiny_number.number} (${analysis.destiny_number.planet}) - Your life path and purpose

**PRESENT NUMBERS IN DATE:** ${analysis.lusho_grid.present_numbers.join(', ')}
**MISSING NUMBERS:** ${analysis.lusho_grid.missing_numbers.join(', ')}

**RELATIONSHIPS:**
• Friendly Numbers: ${analysis.friendly_unfriendly.friendly.join(', ')}
• Unfriendly Numbers: ${analysis.friendly_unfriendly.unfriendly.join(', ')}

**SPECIAL YOGAS:** ${analysis.yogas_found.length > 0 ? analysis.yogas_found.map((y: any) => y.name).join(', ') : 'None'}

Provide detailed insights covering:

1. **PERSONALITY & MINDSET**
   - Core personality traits and natural tendencies
   - Mental strengths and thinking patterns
   - How others perceive you vs your inner self
   - Mindset shifts needed for growth

2. **HEALTH & VITALITY**
   - Physical health tendencies and vulnerabilities
   - Mental/emotional health patterns
   - Recommended lifestyle adjustments
   - Preventive health measures

3. **LOVE & RELATIONSHIPS**
   - Romantic compatibility and relationship patterns
   - Family dynamics and friendships
   - Communication style in relationships
   - Guidance for finding and maintaining love

4. **WEALTH & CAREER**
   - Natural career aptitudes and business sense
   - Money-making abilities and financial patterns
   - Best timing for major financial decisions
   - Investment and savings recommendations

5. **LIFE CHALLENGES & SOLUTIONS**
   - Major life struggles you're likely to face
   - Karmic lessons and spiritual tests
   - Practical remedies and solutions
   - How to transform weaknesses into strengths

6. **SPIRITUAL GROWTH & PURPOSE**
   - Life mission and dharma
   - Spiritual practices that suit your nature
   - Service opportunities and giving patterns
   - Path to self-realization

Please write in a warm, empathetic tone as if speaking directly to the person. Use specific examples and practical advice they can implement immediately.`;

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openRouterApiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://vedic-numerology-calculator.replit.app",
          "X-Title": "Vedic Numerology Calculator"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-maverick:free",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: userPrompt
            }
          ],
          max_tokens: 3000,
          temperature: 0.7,
          top_p: 0.9
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("OpenRouter API error:", response.status, errorText);
        throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
      }

      const aiResponse = await response.json();
      const aiAnalysis = aiResponse.choices[0]?.message?.content;

      if (!aiAnalysis) {
        throw new Error("No analysis generated from AI");
      }

      res.json({ aiAnalysis });

    } catch (error) {
      console.error("AI analysis error:", error);
      res.status(500).json({ 
        error: "Failed to generate AI analysis",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
