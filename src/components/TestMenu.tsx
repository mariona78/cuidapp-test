
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Circle, User, Brain, Heart, Users, Stethoscope, Settings } from 'lucide-react';

interface TestMenuProps {
  selectedPatient: string;
  completedTests: string[];
  onCategorySelected: (category: string) => void;
  onFinishAssessment: () => void;
  onBack: () => void;
}

export const TestMenu = ({ 
  selectedPatient, 
  completedTests, 
  onCategorySelected, 
  onFinishAssessment, 
  onBack 
}: TestMenuProps) => {
  
  const categories = [
    {
      id: 'geriatric-syndromes',
      name: 'Síndromes Geriàtriques',
      color: 'bg-blue-500',
      icon: Stethoscope,
      tests: ['AAT', 'CAM', 'Escala de Braden', 'MNA', 'MNA-SF', 'Test volum-viscositat', 'EAT-10', 'ICDQ-UI SF', 'Escala de Tinetti', 'Escala de Downton', 'TUG', 'SPPB']
    },
    {
      id: 'functional',
      name: 'Funcional',
      color: 'bg-red-500',
      icon: Settings,
      tests: ['Activitats Instrumentals de la Vida Diària', 'Activitats Bàsiques de la Vida Diària', 'Escala de Lawton i Brody', 'Índex de Barthel']
    },
    {
      id: 'cognitive',
      name: 'Cognitiu',
      color: 'bg-green-500',
      icon: Brain,
      tests: ['Test de Pfeiffer', 'MEC (Lobo)', "Test de l'Informador"]
    },
    {
      id: 'emotional',
      name: 'Emocional',
      color: 'bg-purple-500',
      icon: Heart,
      tests: ['Síndrome Depressiva', 'GDS Yesavage (5 items)', 'Malestar Emocional', 'GDS Yesavage (15 items)', 'DME', 'Escala de Cornell']
    },
    {
      id: 'social',
      name: 'Social',
      color: 'bg-pink-500',
      icon: Users,
      tests: ['Risc Social', 'Escala de TSO', 'Sobrecàrrega Cuidador', 'SSM-Cat', 'Test de Zarit (7 items)', 'Test de Zarit (22 items)', 'Escala Oslo-3']
    },
    {
      id: 'others',
      name: 'Altres',
      color: 'bg-yellow-500',
      icon: Circle,
      tests: ['PAINAD', 'ESAS', 'EuroQOL 5D', 'Escala Visual Analògica', 'Escala ARMS', 'Índex MIG', 'Gérontopôle', 'HexCom-Red', 'Necpal 4.0']
    }
  ];

  const getCategoryProgress = (categoryTests: string[]) => {
    const completedInCategory = categoryTests.filter(test => completedTests.includes(test)).length;
    return { completed: completedInCategory, total: categoryTests.length };
  };

  const totalTests = categories.reduce((sum, cat) => sum + cat.tests.length, 0);
  const totalCompleted = completedTests.length;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={onBack} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="text-center flex-1">
                <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Valoració Multidimensional
                </CardTitle>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700 font-medium">{selectedPatient}</span>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {totalCompleted}/{totalTests} tests
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const progress = getCategoryProgress(category.tests);
            const Icon = category.icon;
            
            return (
              <Card 
                key={category.id} 
                className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => onCategorySelected(category.id)}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`${category.color} p-3 rounded-lg text-white`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{category.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {progress.completed}/{progress.total} completats
                          </Badge>
                          {progress.completed === progress.total && progress.total > 0 && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Progrés</span>
                        <span>{Math.round((progress.completed / progress.total) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${category.color} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Finish Assessment Button */}
        {totalCompleted > 0 && (
          <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Finalitzar Valoració</h3>
              <p className="text-purple-100 mb-4">
                Has completat {totalCompleted} tests. Pots generar la valoració final.
              </p>
              <Button 
                onClick={onFinishAssessment}
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Generar Valoració Final
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
