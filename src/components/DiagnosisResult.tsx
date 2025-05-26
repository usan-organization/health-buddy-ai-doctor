
import React from 'react';
import { CheckCircle, AlertTriangle, Users, Calendar, FileText, Heart, Activity, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface DiagnosisResultProps {
  diagnosis: any;
  onNewCheck: () => void;
}

const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ diagnosis, onNewCheck }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'mild': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'severe': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'low': return 'border-green-200 bg-green-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'high': return 'border-red-200 bg-red-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your AI Medical Analysis</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Based on your symptoms, here's what our AI medical assistant found, 
          explained in simple terms you can easily understand.
        </p>
      </div>

      {/* Primary Diagnosis */}
      <Card className="border-blue-200 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Activity className="h-6 w-6 text-blue-600" />
              Primary Diagnosis
            </CardTitle>
            <Badge className={getSeverityColor(diagnosis.primaryDiagnosis.severity)}>
              {diagnosis.primaryDiagnosis.severity}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              {diagnosis.primaryDiagnosis.condition}
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              {diagnosis.primaryDiagnosis.description}
            </p>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">AI Confidence</span>
              <span className="text-sm font-medium text-blue-600">
                {diagnosis.primaryDiagnosis.confidence}%
              </span>
            </div>
            <Progress value={diagnosis.primaryDiagnosis.confidence} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Urgency Alert */}
      <Alert className={getUrgencyColor(diagnosis.urgencyLevel)}>
        <AlertTriangle className={`h-4 w-4 ${
          diagnosis.urgencyLevel === 'high' ? 'text-red-600' : 
          diagnosis.urgencyLevel === 'medium' ? 'text-yellow-600' : 'text-green-600'
        }`} />
        <AlertTitle className="text-gray-900">
          {diagnosis.urgencyLevel === 'high' ? 'High Priority' : 
           diagnosis.urgencyLevel === 'medium' ? 'Moderate Priority' : 'Low Priority'}
        </AlertTitle>
        <AlertDescription className="text-gray-700">
          {diagnosis.needsDoctorVisit 
            ? "We recommend seeing a doctor for proper evaluation and treatment."
            : "This condition typically doesn't require immediate medical attention, but monitor your symptoms."
          }
        </AlertDescription>
      </Alert>

      {/* Alternative Diagnoses */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gray-600" />
            Other Possible Conditions
          </CardTitle>
          <CardDescription>
            These are other conditions that could match your symptoms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {diagnosis.alternativeDiagnoses.map((alt: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{alt.condition}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{alt.confidence}%</span>
                  <Progress value={alt.confidence} className="w-20 h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <CheckCircle className="h-5 w-5" />
            What You Should Do
          </CardTitle>
          <CardDescription>
            Simple steps to help you feel better
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {diagnosis.recommendations.map((rec: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Red Flags */}
      {diagnosis.redFlags && diagnosis.redFlags.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              Warning Signs to Watch For
            </CardTitle>
            <CardDescription className="text-red-600">
              See a doctor immediately if you experience any of these symptoms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {diagnosis.redFlags.map((flag: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-red-700 font-medium">{flag}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Doctor Referral */}
      {diagnosis.needsDoctorVisit && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Users className="h-5 w-5" />
              Connect with a Real Doctor
            </CardTitle>
            <CardDescription className="text-blue-600">
              Based on your symptoms, we recommend professional medical consultation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Find Doctors Near Me
              </Button>
              <Button variant="outline" className="border-blue-600 text-blue-600">
                Schedule Telemedicine
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
        <Button 
          onClick={onNewCheck}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 px-8"
        >
          Check New Symptoms
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          className="border-blue-600 text-blue-600 px-8"
        >
          <FileText className="mr-2 h-4 w-4" />
          Save This Report
        </Button>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-100 p-6 rounded-xl text-center">
        <p className="text-gray-600 text-sm leading-relaxed">
          <strong>Medical Disclaimer:</strong> This AI analysis is for informational purposes only and 
          should not replace professional medical advice, diagnosis, or treatment. Always seek the advice 
          of a qualified healthcare provider with any questions about your medical condition.
        </p>
      </div>
    </div>
  );
};

export default DiagnosisResult;
