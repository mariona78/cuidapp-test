import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Heart, 
  Users, 
  Stethoscope, 
  Settings, 
  Activity, 
  Circle,
  ArrowRight,
  User
} from 'lucide-react';

interface AssessmentOverviewProps {
  onStartAssessment: () => void;
}

export const AssessmentOverview = ({ onStartAssessment }: AssessmentOverviewProps) => {
  const categories = [
    {
      id: 'geriatric-syndromes',
      name: 'Síndromes Geriàtriques',
      color: 'bg-blue-500',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      icon: Stethoscope,
      position: 'top-left',
      tests: ['AAT', 'CAM', 'Escala de Braden', 'MNA', 'MNA-SF', 'Test volum-viscositat', 'EAT-10', 'ICDQ-UI SF', 'Escala de Tinetti', 'Escala de Downton', 'TUG', 'SPPB']
    },
    {
      id: 'functional',
      name: 'Funcional',
      color: 'bg-red-500',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      icon: Settings,
      position: 'top-right',
      tests: ['Activitats Instrumentals', 'Activitats Bàsiques', 'Escala de Lawton i Brody', 'Índex de Barthel']
    },
    {
      id: 'cognitive',
      name: 'Cognitiu',
      color: 'bg-green-500',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      icon: Brain,
      position: 'middle-right',
      tests: ['Test de Pfeiffer', 'MEC (Lobo)', "Test de l'Informador"]
    },
    {
      id: 'emotional',
      name: 'Emocional',
      color: 'bg-purple-500',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      icon: Heart,
      position: 'bottom-right',
      tests: ['Síndrome Depressiva', 'GDS Yesavage (5 items)', 'Malestar Emocional', 'GDS Yesavage (15 items)', 'DME', 'Escala de Cornell']
    },
    {
      id: 'social',
      name: 'Social',
      color: 'bg-pink-500',
      borderColor: 'border-pink-200',
      textColor: 'text-pink-700',
      icon: Users,
      position: 'bottom-left',
      tests: ['Risc Social', 'Escala de TSO', 'Sobrecàrrega Cuidador', 'SSM-Cat', 'Test de Zarit (7 items)', 'Test de Zarit (22 items)', 'Escala Oslo-3']
    },
    {
      id: 'frailty',
      name: 'Valoració de fragilitat',
      color: 'bg-orange-500',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      icon: Activity,
      position: 'middle-left',
      tests: ['Gérontopôle Frailty Screening Test (GFST)', 'Índex Fràgil-VIG (IF-VIG)', 'HexCom-RED']
    }
  ];

  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'top-left':
        return 'absolute top-4 left-4 w-72';
      case 'top-right':
        return 'absolute top-4 right-4 w-72';
      case 'middle-right':
        return 'absolute top-1/2 right-4 w-72 -translate-y-1/2';
      case 'bottom-right':
        return 'absolute bottom-4 right-4 w-72';
      case 'bottom-left':
        return 'absolute bottom-4 left-4 w-72';
      case 'middle-left':
        return 'absolute top-1/2 left-4 w-72 -translate-y-1/2';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Valoració Multidimensional
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Sistema integral d'avaluació geriàtrica per a una atenció personalitzada
          </p>
          <Button 
            onClick={onStartAssessment}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3"
          >
            <User className="w-5 h-5 mr-2" />
            Començar Valoració
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Central Diagram */}
        <div className="relative w-full h-[700px] flex items-center justify-center mb-8">
          {/* Central Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex flex-col items-center justify-center text-white shadow-2xl z-10">
              <div className="text-center px-4">
                <div className="text-base font-bold mb-1">ESCALES PER A LA</div>
                <div className="text-sm font-semibold mb-1">VALORACIÓ</div>
                <div className="text-sm font-semibold">MULTIDIMENSIONAL</div>
              </div>
            </div>
          </div>

          {/* Category Cards */}
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className={getPositionClasses(category.position)}>
                <Card className={`${category.borderColor} border-2 bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <div className={`${category.color} p-2 rounded-lg text-white`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`font-semibold text-sm ${category.textColor}`}>
                          {category.name}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {category.tests.length} tests
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-3">
                    <div className="space-y-1">
                      {category.tests.slice(0, 3).map((test, index) => (
                        <div key={index} className="text-xs text-gray-600 flex items-center gap-1">
                          <Circle className="w-1.5 h-1.5 fill-current" />
                          <span className="truncate">{test}</span>
                        </div>
                      ))}
                      {category.tests.length > 3 && (
                        <div className="text-xs text-gray-500 italic">
                          +{category.tests.length - 3} més...
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Lines connecting center to each category */}
            {categories.map((_, index) => {
              const positions = [
                { x: 200, y: 150 }, // top-left
                { x: 600, y: 150 }, // top-right  
                { x: 600, y: 350 }, // middle-right
                { x: 600, y: 550 }, // bottom-right
                { x: 200, y: 550 }, // bottom-left
                { x: 200, y: 350 }  // middle-left
              ];
              
              const centerX = 400;
              const centerY = 350;
              const pos = positions[index];
              
              return (
                <line
                  key={index}
                  x1={centerX}
                  y1={centerY}
                  x2={pos.x}
                  y2={pos.y}
                  stroke="#e5e7eb"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.6"
                />
              );
            })}
          </svg>
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Avaluació Completa</h3>
              <p className="text-sm text-gray-600">
                Més de 50 tests especialitzats per una valoració integral
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Basat en l'Evidència</h3>
              <p className="text-sm text-gray-600">
                Tests validats i reconeguts internacionalment
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Atenció Personalitzada</h3>
              <p className="text-sm text-gray-600">
                Resultats adaptats a cada pacient individual
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};