import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Heart,
  TrendingUp,
  Shield,
  Clock,
  Star,
  Gift,
  Users,
  MapPin,
  Phone,
} from "lucide-react";

interface EnhancedFeaturesProps {
  analysis: any;
}

export default function EnhancedFeatures({ analysis }: EnhancedFeaturesProps) {
  // Calculate compatibility with different birth dates
  const calculateCompatibility = (partnerDay: number) => {
    const userPsychic = analysis.psychic_number.number;
    const partnerPsychic = partnerDay % 9 || 9;
    
    const compatibility = analysis.friendly_unfriendly.friendly.includes(partnerPsychic) ? 
      "High" : analysis.friendly_unfriendly.unfriendly.includes(partnerPsychic) ? 
      "Low" : "Medium";
    
    return { partnerPsychic, compatibility };
  };

  // Calculate lucky dates for the current month
  const calculateLuckyDates = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const luckyNumbers = analysis.friendly_unfriendly.friendly;
    
    const luckyDates = [];
    for (let day = 1; day <= 31; day++) {
      const date = new Date(currentYear, currentMonth, day);
      if (date.getMonth() !== currentMonth) break;
      
      const daySum = day.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
      const reducedDay = daySum > 9 ? daySum.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0) : daySum;
      
      if (luckyNumbers.includes(reducedDay)) {
        luckyDates.push(day);
      }
    }
    
    return luckyDates.slice(0, 10);
  };

  // Generate career recommendations based on numbers
  const generateCareerRecommendations = () => {
    const psychic = analysis.psychic_number.number;
    const destiny = analysis.destiny_number.number;
    
    const careerMap: Record<number, string[]> = {
      1: ["Leadership", "Entrepreneurship", "Government", "Military"],
      2: ["Teaching", "Counseling", "Healthcare", "Social Work"],
      3: ["Arts", "Entertainment", "Writing", "Communications"],
      4: ["Engineering", "Construction", "Real Estate", "Planning"],
      5: ["Sales", "Marketing", "Travel", "Media"],
      6: ["Beauty", "Fashion", "Interior Design", "Hospitality"],
      7: ["Research", "Spirituality", "Psychology", "Analysis"],
      8: ["Business", "Finance", "Law", "Administration"],
      9: ["Sports", "Adventure", "Emergency Services", "Competition"]
    };
    
    const psychicCareers = careerMap[psychic] || [];
    const destinyCareers = careerMap[destiny] || [];
    
    return [...new Set([...psychicCareers, ...destinyCareers])];
  };

  // Calculate health recommendations
  const generateHealthRecommendations = () => {
    const missing = analysis.lusho_grid.missing_numbers;
    const healthMap: Record<number, string> = {
      1: "Heart and circulatory system - Regular cardio exercise recommended",
      2: "Digestive system - Focus on gut health and stress management",
      3: "Liver and metabolism - Maintain balanced diet and avoid excess",
      4: "Nervous system - Practice meditation and avoid overstimulation",
      5: "Respiratory system - Breathing exercises and avoid smoking",
      6: "Reproductive system - Regular health checkups important",
      7: "Mental health - Spiritual practices and avoid isolation",
      8: "Bone and joint health - Regular exercise and calcium intake",
      9: "Blood and energy - Iron-rich foods and avoid overexertion"
    };
    
    return missing.map(num => healthMap[num]).filter(Boolean);
  };

  const luckyDates = calculateLuckyDates();
  const careers = generateCareerRecommendations();
  const healthTips = generateHealthRecommendations();

  return (
    <div className="space-y-8">
      {/* Compatibility Calculator */}
      <Card className="bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
        <CardHeader>
          <CardTitle className="flex items-center text-rose-800">
            <Heart className="w-6 h-6 mr-3" />
            Relationship Compatibility
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 15, 23].map(day => {
              const compat = calculateCompatibility(day);
              return (
                <div key={day} className="bg-white rounded-lg p-4 border border-rose-200">
                  <div className="text-center">
                    <div className="text-lg font-semibold">Partner born on {day}th</div>
                    <div className="text-sm text-gray-600 mb-2">Psychic Number: {compat.partnerPsychic}</div>
                    <Badge 
                      variant={compat.compatibility === "High" ? "default" : "destructive"}
                      className={compat.compatibility === "High" ? "bg-green-100 text-green-800" : 
                                compat.compatibility === "Medium" ? "bg-yellow-100 text-yellow-800" : ""}
                    >
                      {compat.compatibility} Compatibility
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Lucky Dates */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <Calendar className="w-6 h-6 mr-3" />
            Lucky Dates This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {luckyDates.map(date => (
              <div key={date} className="bg-white rounded-lg p-3 text-center border border-green-200">
                <div className="text-lg font-bold text-green-700">{date}</div>
                <div className="text-xs text-green-600">Lucky</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-green-700 mt-4">
            These dates align with your friendly numbers for important decisions, meetings, and new ventures.
          </p>
        </CardContent>
      </Card>

      {/* Career Recommendations */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-800">
            <TrendingUp className="w-6 h-6 mr-3" />
            Ideal Career Paths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {careers.map((career, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-blue-200 text-center">
                <div className="font-semibold text-blue-800">{career}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-blue-700 mt-4">
            Based on your Psychic Number ({analysis.psychic_number.number}) and Destiny Number ({analysis.destiny_number.number})
          </p>
        </CardContent>
      </Card>

      {/* Health & Wellness */}
      <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-800">
            <Shield className="w-6 h-6 mr-3" />
            Health & Wellness Focus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {healthTips.length > 0 ? (
              healthTips.map((tip, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-orange-200">
                  <p className="text-orange-800">{tip}</p>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg p-4 border border-orange-200">
                <p className="text-orange-800">
                  Your number presence is well-balanced. Focus on maintaining overall wellness through 
                  regular exercise, balanced nutrition, and stress management.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Business Launch Timing */}
      <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-800">
            <Clock className="w-6 h-6 mr-3" />
            Optimal Timing Guidance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">Best Time for New Ventures</h4>
              <p className="text-purple-700 text-sm">
                Days that align with your Destiny Number ({analysis.destiny_number.number}) are most favorable 
                for starting new businesses or making major life changes.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">Investment & Financial Decisions</h4>
              <p className="text-purple-700 text-sm">
                Consider your friendly numbers ({analysis.friendly_unfriendly.friendly.join(', ')}) when 
                making important financial decisions or investments.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Premium Services CTA */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
        <CardContent className="p-8 text-center">
          <Star className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <h3 className="text-2xl font-bold mb-4">Want Deeper Insights?</h3>
          <p className="text-lg mb-6 opacity-90">
            Get a personalized consultation with Master Numerologist Sameeksha Sharma
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
              <Phone className="w-5 h-5 mr-2" />
              Book Personal Reading
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3">
              <Gift className="w-5 h-5 mr-2" />
              Premium Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}