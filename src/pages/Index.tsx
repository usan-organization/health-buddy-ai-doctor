import React, { useState } from 'react';
import { Stethoscope, User, Users, Hospital, Pill, Brain, Heart, Shield, Search, MessageCircle, Calendar, FileText, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import SymptomChecker from '@/components/SymptomChecker';
import DiagnosisResult from '@/components/DiagnosisResult';
import EmergencyAlert from '@/components/EmergencyAlert';

const Index = () => {
  const [currentView, setCurrentView] = useState('home');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState(null);

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "AI Diagnosis",
      description: "Get accurate medical insights using advanced AI trained on medical data",
      action: () => setCurrentView('symptom-checker')
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-blue-600" />,
      title: "Symptom Analysis",
      description: "Describe your symptoms in simple words - our AI understands naturally",
      action: () => setCurrentView('symptom-checker')
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Connect to Doctors",
      description: "Get referred to real doctors when needed for serious conditions",
      action: () => toast.info("Doctor referral system coming soon!")
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "Health History",
      description: "Track your symptoms and health insights over time",
      action: () => toast.info("Health history tracking coming soon!")
    }
  ];

  const emergencySymptoms = [
    "Chest pain", "Difficulty breathing", "Severe headache", "Loss of consciousness",
    "Severe bleeding", "High fever", "Stroke symptoms", "Heart attack symptoms"
  ];

  if (currentView === 'symptom-checker') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentView('home')}
                className="text-blue-600 hover:text-blue-800"
              >
                ← Back to Home
              </Button>
            </div>
            
            <SymptomChecker 
              onDiagnosis={(result) => {
                setDiagnosis(result);
                setCurrentView('results');
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'results' && diagnosis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentView('home')}
                className="text-blue-600 hover:text-blue-800"
              >
                ← Back to Home
              </Button>
            </div>
            
            <DiagnosisResult 
              diagnosis={diagnosis}
              onNewCheck={() => setCurrentView('symptom-checker')}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-xl">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MedAI Assistant</h1>
                <p className="text-blue-600 text-sm">Your AI Medical Companion</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Shield className="h-3 w-3 mr-1" />
                Secure & Private
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Get the Best Medical Diagnosis
            <span className="text-blue-600 block">Simple as Talking to a Friend</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Our AI provides world-class medical insights in simple language anyone can understand. 
            Describe your symptoms naturally, and get accurate diagnosis like the best doctors in the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => setCurrentView('symptom-checker')}
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Search className="mr-2 h-5 w-5" />
              Check My Symptoms
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 rounded-xl"
              onClick={() => toast.info("Emergency feature coming soon!")}
            >
              <AlertTriangle className="mr-2 h-5 w-5" />
              Emergency Help
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600 text-sm">Advanced AI trained on medical data and guidelines</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hospital className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hospital-Grade</h3>
              <p className="text-gray-600 text-sm">Quality matching the best hospitals worldwide</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Safe & Secure</h3>
              <p className="text-gray-600 text-sm">Your health data is protected and private</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">How We Help You</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our comprehensive AI system provides everything you need for better health insights
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border-blue-100 hover:border-blue-300"
              onClick={feature.action}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-center text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Emergency Alert Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Emergency Symptoms</AlertTitle>
            <AlertDescription className="text-red-700">
              If you're experiencing any of these symptoms, seek immediate medical attention:
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                {emergencySymptoms.map((symptom, index) => (
                  <Badge key={index} variant="destructive" className="text-xs">
                    {symptom}
                  </Badge>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-100 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              <strong>Disclaimer:</strong> This AI assistant provides general health information and should not replace professional medical advice.
            </p>
            <p className="text-sm">
              Always consult with a qualified healthcare provider for medical decisions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
