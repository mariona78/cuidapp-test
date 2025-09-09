
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, User, Calendar, RotateCcw, Download } from 'lucide-react';

interface TestResult {
  name: string;
  score: number | null;
  interpretation: string;
  severity: 'normal' | 'mild' | 'severe';
}

interface FinalAssessmentProps {
  patient: string;
  completedTests: TestResult[];
  onReset: () => void;
}

export const FinalAssessment = ({ patient, completedTests, onReset }: FinalAssessmentProps) => {
  const currentDate = new Date().toLocaleDateString('ca-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const generateRecommendations = () => {
    const recommendations = [
      'Continuar seguiment domiciliari regular',
      'Revisar medicació amb metge de capçalera',
      'Implementar mesures de seguretat a la llar',
      'Coordinar amb serveis socials si és necessari',
      'Programar nova avaluació en 3-6 mesos'
    ];
    return recommendations;
  };

  const getOverallAssessment = () => {
    const testCount = completedTests.length;
    const severeTests = completedTests.filter(test => test.severity === 'severe').length;
    const mildTests = completedTests.filter(test => test.severity === 'mild').length;
    
    // Avaluació basada en quantitat i severitat
    if (severeTests > 2) return { level: 'Risc Alt', color: 'bg-red-500', description: 'Múltiples alteracions severes detectades' };
    if (severeTests > 0 || mildTests > 3) return { level: 'Risc Mitjà', color: 'bg-yellow-500', description: 'Alteracions moderades detectades' };
    if (testCount >= 8) return { level: 'Valoració Completa', color: 'bg-green-500', description: 'Valoració satisfactòria sense alteracions significatives' };
    if (testCount >= 4) return { level: 'Valoració Parcial', color: 'bg-blue-500', description: 'Valoració bàsica completada' };
    return { level: 'Valoració Limitada', color: 'bg-gray-500', description: 'Valoració insuficient, ampliar avaluació' };
  };

  const assessment = getOverallAssessment();
  const recommendations = generateRecommendations();

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FileText className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl font-bold">Valoració Final</CardTitle>
            <p className="text-purple-100">Resum de l'avaluació multidimensional</p>
          </CardHeader>
        </Card>

        {/* Patient Info */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Pacient</p>
                  <p className="font-semibold">{patient}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Data d'avaluació</p>
                  <p className="font-semibold">{currentDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Tests completats</p>
                  <p className="font-semibold">{completedTests.length} tests</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overall Assessment */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Valoració General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge className={`${assessment.color} text-white px-4 py-2`}>
                {assessment.level}
              </Badge>
              <p className="text-gray-700">{assessment.description}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-4">Resultats dels tests:</h4>
              <div className="space-y-3">
                {completedTests.map((test, index) => {
                  const getSeverityColor = (severity: string) => {
                    switch (severity) {
                      case 'normal': return 'bg-green-100 text-green-800 border-green-200';
                      case 'mild': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
                      case 'severe': return 'bg-red-100 text-red-800 border-red-200';
                      default: return 'bg-gray-100 text-gray-800 border-gray-200';
                    }
                  };

                  return (
                    <div key={index} className="bg-white p-3 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{test.name}</h5>
                          <div className="flex items-center gap-2 mt-1">
                            {test.score !== null && (
                              <span className="text-sm text-gray-600">
                                Puntuació: {test.score}
                              </span>
                            )}
                            <Badge className={`text-xs ${getSeverityColor(test.severity)}`}>
                              {test.interpretation}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Recomanacions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => window.print()}
              >
                <Download className="w-4 h-4" />
                Descarregar Informe
              </Button>
              
              <Button 
                onClick={onReset}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Nova Valoració
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <Separator className="mb-4" />
          <p>CuidApp - Aplicació per al registre de tests en atenció domiciliària</p>
          <p>©2025 Creat per Mariona Vilar</p>
        </div>
      </div>
    </div>
  );
};
