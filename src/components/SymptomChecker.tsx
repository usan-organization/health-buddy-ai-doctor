
import React, { useState } from 'react';
import { Search, Loader2, AlertCircle, User, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

interface SymptomCheckerProps {
  onDiagnosis: (diagnosis: any) => void;
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onDiagnosis }) => {
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [duration, setDuration] = useState('');

  const commonSymptoms = [
    "Headache", "Fever", "Cough", "Sore throat", "Fatigue", 
    "Nausea", "Stomach pain", "Back pain", "Dizziness", "Runny nose",
    "Muscle aches", "Shortness of breath", "Chest pain", "Joint pain"
  ];

  const handleSymptomClick = (symptom: string) => {
    if (symptoms.includes(symptom)) return;
    
    const newSymptoms = symptoms ? `${symptoms}, ${symptom}` : symptom;
    setSymptoms(newSymptoms);
  };

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) {
      toast.error("Please describe your symptoms first");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis - In a real app, this would call your medical AI API
    try {
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate API call
      
      // Mock diagnosis result
      const mockDiagnosis = {
        symptoms: symptoms,
        patientInfo: { age, gender, duration },
        primaryDiagnosis: {
          condition: "Upper Respiratory Tract Infection",
          confidence: 85,
          description: "A common viral infection affecting the nose, throat, and sinuses. Usually mild and resolves on its own.",
          severity: "Mild"
        },
        alternativeDiagnoses: [
          { condition: "Common Cold", confidence: 75 },
          { condition: "Seasonal Allergies", confidence: 60 },
          { condition: "Sinusitis", confidence: 45 }
        ],
        recommendations: [
          "Rest and stay hydrated",
          "Use over-the-counter pain relievers if needed",
          "Gargle with warm salt water for sore throat",
          "Monitor symptoms - see a doctor if they worsen"
        ],
        redFlags: [
          "High fever (over 101.5°F)",
          "Difficulty breathing",
          "Symptoms lasting more than 10 days"
        ],
        needsDoctorVisit: false,
        urgencyLevel: "Low"
      };
      
      onDiagnosis(mockDiagnosis);
      toast.success("Analysis complete!");
      
    } catch (error) {
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Symptom Checker</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Describe your symptoms in your own words. Our AI will analyze them and provide insights 
          like the world's best doctors, but in simple language you can understand.
        </p>
      </div>

      {/* Patient Information */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Basic Information (Optional)
          </CardTitle>
          <CardDescription>
            This helps provide more accurate insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age"
                type="number" 
                placeholder="25" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="duration">How long have you had these symptoms?</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-day">Less than a day</SelectItem>
                  <SelectItem value="1-3-days">1-3 days</SelectItem>
                  <SelectItem value="4-7-days">4-7 days</SelectItem>
                  <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                  <SelectItem value="more-than-2-weeks">More than 2 weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Symptom Input */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle>Describe Your Symptoms</CardTitle>
          <CardDescription>
            Write in your own words how you're feeling. Be as detailed as you can.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Example: I have a headache that started this morning, my throat feels scratchy, and I'm feeling tired. I also have a slight fever..."
            className="min-h-32 text-base"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
          
          {/* Common Symptoms Quick Add */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Quick Add Common Symptoms:</Label>
            <div className="flex flex-wrap gap-2">
              {commonSymptoms.map((symptom) => (
                <Badge
                  key={symptom}
                  variant={symptoms.includes(symptom) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 ${
                    symptoms.includes(symptom) 
                      ? "bg-blue-600 text-white" 
                      : "hover:bg-blue-50 hover:border-blue-300"
                  }`}
                  onClick={() => handleSymptomClick(symptom)}
                >
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Alert className="border-amber-200 bg-amber-50">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>Important:</strong> This AI assistant provides general health information only. 
          If you're experiencing severe symptoms or a medical emergency, please call emergency services 
          or visit the nearest hospital immediately.
        </AlertDescription>
      </Alert>

      {/* Analyze Button */}
      <div className="text-center">
        <Button 
          onClick={analyzeSymptoms}
          disabled={isAnalyzing || !symptoms.trim()}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 px-12 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing Your Symptoms...
            </>
          ) : (
            <>
              <Search className="mr-2 h-5 w-5" />
              Get AI Diagnosis
            </>
          )}
        </Button>
        
        {isAnalyzing && (
          <div className="mt-4 text-center">
            <p className="text-blue-600 text-sm">
              Our AI is carefully analyzing your symptoms using medical guidelines...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;
