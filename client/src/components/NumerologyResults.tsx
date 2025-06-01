import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { generateAIAnalysis } from "@/lib/numerology";
import type { NumerologyAnalysis } from "@/lib/numerology";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import EnhancedFeatures from "@/components/EnhancedFeatures";
import {
  User,
  Compass,
  Globe,
  Grid3X3,
  Users,
  Clock,
  Star,
  Brain,
  Download,
  Share,
  Bookmark,
  CheckCircle,
  XCircle,
  Heart,
  AlertTriangle,
  ArrowLeft,
  Loader2,
} from "lucide-react";

interface NumerologyResultsProps {
  analysis: NumerologyAnalysis;
  onReset: () => void;
}

export default function NumerologyResults({ analysis, onReset }: NumerologyResultsProps) {
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null);

  const aiAnalysisMutation = useMutation({
    mutationFn: () => generateAIAnalysis(analysis),
    onSuccess: (data) => {
      setAiAnalysisResult(data.aiAnalysis);
    },
    onError: (error) => {
      console.error("Error generating AI analysis:", error);
    },
  });

  const renderLushoGrid = () => {
    const gridLayout = [
      [3, 6, 9],
      [2, 5, 8],
      [1, 4, 7],
    ];

    return (
      <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-6">
        {gridLayout.flat().map((number) => {
          const count = analysis.lusho_grid.number_counts[number] || 0;
          const isPresent = count > 0;

          return (
            <div
              key={number}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center border-2 transition-all ${
                isPresent
                  ? "bg-gradient-to-br from-purple-100 to-blue-100 border-purple-300 border-solid"
                  : "bg-gray-50 border-gray-300 border-dashed"
              }`}
            >
              <span
                className={`text-lg font-semibold ${
                  isPresent ? "text-purple-700" : "text-gray-400"
                }`}
              >
                {number}
              </span>
              {count > 1 && (
                <span className="text-xs text-purple-600 font-medium">×{count}</span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderNumberBadges = (numbers: number[], variant: "default" | "destructive") => {
    return numbers.map((number) => (
      <Badge
        key={number}
        variant={variant}
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          variant === "default"
            ? "bg-green-100 text-green-800 hover:bg-green-200"
            : "bg-red-100 text-red-800 hover:bg-red-200"
        }`}
      >
        {number}
      </Badge>
    ));
  };

  const renderYogas = () => {
    if (analysis.yogas_found.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <Star className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No specific yogas found in this numerological profile</p>
        </div>
      );
    }

    const colors = [
      {
        bg: "from-amber-50 to-yellow-50",
        border: "border-amber-200",
        iconBg: "from-amber-400 to-yellow-500",
        titleColor: "text-amber-800",
        descColor: "text-amber-700",
      },
      {
        bg: "from-emerald-50 to-green-50",
        border: "border-emerald-200",
        iconBg: "from-emerald-400 to-green-500",
        titleColor: "text-emerald-800",
        descColor: "text-emerald-700",
      },
      {
        bg: "from-blue-50 to-indigo-50",
        border: "border-blue-200",
        iconBg: "from-blue-400 to-indigo-500",
        titleColor: "text-blue-800",
        descColor: "text-blue-700",
      },
      {
        bg: "from-purple-50 to-pink-50",
        border: "border-purple-200",
        iconBg: "from-purple-400 to-pink-500",
        titleColor: "text-purple-800",
        descColor: "text-purple-700",
      },
    ];

    return analysis.yogas_found.map((yoga, index) => {
      const colorScheme = colors[index % colors.length];

      return (
        <div
          key={index}
          className={`bg-gradient-to-r ${colorScheme.bg} border ${colorScheme.border} rounded-lg p-4`}
        >
          <div className="flex items-start">
            <div
              className={`flex-shrink-0 w-10 h-10 bg-gradient-to-r ${colorScheme.iconBg} rounded-full flex items-center justify-center mr-4`}
            >
              <Star className="w-5 h-5 text-white" />
            </div>
            <div className="flex-grow">
              <h4 className={`font-semibold ${colorScheme.titleColor} mb-2`}>{yoga.name}</h4>
              <p className={`${colorScheme.descColor} text-sm`}>{yoga.description}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="space-y-8">
      {/* Core Numbers */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Psychic Number */}
        <Card className="bg-white shadow-lg border border-gray-100">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <User className="text-purple-600 text-2xl mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Psychic Number</h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-white">
                  {analysis.psychic_number.number}
                </span>
              </div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Ruling Planet:{" "}
                <span className="text-purple-600">{analysis.psychic_number.planet}</span>
              </p>
              <p className="text-sm text-gray-600">Your personality and how others see you</p>
            </div>
          </CardContent>
        </Card>

        {/* Destiny Number */}
        <Card className="bg-white shadow-lg border border-gray-100">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <Compass className="text-purple-600 text-2xl mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Destiny Number</h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-white">
                  {analysis.destiny_number.number}
                </span>
              </div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Ruling Planet:{" "}
                <span className="text-purple-600">{analysis.destiny_number.planet}</span>
              </p>
              <p className="text-sm text-gray-600">Your life path and purpose</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Planetary Associations */}
      <Card className="bg-white shadow-lg border border-gray-100">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Globe className="text-purple-600 text-xl mr-3" />
            Planetary Associations
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
            {Object.entries(analysis.planetary_associations).map(([number, planet]) => (
              <div
                key={number}
                className="text-center p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-semibold text-sm">{number}</span>
                </div>
                <p className="text-xs font-medium text-gray-700">{planet}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lusho Grid */}
      <Card className="bg-white shadow-lg border border-gray-100">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Grid3X3 className="text-purple-600 text-xl mr-3" />
            Lusho Grid (Vedic Square)
          </h3>

          {renderLushoGrid()}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Present Numbers
              </h4>
              <div className="flex flex-wrap gap-2">
                {renderNumberBadges(analysis.lusho_grid.present_numbers, "default")}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                <XCircle className="w-4 h-4 mr-2" />
                Missing Numbers
              </h4>
              <div className="flex flex-wrap gap-2">
                {renderNumberBadges(analysis.lusho_grid.missing_numbers, "destructive")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Friendly & Unfriendly Numbers */}
      <Card className="bg-white shadow-lg border border-gray-100">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Users className="text-purple-600 text-xl mr-3" />
            Friendly & Unfriendly Numbers
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-700 mb-4 flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                Friendly Numbers
              </h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {analysis.friendly_unfriendly.friendly.map((number) => (
                  <Badge
                    key={number}
                    className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium hover:bg-green-200"
                  >
                    {number}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-600">Numbers that bring harmony and positive energy</p>
            </div>
            <div>
              <h4 className="font-semibold text-red-700 mb-4 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Unfriendly Numbers
              </h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {analysis.friendly_unfriendly.unfriendly.map((number) => (
                  <Badge
                    key={number}
                    className="px-4 py-2 bg-red-100 text-red-800 rounded-lg font-medium hover:bg-red-200"
                  >
                    {number}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Numbers to be cautious with in important decisions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mahadasha Sequence */}
      <Card className="bg-white shadow-lg border border-gray-100">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Clock className="text-purple-600 text-xl mr-3" />
            Mahadasha Sequence
          </h3>

          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4" style={{ minWidth: "800px" }}>
              {analysis.simplified_mahadasha_sequence.map((period, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200 min-w-[140px]"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">{period.number}</span>
                    </div>
                    <h4 className="font-semibold text-purple-800 text-sm">{period.planet}</h4>
                    <p className="text-xs text-gray-600 mt-1">{period.duration} years</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Planetary periods that influence different phases of your life
          </p>
        </CardContent>
      </Card>

      {/* Numerological Yogas */}
      <Card className="bg-white shadow-lg border border-gray-100">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Star className="text-purple-600 text-xl mr-3" />
            Numerological Yogas
          </h3>

          <div className="space-y-4">{renderYogas()}</div>
        </CardContent>
      </Card>

      {/* AI-Enhanced Analysis */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 shadow-lg border border-purple-200">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold text-purple-800 mb-6 flex items-center">
            <Brain className="text-purple-600 text-xl mr-3" />
            AI-Enhanced Analysis
          </h3>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            {aiAnalysisResult ? (
              <div className="max-w-none">
                <MarkdownRenderer content={aiAnalysisResult} />
              </div>
            ) : (
              <div className="text-gray-700 leading-relaxed">
                <div className="text-center py-8">
                  <Brain className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">
                    Unlock Your Complete Life Analysis
                  </h4>
                  <p className="mb-4 text-gray-600 max-w-2xl mx-auto">
                    Get a comprehensive AI-powered analysis covering your personality, relationships, 
                    career potential, health patterns, wealth opportunities, and spiritual growth path. 
                    Our expert system provides personalized insights you can use immediately.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 max-w-3xl mx-auto text-sm">
                    <div className="bg-purple-50 rounded-lg p-3">
                      <Heart className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                      <div className="font-medium text-purple-800">Relationships</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <User className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                      <div className="font-medium text-blue-800">Personality</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <Star className="w-5 h-5 text-green-600 mx-auto mb-1" />
                      <div className="font-medium text-green-800">Career & Wealth</div>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                      <div className="font-medium text-amber-800">Challenges</div>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-3">
                      <Compass className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                      <div className="font-medium text-indigo-800">Life Purpose</div>
                    </div>
                    <div className="bg-rose-50 rounded-lg p-3">
                      <Globe className="w-5 h-5 text-rose-600 mx-auto mb-1" />
                      <div className="font-medium text-rose-800">Health & Vitality</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!aiAnalysisResult && (
              <Button
                onClick={() => aiAnalysisMutation.mutate()}
                disabled={aiAnalysisMutation.isPending}
                className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {aiAnalysisMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Generate Detailed AI Analysis
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Features */}
      <EnhancedFeatures analysis={analysis} />

      {/* Export Section */}
      <Card className="bg-white shadow-lg border border-gray-100">
        <CardContent className="pt-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-center">
            <Download className="text-purple-600 text-xl mr-3" />
            Export Your Analysis
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <Download className="w-5 h-5 mr-2" />
              Download PDF Report
            </Button>
            <Button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <Share className="w-5 h-5 mr-2" />
              Share Analysis
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <Bookmark className="w-5 h-5 mr-2" />
              Save for Later
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reset Button */}
      <div className="text-center">
        <Button
          onClick={onReset}
          variant="outline"
          className="mt-4 text-purple-600 hover:text-purple-800 font-medium transition-colors border-purple-300 hover:border-purple-500"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Calculate for Different Date
        </Button>
      </div>
    </div>
  );
}
