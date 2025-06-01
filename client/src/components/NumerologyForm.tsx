import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

interface NumerologyFormProps {
  onSubmit: (data: { day: number; month: number; year: number }) => void;
  isLoading: boolean;
}

export default function NumerologyForm({ onSubmit, isLoading }: NumerologyFormProps) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    if (!day || dayNum < 1 || dayNum > 31) {
      newErrors.day = "Please enter a valid day (1-31)";
    }

    if (!month || monthNum < 1 || monthNum > 12) {
      newErrors.month = "Please enter a valid month (1-12)";
    }

    if (!year || yearNum < 1900 || yearNum > 2100) {
      newErrors.year = "Please enter a valid year (1900-2100)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      day: parseInt(day),
      month: parseInt(month),
      year: parseInt(year),
    });
  };

  return (
    <div className="max-w-md mx-auto mb-12">
      <Card className="bg-white shadow-xl border border-gray-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-purple-700 flex items-center justify-center gap-2">
            <Calculator className="w-6 h-6" />
            Enter Your Date of Birth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="day" className="block text-sm font-medium text-gray-700 mb-2">
                Day:
              </Label>
              <Input
                id="day"
                type="number"
                min="1"
                max="31"
                placeholder="DD"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg ${
                  errors.day ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.day && <p className="text-red-500 text-sm mt-1">{errors.day}</p>}
            </div>

            <div>
              <Label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-2">
                Month:
              </Label>
              <Input
                id="month"
                type="number"
                min="1"
                max="12"
                placeholder="MM"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg ${
                  errors.month ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.month && <p className="text-red-500 text-sm mt-1">{errors.month}</p>}
            </div>

            <div>
              <Label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                Year:
              </Label>
              <Input
                id="year"
                type="number"
                min="1900"
                max="2100"
                placeholder="YYYY"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg ${
                  errors.year ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Numerology
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
