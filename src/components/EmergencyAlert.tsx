
import React from 'react';
import { AlertTriangle, Phone, MapPin, Clock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EmergencyAlert = () => {
  const emergencyNumbers = [
    { country: "US", number: "911", label: "Emergency Services" },
    { country: "UK", number: "999", label: "Emergency Services" },
    { country: "EU", number: "112", label: "European Emergency" },
    { country: "AU", number: "000", label: "Emergency Services" }
  ];

  const emergencySymptoms = [
    "Chest pain or pressure",
    "Difficulty breathing or shortness of breath",
    "Loss of consciousness or fainting",
    "Severe bleeding that won't stop",
    "Signs of stroke (face drooping, arm weakness, speech difficulty)",
    "Severe allergic reaction",
    "High fever with severe headache",
    "Severe burns",
    "Suspected poisoning",
    "Severe trauma or injury"
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-red-500 bg-red-50">
        <AlertTriangle className="h-5 w-5 text-red-600" />
        <AlertTitle className="text-red-800 text-lg">MEDICAL EMERGENCY</AlertTitle>
        <AlertDescription className="text-red-700">
          If you or someone else is experiencing a life-threatening emergency, 
          do not use this app. Call emergency services immediately.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <Phone className="h-5 w-5" />
              Emergency Numbers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emergencyNumbers.map((emergency, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-medium">{emergency.country}</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600">{emergency.number}</div>
                    <div className="text-sm text-red-500">{emergency.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <Clock className="h-5 w-5" />
              When to Call Emergency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {emergencySymptoms.slice(0, 5).map((symptom, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-red-700">{symptom}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="text-center space-y-4">
        <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4">
          <Phone className="mr-2 h-5 w-5" />
          Call Emergency Services
        </Button>
        
        <Button variant="outline" size="lg" className="border-red-600 text-red-600 px-8 py-4">
          <MapPin className="mr-2 h-5 w-5" />
          Find Nearest Hospital
        </Button>
      </div>
    </div>
  );
};

export default EmergencyAlert;
