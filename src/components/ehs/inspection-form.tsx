import { useState } from "react";
import { Header, Container, Main } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  ClipboardCheck, 
  CheckCircle, 
  XCircle, 
  Camera,
  Send
} from "lucide-react";
import abbottLogo from "@/assets/abbott-logo.jpg";

interface InspectionFormProps {
  onBack: () => void;
}

export const InspectionForm = ({ onBack }: InspectionFormProps) => {
  const [selectedInspection, setSelectedInspection] = useState("");
  const [inspectionStarted, setInspectionStarted] = useState(false);
  const [responses, setResponses] = useState<Record<string, {
    status: "conforme" | "nao-conforme" | "na";
    comment?: string;
  }>>({});

  const inspectionTypes = [
    { value: "extinguisher", label: "Inspeção de Extintores" },
    { value: "ergonomics", label: "Checklist de Ergonomia" },
    { value: "5s", label: "Auditoria de 5S" },
    { value: "emergency", label: "Equipamentos de Emergência" }
  ];

  const inspectionItems = {
    extinguisher: [
      "Extintor está desobstruído e sinalizado",
      "Manômetro indica pressão adequada",
      "Lacre está intacto",
      "Extintor fixado adequadamente",
      "Prazo de validade dentro do limite"
    ],
    ergonomics: [
      "Monitor na altura adequada dos olhos",
      "Pés apoiados no chão ou apoio",
      "Punhos em posição neutra",
      "Cadeira com apoio lombar",
      "Iluminação adequada no posto"
    ],
    "5s": [
      "Área de trabalho organizada (Seiri)",
      "Materiais em seus devidos lugares (Seiton)",
      "Local limpo e sem sujeira (Seiso)",
      "Padrões visuais sendo seguidos (Seiketsu)",
      "Disciplina na manutenção dos 4S (Shitsuke)"
    ],
    emergency: [
      "Rota de fuga desobstruída",
      "Iluminação de emergência funcionando",
      "Alarme de incêndio operacional",
      "Equipamentos de primeiros socorros completos",
      "Ponto de encontro sinalizado"
    ]
  };

  const handleStartInspection = () => {
    if (!selectedInspection) return;
    setInspectionStarted(true);
  };

  const handleResponse = (itemIndex: number, status: "conforme" | "nao-conforme" | "na") => {
    setResponses({
      ...responses,
      [itemIndex]: { ...responses[itemIndex], status }
    });
  };

  const handleComment = (itemIndex: number, comment: string) => {
    setResponses({
      ...responses,
      [itemIndex]: { ...responses[itemIndex], comment }
    });
  };

  const handleSubmit = () => {
    const items = inspectionItems[selectedInspection as keyof typeof inspectionItems] || [];
    const totalItems = items.length;
    const answeredItems = Object.keys(responses).length;

    if (answeredItems < totalItems) {
      toast({
        title: "Inspeção Incompleta",
        description: "Por favor, responda todos os itens da inspeção.",
        variant: "destructive"
      });
      return;
    }

    const protocol = `INS-${Date.now().toString().slice(-6)}`;
    
    toast({
      title: "Inspeção finalizada com sucesso!",
      description: `Protocolo: ${protocol}`,
      variant: "default"
    });

    setTimeout(onBack, 2000);
  };

  if (!inspectionStarted) {
    return (
      <div className="min-h-screen bg-background">
        <Header>
          <Container>
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={onBack}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <img 
                  src={abbottLogo} 
                  alt="Abbott" 
                  className="h-8 w-16 object-cover rounded"
                />
                <div>
                  <h1 className="font-bold text-lg text-foreground">Realizar Inspeção</h1>
                  <p className="text-xs text-muted-foreground">Escolha o tipo de inspeção</p>
                </div>
              </div>
            </div>
          </Container>
        </Header>

        <Main>
          <Container className="py-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ClipboardCheck className="h-5 w-5 text-primary" />
                  <span>Selecionar Tipo de Inspeção</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Select value={selectedInspection} onValueChange={setSelectedInspection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha o tipo de inspeção" />
                  </SelectTrigger>
                  <SelectContent>
                    {inspectionTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button 
                  onClick={handleStartInspection}
                  disabled={!selectedInspection}
                  className="w-full bg-gradient-primary"
                >
                  Iniciar Inspeção
                </Button>
              </CardContent>
            </Card>
          </Container>
        </Main>
      </div>
    );
  }

  const currentItems = inspectionItems[selectedInspection as keyof typeof inspectionItems] || [];
  const selectedType = inspectionTypes.find(t => t.value === selectedInspection);

  return (
    <div className="min-h-screen bg-background">
      <Header>
        <Container>
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => setInspectionStarted(false)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <img 
                src={abbottLogo} 
                alt="Abbott" 
                className="h-8 w-16 object-cover rounded"
              />
              <div>
                <h1 className="font-bold text-lg text-foreground">{selectedType?.label}</h1>
                <p className="text-xs text-muted-foreground">
                  {Object.keys(responses).length} de {currentItems.length} itens
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Header>

      <Main>
        <Container className="py-8 space-y-6">
          {currentItems.map((item, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">{index + 1}. {item}</h3>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant={responses[index]?.status === "conforme" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleResponse(index, "conforme")}
                      className={responses[index]?.status === "conforme" ? "bg-success hover:bg-success/90" : ""}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Conforme
                    </Button>
                    
                    <Button
                      variant={responses[index]?.status === "nao-conforme" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleResponse(index, "nao-conforme")}
                      className={responses[index]?.status === "nao-conforme" ? "bg-destructive hover:bg-destructive/90" : ""}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Não Conforme
                    </Button>
                    
                    <Button
                      variant={responses[index]?.status === "na" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleResponse(index, "na")}
                      className={responses[index]?.status === "na" ? "bg-muted hover:bg-muted/90" : ""}
                    >
                      N/A
                    </Button>
                  </div>

                  {responses[index]?.status === "nao-conforme" && (
                    <div className="space-y-3 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <Textarea
                        placeholder="Descreva a não conformidade e ações necessárias..."
                        value={responses[index]?.comment || ""}
                        onChange={(e) => handleComment(index, e.target.value)}
                      />
                      <Button type="button" variant="outline" size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Anexar Evidência
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
              
              {responses[index]?.status && (
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant="outline"
                    className={
                      responses[index]?.status === "conforme" ? "border-success text-success" :
                      responses[index]?.status === "nao-conforme" ? "border-destructive text-destructive" :
                      "border-muted-foreground text-muted-foreground"
                    }
                  >
                    {responses[index]?.status === "conforme" ? "OK" :
                     responses[index]?.status === "nao-conforme" ? "NC" : "N/A"}
                  </Badge>
                </div>
              )}
            </Card>
          ))}

          <div className="flex justify-end space-x-4 pt-6">
            <Button 
              variant="outline" 
              onClick={() => setInspectionStarted(false)}
            >
              Voltar
            </Button>
            <Button 
              onClick={handleSubmit}
              className="bg-gradient-primary"
              disabled={Object.keys(responses).length < currentItems.length}
            >
              <Send className="h-4 w-4 mr-2" />
              Finalizar Inspeção
            </Button>
          </div>
        </Container>
      </Main>
    </div>
  );
};