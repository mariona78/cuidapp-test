import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Plus } from 'lucide-react';

interface PatientSelectorProps {
  onPatientSelected: (patientName: string) => void;
}

export const PatientSelector = ({ onPatientSelected }: PatientSelectorProps) => {
  const [newPatientName, setNewPatientName] = useState('');
  const [existingPatients] = useState([
    'Maria García López',
    'Josep Martínez Vila',
    'Anna Rodríguez Soler',
    'Francesc Pérez Ruiz'
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPatientName.trim()) {
      onPatientSelected(newPatientName.trim());
    }
  };

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Seleccionar Pacient
          </CardTitle>
          <p className="text-gray-600">Tria un pacient existent o afegeix-ne un de nou</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Existing Patients */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4" />
              Pacients Existents
            </h3>
            <div className="grid gap-2">
              {existingPatients.map((patient, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto p-4 hover:bg-purple-50 hover:border-purple-200 transition-colors"
                  onClick={() => onPatientSelected(patient)}
                >
                  <User className="w-4 h-4 mr-2" />
                  {patient}
                </Button>
              ))}
            </div>
          </div>

          {/* New Patient */}
          <div className="border-t pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nou Pacient
              </h3>
              <div>
                <Label htmlFor="patientName">Nom complet del pacient</Label>
                <Input
                  id="patientName"
                  type="text"
                  placeholder="Introdueix el nom del pacient..."
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                disabled={!newPatientName.trim()}
              >
                Continuar amb aquest pacient
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
