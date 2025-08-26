import { Header, Container, Main } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  FileText, 
  ClipboardCheck, 
  Eye,
  Calendar,
  MapPin,
  AlertTriangle
} from "lucide-react";
import abbottLogo from "@/assets/abbott-logo.jpg";

interface MyReportsProps {
  onBack: () => void;
}

export const MyReports = ({ onBack }: MyReportsProps) => {
  const mockReports = [
    {
      id: "EHS-001234",
      type: "incident",
      title: "Incidente",
      description: "Pequeno derramamento de material químico no laboratório",
      date: "2024-08-25T14:30:00",
      location: "Laboratório A - Setor 3",
      status: "em-analise",
      riskLevel: "medium"
    },
    {
      id: "EHS-001235",
      type: "near-miss",
      title: "Quase Acidente",
      description: "Colaborador quase escorregou em área molhada",
      date: "2024-08-24T09:15:00",
      location: "Corredor Principal",
      status: "resolvido",
      riskLevel: "low"
    },
    {
      id: "EHS-001236",
      type: "unsafe-condition",
      title: "Condição Insegura",
      description: "Extintor com lacre rompido identificado",
      date: "2024-08-23T16:45:00",
      location: "Sala de Reuniões B",
      status: "pendente",
      riskLevel: "high"
    }
  ];

  const mockInspections = [
    {
      id: "INS-567890",
      type: "extinguisher",
      title: "Inspeção de Extintores",
      date: "2024-08-25T10:00:00",
      location: "Andar 2 - Setor A",
      status: "concluida",
      conformity: 95
    },
    {
      id: "INS-567891",
      type: "5s",
      title: "Auditoria de 5S",
      date: "2024-08-24T14:30:00",
      location: "Área de Produção",
      status: "concluida",
      conformity: 88
    },
    {
      id: "INS-567892",
      type: "ergonomics",
      title: "Checklist de Ergonomia",
      date: "2024-08-23T11:15:00",
      location: "Escritório Administrativo",
      status: "pendente-revisao",
      conformity: 76
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      "pendente": { variant: "outline" as const, className: "border-warning text-warning", label: "Pendente" },
      "em-analise": { variant: "outline" as const, className: "border-primary text-primary", label: "Em Análise" },
      "resolvido": { variant: "outline" as const, className: "border-success text-success", label: "Resolvido" },
      "concluida": { variant: "outline" as const, className: "border-success text-success", label: "Concluída" },
      "pendente-revisao": { variant: "outline" as const, className: "border-warning text-warning", label: "Pendente Revisão" }
    };
    
    const config = variants[status as keyof typeof variants] || variants.pendente;
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getRiskBadge = (level: string) => {
    const configs = {
      "low": { className: "bg-success text-success-foreground", label: "Baixo" },
      "medium": { className: "bg-warning text-warning-foreground", label: "Médio" },
      "high": { className: "bg-destructive text-destructive-foreground", label: "Alto" }
    };
    
    const config = configs[level as keyof typeof configs];
    return config ? (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    ) : null;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
                <h1 className="font-bold text-lg text-foreground">Meus Relatórios</h1>
                <p className="text-xs text-muted-foreground">Histórico de atividades</p>
              </div>
            </div>
          </div>
        </Container>
      </Header>

      <Main>
        <Container className="py-8">
          <Tabs defaultValue="reports" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reports" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Reportes</span>
              </TabsTrigger>
              <TabsTrigger value="inspections" className="flex items-center space-x-2">
                <ClipboardCheck className="h-4 w-4" />
                <span>Inspeções</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reports" className="space-y-4">
              {mockReports.map((report) => (
                <Card key={report.id} className="hover:shadow-elevated transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-primary" />
                        <span>{report.title}</span>
                      </CardTitle>
                      {getStatusBadge(report.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">{report.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(report.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{report.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium">Protocolo:</span>
                        <code className="bg-muted px-2 py-1 rounded text-sm">{report.id}</code>
                        {report.riskLevel && getRiskBadge(report.riskLevel)}
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="inspections" className="space-y-4">
              {mockInspections.map((inspection) => (
                <Card key={inspection.id} className="hover:shadow-elevated transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <ClipboardCheck className="h-5 w-5 text-primary" />
                        <span>{inspection.title}</span>
                      </CardTitle>
                      {getStatusBadge(inspection.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(inspection.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{inspection.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <span className="text-sm font-medium">Protocolo:</span>
                          <code className="bg-muted px-2 py-1 rounded text-sm ml-2">{inspection.id}</code>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Conformidade:</span>
                          <Badge 
                            variant="outline"
                            className={
                              inspection.conformity >= 90 ? "border-success text-success" :
                              inspection.conformity >= 75 ? "border-warning text-warning" :
                              "border-destructive text-destructive"
                            }
                          >
                            {inspection.conformity}%
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </Container>
      </Main>
    </div>
  );
};