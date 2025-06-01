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

      // Enhanced analytics prompt based on deeper numerological calculations
      const calculateAdditionalAnalytics = () => {
        const presentCount = analysis.lusho_grid.present_numbers.length;
        const missingCount = analysis.lusho_grid.missing_numbers.length;
        const yogaCount = analysis.yogas_found.length;
        const strongNumbers = analysis.lusho_grid.present_numbers.filter(n => 
          analysis.lusho_grid.number_counts[n] > 1
        );
        const dominantPlanet = analysis.psychic_number.planet;
        const lifePath = analysis.destiny_number.planet;
        
        return {
          numericalBalance: presentCount >= 7 ? "Highly Balanced" : presentCount >= 5 ? "Moderately Balanced" : "Needs Balance",
          karmaIntensity: yogaCount >= 3 ? "High Karmic Activity" : yogaCount >= 1 ? "Moderate Karmic Influence" : "Simple Life Path",
          personalityStrength: strongNumbers.length >= 2 ? "Strong Character" : strongNumbers.length === 1 ? "Focused Nature" : "Diverse Interests",
          planetaryInfluence: `${dominantPlanet} dominance with ${lifePath} life direction`,
          criticalNumbers: analysis.lusho_grid.missing_numbers.slice(0, 3),
          powerNumbers: strongNumbers
        };
      };

      const analytics = calculateAdditionalAnalytics();

      const userPrompt = `I need a comprehensive life reading for someone with this unique numerological blueprint:

**🔢 CORE IDENTITY:**
• **Psychic Number:** ${analysis.psychic_number.number} (${analysis.psychic_number.planet}) - Their natural personality and public image
• **Destiny Number:** ${analysis.destiny_number.number} (${analysis.destiny_number.planet}) - Their soul's mission and life purpose
• **Date Analysis:** ${analysis.input_dob}

**📊 NUMERICAL PRESENCE & ENERGY:**
• **Present Numbers:** ${analysis.lusho_grid.present_numbers.join(', ')} (${analytics.numericalBalance})
• **Missing/Weak Numbers:** ${analysis.lusho_grid.missing_numbers.join(', ')} - Areas needing development
• **Power Numbers:** ${analytics.powerNumbers.join(', ') || 'None'} - Doubled/tripled strengths
• **Number Counts:** ${Object.entries(analysis.lusho_grid.number_counts).filter(([,count]) => count > 0).map(([num, count]) => `${num}(${count}x)`).join(', ')}

**🌟 KARMIC PATTERNS & YOGAS:**
• **Yoga Status:** ${analytics.karmaIntensity}
• **Active Yogas:** ${analysis.yogas_found.length > 0 ? analysis.yogas_found.map((y: any) => y.name).join(' | ') : 'None - Simple karmic path'}

**🔗 RELATIONSHIP DYNAMICS:**
• **Harmonious Numbers:** ${analysis.friendly_unfriendly.friendly.join(', ')} - Natural allies and supportive energies  
• **Challenging Numbers:** ${analysis.friendly_unfriendly.unfriendly.join(', ')} - Numbers requiring caution

**🎯 PLANETARY DOMINANCE:** ${analytics.planetaryInfluence}

---

**Please provide a detailed life blueprint covering:**

## **🧠 PERSONALITY & PSYCHOLOGICAL PROFILE**
- Deep personality analysis based on ${analysis.psychic_number.number} (${analysis.psychic_number.planet}) dominance
- Mental processing style and decision-making patterns
- Subconscious drives and motivations
- Public persona vs private self
- Cognitive strengths and blind spots
- Emotional patterns and triggers

## **💖 LOVE, RELATIONSHIPS & FAMILY**
- Romantic compatibility matrix and ideal partner qualities
- Relationship challenges and growth opportunities  
- Family dynamics and generational patterns
- Friendship styles and social connections
- Communication patterns in intimate relationships
- Best timing for marriage and major relationship decisions

## **💰 WEALTH, CAREER & LIFE PURPOSE**
- Natural talents and career aptitudes based on number combinations
- Money magnetism and wealth accumulation patterns
- Business vs employment suitability
- Investment timing and financial decision-making
- Professional growth phases and peak earning periods
- Life mission and dharmic career path

## **🏥 HEALTH & VITALITY BLUEPRINT**
- Physical constitution and health vulnerabilities based on missing numbers
- Mental health patterns and emotional wellness
- Body system strengths and weaknesses
- Preventive health strategies
- Healing modalities that resonate with their numbers
- Lifestyle modifications for optimal vitality

## **⚡ LIFE CHALLENGES & KARMIC LESSONS**
- Major life tests and growth periods
- Karmic debts requiring resolution
- Recurring life themes and patterns
- How to transform challenges into strengths
- Timing of difficult periods and breakthrough moments
- Practical remedies and spiritual solutions

## **🌟 SPIRITUAL GROWTH & HIGHER PURPOSE**
- Soul evolution path and spiritual gifts
- Meditation and spiritual practices suited to their nature
- Service opportunities and giving patterns
- Spiritual teacher/guide characteristics
- Past life influences and karmic completion
- Path to enlightenment and self-realization

**Writing Style:** Speak directly to them with warmth and authority. Provide specific, actionable guidance they can implement immediately. Include timing insights, practical examples, and transformational advice that feels personally relevant.`;

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
