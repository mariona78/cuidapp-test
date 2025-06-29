
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, User, Calendar, RotateCcw, Download } from 'lucide-react';

interface FinalAssessmentProps {
  patient: string;
  completedTests: string[];
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
    if (testCount >= 15) return { level: 'Completa', color: 'bg-green-500', description: 'Valoració multidimensional completa realitzada' };
    if (testCount >= 8) return { level: 'Adequada', color: 'bg-blue-500', description: 'Valoració adequada amb àrees clau avaluades' };
    if (testCount >= 4) return { level: 'Bàsica', color: 'bg-yellow-500', description: 'Valoració bàsica completada' };
    return { level: 'Limitada', color: 'bg-red-500', description: 'Valoració limitada, considerar ampliar avaluació' };
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
              <h4 className="font-semibold mb-2">Resum d'àrees avaluades:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {completedTests.map((test, index) => (
                  <Badge key={index} variant="outline" className="justify-start">
                    {test}
                  </Badge>
                ))}
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
