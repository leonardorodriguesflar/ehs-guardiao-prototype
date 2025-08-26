import { useState } from "react";
import { Header, Container, Main } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { useFormValidation } from "@/hooks/use-form-validation";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { 
  ArrowLeft, 
  Camera, 
  MapPin, 
  AlertTriangle,
  Send,
  Clock
} from "lucide-react";
import abbottLogo from "@/assets/abbott-logo.jpg";

interface ReportFormProps {
  onBack: () => void;
}

export const ReportForm = ({ onBack }: ReportFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedReports, setSavedReports] = useLocalStorage('ehs-reports', []);
  
  const { data: formData, errors, touched, updateField, touchField, validateAll, resetForm } = useFormValidation(
    {
      type: "",
      location: "",
      description: "",
      riskLevel: "",
      date: new Date().toISOString().slice(0, 16)
    },
    {
      type: { required: true },
      location: { required: true, minLength: 3 },
      description: { required: true, minLength: 10, maxLength: 1000 },
      date: { required: true }
    }
  );

  const reportTypes = [
    { value: "incident", label: "Incidente" },
    { value: "near-miss", label: "Quase Acidente" },
    { value: "unsafe-condition", label: "Condição Insegura" },
    { value: "behavioral", label: "Observação Comportamental" }
  ];

  const riskLevels = [
    { value: "low", label: "Baixo", color: "bg-success" },
    { value: "medium", label: "Médio", color: "bg-warning" },
    { value: "high", label: "Alto", color: "bg-destructive" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAll()) {
      toast({
        title: "Formulário inválido",
        description: "Por favor, corrija os erros antes de enviar.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate protocol number
      const protocol = `EHS-${Date.now().toString().slice(-6)}`;
      
      // Save to local storage
      const newReport = {
        ...formData,
        id: protocol,
        status: "em-analise",
        submittedAt: new Date().toISOString()
      };
      
      setSavedReports((prev: any[]) => [newReport, ...prev]);
      
      toast({
        title: "Reporte enviado com sucesso!",
        description: `Protocolo: ${protocol}`,
        variant: "default"
      });

      resetForm();
      setTimeout(onBack, 1500);
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
                <h1 className="font-bold text-lg text-foreground">Reportar Ocorrência</h1>
                <p className="text-xs text-muted-foreground">Novo reporte EHS</p>
              </div>
            </div>
          </div>
        </Container>
      </Header>

      <Main>
        <Container className="py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Report Type */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <span>Tipo de Reporte</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => updateField('type', value)}
                  >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de reporte" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {touched.type && errors.type && (
                  <p className="text-sm text-destructive animate-fade-in">{errors.type}</p>
                )}
              </CardContent>
            </Card>

            {/* Date and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Data e Hora</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => updateField('date', e.target.value)}
                    onBlur={() => touchField('date')}
                    className={touched.date && errors.date ? "border-destructive" : ""}
                  />
                  {touched.date && errors.date && (
                    <p className="text-sm text-destructive animate-fade-in">{errors.date}</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Localização</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Ex: Laboratório A, Setor 3"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    onBlur={() => touchField('location')}
                    className={touched.location && errors.location ? "border-destructive" : ""}
                  />
                  {touched.location && errors.location && (
                    <p className="text-sm text-destructive animate-fade-in">{errors.location}</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Descrição Detalhada</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="description">Descreva o que aconteceu *</Label>
                  <Textarea
                    id="description"
                    placeholder="Forneça uma descrição detalhada do evento, incluindo circunstâncias, pessoas envolvidas e possíveis causas..."
                    className={`min-h-24 ${touched.description && errors.description ? "border-destructive" : ""}`}
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    onBlur={() => touchField('description')}
                  />
                  {touched.description && errors.description && (
                    <p className="text-sm text-destructive animate-fade-in">{errors.description}</p>
                  )}
                  <div className="text-xs text-muted-foreground">
                    {formData.description.length}/1000 caracteres
                  </div>
                </div>

                {/* Photo attachment */}
                <div className="flex items-center space-x-4">
                  <Button type="button" variant="outline" className="flex items-center space-x-2">
                    <Camera className="h-4 w-4" />
                    <span>Anexar Fotos</span>
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Máximo 5 fotos
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Risk Level */}
            <Card>
              <CardHeader>
                <CardTitle>Nível de Risco (Opcional)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {riskLevels.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => updateField('riskLevel', level.value)}
                      className="relative transition-transform hover:scale-105"
                    >
                      <Badge 
                        variant={formData.riskLevel === level.value ? "default" : "outline"}
                        className={`cursor-pointer transition-all ${
                          formData.riskLevel === level.value 
                            ? `${level.color} text-white border-transparent` 
                            : "hover:border-primary"
                        }`}
                      >
                        {level.label}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 animate-fade-in">
              <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
                Cancelar
              </Button>
              <EnhancedButton 
                type="submit" 
                className="bg-gradient-primary"
                loading={isSubmitting}
                loadingText="Enviando..."
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar Relatório
              </EnhancedButton>
            </div>
          </form>
        </Container>
      </Main>
    </div>
  );
};