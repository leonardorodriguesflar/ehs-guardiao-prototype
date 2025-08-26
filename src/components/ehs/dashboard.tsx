import { Header, Container, Main } from "@/components/ui/layout";
import { ModuleCard } from "@/components/ui/module-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  ClipboardCheck, 
  FileText, 
  BookOpen, 
  Bell, 
  User,
  Menu
} from "lucide-react";
import abbottLogo from "@/assets/abbott-logo.jpg";

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const modules = [
    {
      id: "report",
      title: "Reportar Ocorrência",
      description: "Registrar incidentes e condições inseguras",
      icon: AlertTriangle,
      variant: "primary" as const
    },
    {
      id: "inspection",
      title: "Realizar Inspeção",
      description: "Executar checklists de segurança",
      icon: ClipboardCheck,
      variant: "success" as const
    },
    {
      id: "reports",
      title: "Meus Relatórios",
      description: "Visualizar histórico de reportes",
      icon: FileText,
      variant: "default" as const
    },
    {
      id: "library",
      title: "Biblioteca EHS",
      description: "Documentos e procedimentos",
      icon: BookOpen,
      variant: "default" as const
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header>
        <Container>
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <img 
                src={abbottLogo} 
                alt="Abbott" 
                className="h-8 w-16 object-cover rounded"
              />
              <div>
                <h1 className="font-bold text-lg text-foreground">Guardião Abbott</h1>
                <p className="text-xs text-muted-foreground">Sistema EHS</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Container>
      </Header>

      <Main>
        <Container className="py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Bem-vindo ao Sistema EHS
            </h2>
            <p className="text-muted-foreground">
              Escolha um módulo para começar
            </p>
          </div>

          {/* Quick Alerts */}
          <div className="bg-gradient-card rounded-xl p-4 mb-8 border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Bell className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Avisos Importantes</h3>
                  <p className="text-sm text-muted-foreground">
                    Treinamento obrigatório de segurança - Prazo: 15 dias
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="border-warning text-warning">
                Pendente
              </Badge>
            </div>
          </div>

          {/* Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module) => (
              <ModuleCard
                key={module.id}
                title={module.title}
                description={module.description}
                icon={module.icon}
                variant={module.variant}
                onClick={() => onNavigate(module.id)}
              />
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-card rounded-lg p-4 border border-border/50">
              <div className="text-2xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Reportes Ativos</div>
            </div>
            <div className="bg-gradient-card rounded-lg p-4 border border-border/50">
              <div className="text-2xl font-bold text-success">12</div>
              <div className="text-sm text-muted-foreground">Inspeções OK</div>
            </div>
            <div className="bg-gradient-card rounded-lg p-4 border border-border/50">
              <div className="text-2xl font-bold text-warning">3</div>
              <div className="text-sm text-muted-foreground">Pendências</div>
            </div>
            <div className="bg-gradient-card rounded-lg p-4 border border-border/50">
              <div className="text-2xl font-bold text-accent">98%</div>
              <div className="text-sm text-muted-foreground">Conformidade</div>
            </div>
          </div>
        </Container>
      </Main>
    </div>
  );
};