
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PatientSelector } from '@/components/PatientSelector';
import { TestMenu } from '@/components/TestMenu';
import { TestForm } from '@/components/TestForm';
import { FinalAssessment } from '@/components/FinalAssessment';

type AppState = 'home' | 'patient-selection' | 'test-menu' | 'test-form' | 'assessment';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [completedTests, setCompletedTests] = useState<string[]>([]);

  const handleStart = () => {
    setCurrentState('patient-selection');
  };

  const handlePatientSelected = (patientName: string) => {
    setSelectedPatient(patientName);
    setCurrentState('test-menu');
  };

  const handleCategorySelected = (category: string) => {
    setSelectedCategory(category);
    setCurrentState('test-form');
  };

  const handleTestCompleted = (testName: string) => {
    setCompletedTests(prev => [...prev, testName]);
    setCurrentState('test-menu');
  };

  const handleFinishAssessment = () => {
    setCurrentState('assessment');
  };

  const resetApp = () => {
    setCurrentState('home');
    setSelectedPatient('');
    setSelectedCategory('');
    setCompletedTests([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {currentState === 'home' && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-8 text-center space-y-8">
              <div className="relative">
                <img 
                  src="/lovable-uploads/733930ff-b5dd-4890-bbf7-2a2e76e1809f.png" 
                  alt="CuidApp Logo" 
                  className="w-48 h-48 mx-auto object-contain"
                />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  CuidApp
                </h1>
                <p className="text-gray-600 text-sm">
                  Aplicació per al registre de tests en atenció domiciliària
                </p>
              </div>

              <Button 
                onClick={handleStart}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Inici
              </Button>

              <p className="text-xs text-gray-500 mt-6">
                ©2025 Creat per Mariona Vilar
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {currentState === 'patient-selection' && (
        <PatientSelector onPatientSelected={handlePatientSelected} />
      )}

      {currentState === 'test-menu' && (
        <TestMenu 
          selectedPatient={selectedPatient}
          completedTests={completedTests}
          onCategorySelected={handleCategorySelected}
          onFinishAssessment={handleFinishAssessment}
          onBack={() => setCurrentState('patient-selection')}
        />
      )}

      {currentState === 'test-form' && (
        <TestForm 
          category={selectedCategory}
          patient={selectedPatient}
          onTestCompleted={handleTestCompleted}
          onBack={() => setCurrentState('test-menu')}
        />
      )}

      {currentState === 'assessment' && (
        <FinalAssessment 
          patient={selectedPatient}
          completedTests={completedTests}
          onReset={resetApp}
        />
      )}
    </div>
  );
};

export default Index;
