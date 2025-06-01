import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { calculateNumerology } from "@/lib/numerology";
import type { NumerologyAnalysis, DateOfBirth } from "@/lib/numerology";
import NumerologyForm from "@/components/NumerologyForm";
import NumerologyResults from "@/components/NumerologyResults";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Loader2, Star } from "lucide-react";

export default function Calculator() {
  const [analysis, setAnalysis] = useState<NumerologyAnalysis | null>(null);
  const { toast } = useToast();

  const calculateMutation = useMutation({
    mutationFn: calculateNumerology,
    onSuccess: (data) => {
      setAnalysis(data);
      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById("results");
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    },
    onError: (error: any) => {
      console.error("Calculation error:", error);
      toast({
        title: "Calculation Error",
        description: "Failed to calculate numerology. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFormSubmit = (dateOfBirth: DateOfBirth) => {
    calculateMutation.mutate(dateOfBirth);
  };

  const handleReset = () => {
    setAnalysis(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center space-x-3 text-white hover:text-purple-200 transition-colors">
              <Star className="w-8 h-8" />
              <div>
                <div className="text-xl font-bold">Sameeksha Sharma</div>
                <div className="text-sm opacity-90">Master Numerologist</div>
              </div>
            </Link>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              Book Consultation
            </Button>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Free Numerology Calculator
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Get instant insights into your personality, relationships, career, and life path
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Loading State */}
        {calculateMutation.isPending && (
          <div className="text-center py-16">
            <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
            <p className="text-lg text-gray-600">Analyzing your numerological profile...</p>
          </div>
        )}

        {/* Form or Results */}
        {!calculateMutation.isPending && !analysis && (
          <NumerologyForm onSubmit={handleFormSubmit} isLoading={calculateMutation.isPending} />
        )}

        {!calculateMutation.isPending && analysis && (
          <div id="results">
            <NumerologyResults analysis={analysis} onReset={handleReset} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-6">
            <div className="text-3xl mb-4 text-purple-400">🌟</div>
          </div>
          <h3 className="text-xl font-semibold mb-2">Vedic Numerology Calculator</h3>
          <p className="text-gray-400 mb-6">Ancient wisdom for modern insights</p>

          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-purple-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Contact
            </a>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700 text-sm text-gray-500">
            © 2024 Vedic Numerology Calculator. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
