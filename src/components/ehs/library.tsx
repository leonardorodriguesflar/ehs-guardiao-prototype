import { Header, Container, Main } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  BookOpen, 
  Search,
  Download,
  FileText,
  Shield,
  AlertTriangle,
  Heart,
  HardHat,
  Zap
} from "lucide-react";
import abbottLogo from "@/assets/abbott-logo.jpg";

interface LibraryProps {
  onBack: () => void;
}

export const Library = ({ onBack }: LibraryProps) => {
  const documents = [
    {
      id: 1,
      title: "Política de Segurança Abbott",
      description: "Diretrizes corporativas de segurança e saúde ocupacional",
      category: "politica",
      type: "PDF",
      size: "2.5 MB",
      lastUpdated: "2024-08-01",
      icon: Shield,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      id: 2,
      title: "Manual de Primeiros Socorros",
      description: "Procedimentos básicos de atendimento em emergências médicas",
      category: "emergencia",
      type: "PDF",
      size: "4.1 MB",
      lastUpdated: "2024-07-15",
      icon: Heart,
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    },
    {
      id: 3,
      title: "Procedimento de Evacuação",
      description: "Instruções detalhadas para evacuação de emergência",
      category: "emergencia",
      type: "PDF",
      size: "1.8 MB",
      lastUpdated: "2024-07-20",
      icon: AlertTriangle,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      id: 4,
      title: "Manual de EPIs",
      description: "Guia completo sobre equipamentos de proteção individual",
      category: "equipamentos",
      type: "PDF",
      size: "3.2 MB",
      lastUpdated: "2024-06-30",
      icon: HardHat,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      id: 5,
      title: "Procedimentos de Segurança Elétrica",
      description: "Normas e cuidados com instalações e equipamentos elétricos",
      category: "seguranca",
      type: "PDF",
      size: "2.9 MB",
      lastUpdated: "2024-08-10",
      icon: Zap,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      id: 6,
      title: "Formulário de Investigação de Acidentes",
      description: "Modelo padrão para investigação detalhada de acidentes",
      category: "formularios",
      type: "DOCX",
      size: "0.5 MB",
      lastUpdated: "2024-07-05",
      icon: FileText,
      color: "text-muted-foreground",
      bgColor: "bg-muted"
    }
  ];

  const categories = [
    { value: "all", label: "Todos", count: documents.length },
    { value: "politica", label: "Políticas", count: documents.filter(d => d.category === "politica").length },
    { value: "emergencia", label: "Emergência", count: documents.filter(d => d.category === "emergencia").length },
    { value: "equipamentos", label: "Equipamentos", count: documents.filter(d => d.category === "equipamentos").length },
    { value: "seguranca", label: "Segurança", count: documents.filter(d => d.category === "seguranca").length },
    { value: "formularios", label: "Formulários", count: documents.filter(d => d.category === "formularios").length }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
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
                <h1 className="font-bold text-lg text-foreground">Biblioteca EHS</h1>
                <p className="text-xs text-muted-foreground">Documentos e procedimentos</p>
              </div>
            </div>
          </div>
        </Container>
      </Header>

      <Main>
        <Container className="py-8">
          {/* Search and Filters */}
          <div className="space-y-6 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar documentos..."
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={category.value === "all" ? "default" : "outline"}
                  size="sm"
                  className="h-8"
                >
                  {category.label} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Document Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <Card key={doc.id} className="hover:shadow-elevated transition-all hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${doc.bgColor}`}>
                      <doc.icon className={`h-5 w-5 ${doc.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base line-clamp-2 mb-1">
                        {doc.title}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {doc.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {doc.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{doc.size}</span>
                    <span>Atualizado: {formatDate(doc.lastUpdated)}</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-primary"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Documento
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Access Section */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-foreground mb-6">Acesso Rápido</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-card border-primary/20 hover:border-primary/40 cursor-pointer transition-colors">
                <CardContent className="p-4 text-center">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-medium text-foreground">Políticas Corporativas</h4>
                  <p className="text-xs text-muted-foreground mt-1">1 documento</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-destructive/20 hover:border-destructive/40 cursor-pointer transition-colors">
                <CardContent className="p-4 text-center">
                  <Heart className="h-8 w-8 text-destructive mx-auto mb-2" />
                  <h4 className="font-medium text-foreground">Primeiros Socorros</h4>
                  <p className="text-xs text-muted-foreground mt-1">2 documentos</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-success/20 hover:border-success/40 cursor-pointer transition-colors">
                <CardContent className="p-4 text-center">
                  <HardHat className="h-8 w-8 text-success mx-auto mb-2" />
                  <h4 className="font-medium text-foreground">EPIs</h4>
                  <p className="text-xs text-muted-foreground mt-1">1 documento</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-warning/20 hover:border-warning/40 cursor-pointer transition-colors">
                <CardContent className="p-4 text-center">
                  <FileText className="h-8 w-8 text-warning mx-auto mb-2" />
                  <h4 className="font-medium text-foreground">Formulários</h4>
                  <p className="text-xs text-muted-foreground mt-1">1 documento</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Main>
    </div>
  );
};