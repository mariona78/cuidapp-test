import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, AlertTriangle, CheckCircle } from 'lucide-react';

interface FragilVigCalculatorProps {
  onComplete: (score: number, interpretation: string) => void;
}

export const FragilVigCalculator = ({ onComplete }: FragilVigCalculatorProps) => {
  const [responses, setResponses] = useState<Record<string, number>>({});

  const domains = [
    {
      id: 'functional',
      name: 'Funcionalitat',
      questions: [
        { id: 'barthel', text: 'Índex de Barthel', options: [
          { value: 0, label: '≥ 90 punts (Independent)' },
          { value: 1, label: '60-89 punts (Dependència lleu)' },
          { value: 2, label: '40-59 punts (Dependència moderada)' },
          { value: 3, label: '< 40 punts (Dependència severa)' }
        ]},
        { id: 'lawton', text: 'Escala de Lawton', options: [
          { value: 0, label: '≥ 6 punts (Independent)' },
          { value: 1, label: '4-5 punts (Dependència lleu)' },
          { value: 2, label: '2-3 punts (Dependència moderada)' },
          { value: 3, label: '< 2 punts (Dependència severa)' }
        ]}
      ]
    },
    {
      id: 'cognitive',
      name: 'Cognició',
      questions: [
        { id: 'pfeiffer', text: 'Test de Pfeiffer', options: [
          { value: 0, label: '0-2 errors (Normal)' },
          { value: 1, label: '3-4 errors (Deteriorament lleu)' },
          { value: 2, label: '5-7 errors (Deteriorament moderat)' },
          { value: 3, label: '≥ 8 errors (Deteriorament sever)' }
        ]}
      ]
    },
    {
      id: 'nutritional',
      name: 'Estat nutricional',
      questions: [
        { id: 'mna', text: 'Mini Nutritional Assessment (MNA)', options: [
          { value: 0, label: '≥ 24 punts (Estat nutricional normal)' },
          { value: 1, label: '17-23.5 punts (Risc de malnutrició)' },
          { value: 2, label: '< 17 punts (Malnutrició)' }
        ]},
        { id: 'weight_loss', text: 'Pèrdua de pes involuntària', options: [
          { value: 0, label: 'No pèrdua de pes' },
          { value: 1, label: 'Pèrdua < 5% en 6 mesos' },
          { value: 2, label: 'Pèrdua ≥ 5% en 6 mesos' }
        ]}
      ]
    },
    {
      id: 'comorbidity',
      name: 'Comorbiditat',
      questions: [
        { id: 'charlson', text: 'Índex de Charlson', options: [
          { value: 0, label: '0-1 punts' },
          { value: 1, label: '2-3 punts' },
          { value: 2, label: '≥ 4 punts' }
        ]},
        { id: 'medications', text: 'Nombre de fàrmacs', options: [
          { value: 0, label: '< 5 fàrmacs' },
          { value: 1, label: '5-9 fàrmacs' },
          { value: 2, label: '≥ 10 fàrmacs' }
        ]}
      ]
    },
    {
      id: 'social',
      name: 'Risc social',
      questions: [
        { id: 'social_support', text: 'Suport social', options: [
          { value: 0, label: 'Adequat' },
          { value: 1, label: 'Lleugerament inadequat' },
          { value: 2, label: 'Inadequat' }
        ]},
        { id: 'caregiver', text: 'Sobrecàrrega del cuidador', options: [
          { value: 0, label: 'No sobrecàrrega' },
          { value: 1, label: 'Sobrecàrrega lleu' },
          { value: 2, label: 'Sobrecàrrega intensa' }
        ]}
      ]
    }
  ];

  const handleResponseChange = (questionId: string, value: number) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateScore = () => {
    const totalQuestions = domains.reduce((sum, domain) => sum + domain.questions.length, 0);
    const answeredQuestions = Object.keys(responses).length;
    
    if (answeredQuestions < totalQuestions) {
      return null;
    }

    const totalScore = Object.values(responses).reduce((sum, value) => sum + value, 0);
    const maxScore = domains.reduce((sum, domain) => 
      sum + domain.questions.reduce((domainSum, question) => 
        domainSum + Math.max(...question.options.map(opt => opt.value)), 0), 0);
    
    const percentage = (totalScore / maxScore) * 100;
    return { totalScore, percentage };
  };

  const getInterpretation = (percentage: number) => {
    if (percentage < 20) return { level: 'Robust', color: 'bg-green-500', description: 'Persona robusta, baixa fragilitat' };
    if (percentage < 35) return { level: 'Pre-fràgil', color: 'bg-yellow-500', description: 'Risc de fragilitat, vigilància i prevenció' };
    if (percentage < 50) return { level: 'Fràgil lleu', color: 'bg-orange-500', description: 'Fragilitat lleu, intervenció recomanada' };
    if (percentage < 65) return { level: 'Fràgil moderat', color: 'bg-red-500', description: 'Fragilitat moderada, intervenció necessària' };
    return { level: 'Fràgil sever', color: 'bg-red-700', description: 'Fragilitat severa, intervenció urgent' };
  };

  const handleComplete = () => {
    const score = calculateScore();
    if (score) {
      const interpretation = getInterpretation(score.percentage);
      onComplete(score.totalScore, `${interpretation.level}: ${interpretation.description}`);
    }
  };

  const score = calculateScore();
  const interpretation = score ? getInterpretation(score.percentage) : null;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Calculadora Índex Fràgil-VIG
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-orange-100">
            Valoració multidimensional de la fragilitat en persones grans
          </p>
        </CardContent>
      </Card>

      {domains.map((domain) => (
        <Card key={domain.id} className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">{domain.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {domain.questions.map((question) => (
              <div key={question.id} className="space-y-3">
                <Label className="text-base font-medium">{question.text}</Label>
                <RadioGroup
                  value={responses[question.id]?.toString() || ''}
                  onValueChange={(value) => handleResponseChange(question.id, parseInt(value))}
                >
                  {question.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={option.value.toString()} 
                        id={`${question.id}-${option.value}`} 
                      />
                      <Label htmlFor={`${question.id}-${option.value}`}>
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {score && interpretation && (
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Resultats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{score.totalScore}</div>
                <div className="text-sm text-gray-600">Puntuació total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{score.percentage.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Percentatge fragilitat</div>
              </div>
            </div>
            
            <div className="text-center">
              <Badge className={`${interpretation.color} text-white text-base px-4 py-2`}>
                {interpretation.level}
              </Badge>
              <p className="text-gray-700 mt-2">{interpretation.description}</p>
            </div>

            <Button 
              onClick={handleComplete}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Completar Avaluació IF-VIG
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};