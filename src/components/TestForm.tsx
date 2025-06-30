import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface TestFormProps {
  category: string;
  patient: string;
  onTestCompleted: (testName: string) => void;
  onBack: () => void;
}

export const TestForm = ({ category, patient, onTestCompleted, onBack }: TestFormProps) => {
  const [selectedTest, setSelectedTest] = useState<string>('');
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [observations, setObservations] = useState('');

  const categoryTests = {
    'geriatric-syndromes': [
      { id: 'aat', name: 'AAT - Avaluació Anticoagulant', questions: ['Risc de sagnat', 'Adherència al tractament', 'Control INR'] },
      { id: 'cam', name: 'CAM - Confusion Assessment Method', questions: ['Inici agut', 'Atenció', 'Pensament desorganitzat', 'Nivell de consciència'] },
      { id: 'braden', name: 'Escala de Braden', questions: ['Percepció sensorial', 'Humitat', 'Activitat', 'Mobilitat', 'Nutrició', 'Fricció'] }
    ],
    'functional': [
      { id: 'lawton', name: 'Escala de Lawton i Brody', questions: ['Usar telèfon', 'Comprar', 'Preparar menjar', 'Cuidar casa', 'Rentar roba', 'Transport', 'Medicació', 'Diners'] },
      { id: 'barthel', name: 'Índex de Barthel', questions: ['Menjar', 'Banyar-se', 'Vestir-se', 'Arreglar-se', 'Deposició', 'Micció', 'Anar al lavabo', 'Transferències', 'Mobilitat', 'Escales'] }
    ],
    'cognitive': [
      { id: 'pfeiffer', name: 'Test de Pfeiffer', questions: ['Data', 'Dia setmana', 'Lloc', 'Número telèfon', 'Edat', 'Naixement', 'President', 'Nom mare', 'Restar 3', 'Restar 3 més'] },
      { id: 'mec', name: 'MEC (Lobo)', questions: ['Orientació temporal', 'Orientació espacial', 'Fixació', 'Atenció', 'Memòria', 'Denominació', 'Repetició', 'Comprensió', 'Lectura', 'Escriptura', 'Dibuix'] }
    ],
    'emotional': [
      { id: 'gds5', name: 'GDS Yesavage (5 items)', questions: ['Satisfet amb la vida', 'Abandona activitats', 'Vida buida', 'S\'avorreix sovint', 'Bon humor'] },
      { id: 'gds15', name: 'GDS Yesavage (15 items)', questions: ['Satisfet amb la vida', 'Abandona activitats', 'Vida buida', 'S\'avorreix sovint', 'Bon humor', 'Por del futur', 'Feliç la major part', 'Se sent indefens', 'Prefereix quedar-se a casa', 'Problemes de memòria', 'És meravellós viure', 'Se sent inútil', 'Ple d\'energia', 'Situació desesperada', 'Altres estan millor'] }
    ],
    'social': [
      { id: 'zarit7', name: 'Test de Zarit (7 items)', questions: ['Demana més ajuda', 'No té temps suficient', 'Estressat per cuidar', 'Vergonya comportament', 'Enfadat amb familiar', 'Afecta relacions', 'Por pel futur'] },
      { id: 'oslo3', name: 'Escala Oslo-3', questions: ['Nombre persones properes', 'Interès i preocupació', 'Facilitat obtenir ajuda'] }
    ],
    'others': [
      { id: 'painad', name: 'PAINAD', questions: ['Respiració', 'Vocalització negativa', 'Expressió facial', 'Llenguatge corporal', 'Consolabilitat'] },
      { id: 'esas', name: 'ESAS - Escala Simptomes', questions: ['Dolor', 'Cansament', 'Nàusees', 'Depressió', 'Ansietat', 'Somnolència', 'Apetit', 'Sensació benestar', 'Dificultat respirar'] },
      { id: 'gfst', name: 'Gérontopôle Frailty Screening Test (GFST)', questions: ['Pèrdua de pes involuntària', 'Fatiga', 'Grip strength', 'Velocitat de marxa', 'Activitat física'] },
      { id: 'if-vig', name: 'Índex Fràgil-VIG (IF-VIG)', questions: ['Funcionalitat', 'Comorbiditat', 'Cognició', 'Estat nutricional', 'Risc social'] },
      { id: 'hexcom-red', name: 'HexCom-RED', questions: ['Complexitat clínica', 'Complexitat social', 'Utilització serveis', 'Pronòstic', 'Preferències pacient'] }
    ]
  };

  const currentTests = categoryTests[category as keyof typeof categoryTests] || [];

  const handleTestSelection = (testId: string) => {
    setSelectedTest(testId);
    setResponses({});
    setObservations('');
  };

  const handleResponseChange = (questionIndex: number, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionIndex]: value
    }));
  };

  const handleSubmit = () => {
    const test = currentTests.find(t => t.id === selectedTest);
    if (test) {
      onTestCompleted(test.name);
    }
  };

  const selectedTestData = currentTests.find(t => t.id === selectedTest);
  const isComplete = selectedTestData && 
    selectedTestData.questions.every((_, index) => responses[index]);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Formulari de Tests
                </CardTitle>
                <p className="text-gray-600">Pacient: {patient}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Test Selection */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Selecciona un Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {currentTests.map((test) => (
                <Button
                  key={test.id}
                  variant={selectedTest === test.id ? "default" : "outline"}
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => handleTestSelection(test.id)}
                >
                  <div>
                    <div className="font-medium">{test.name}</div>
                    <div className="text-xs text-gray-500">{test.questions.length} preguntes</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Test Form */}
          <div className="lg:col-span-2">
            {selectedTestData ? (
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">{selectedTestData.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedTestData.questions.map((question, index) => (
                    <div key={index} className="space-y-3">
                      <Label className="text-base font-medium">{index + 1}. {question}</Label>
                      <RadioGroup
                        value={responses[index] || ''}
                        onValueChange={(value) => handleResponseChange(index, value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id={`q${index}-0`} />
                          <Label htmlFor={`q${index}-0`}>0 - Normal/Absent</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id={`q${index}-1`} />
                          <Label htmlFor={`q${index}-1`}>1 - Lleu</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2" id={`q${index}-2`} />
                          <Label htmlFor={`q${index}-2`}>2 - Moderat</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3" id={`q${index}-3`} />
                          <Label htmlFor={`q${index}-3`}>3 - Sever</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  ))}

                  <div className="space-y-3">
                    <Label htmlFor="observations">Observacions</Label>
                    <Textarea
                      id="observations"
                      placeholder="Afegeix observacions addicionals..."
                      value={observations}
                      onChange={(e) => setObservations(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button 
                    onClick={handleSubmit}
                    disabled={!isComplete}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    {isComplete ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completar Test
                      </>
                    ) : (
                      'Completa totes les preguntes'
                    )}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardContent className="p-12 text-center">
                  <p className="text-gray-500">Selecciona un test per començar l'avaluació</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
