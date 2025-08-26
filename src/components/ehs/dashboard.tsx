import { useState, useEffect } from "react";
import { Header, Container, Main } from "@/components/ui/layout";
import { ModuleCard } from "@/components/ui/module-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/hooks/use-local-storage";
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
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <Header className="bg-white/95 backdrop-blur-sm border-b border-white/20 shadow-hero">
        <Container>
          <div className="flex items-center justify-between h-20 py-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white rounded-xl shadow-card">
                <img 
                  src={abbottLogo} 
                  alt="Abbott" 
                  className="h-10 w-20 object-contain"
                />
              </div>
              <div>
                <h1 className="font-bold text-xl text-primary">Guardião Abbott</h1>
                <p className="text-sm text-primary/70">Sistema EHS Corporativo</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden text-primary hover:bg-primary/10">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Container>
      </Header>

      <Main>
        <Container className="py-12">
          {/* Welcome Section */}
          <div className="mb-12 text-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white drop-shadow-lg">
                Bem-vindo ao Sistema EHS
              </h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
                Mantenha o ambiente de trabalho seguro e saudável. Reporte ocorrências, 
                realize inspeções e acesse recursos importantes de segurança.
              </p>
              <div className="flex justify-center">
                <div className={`backdrop-blur-sm rounded-full px-6 py-3 border transition-all ${
                  isOnline 
                    ? "bg-success/10 border-success/20" 
                    : "bg-destructive/10 border-destructive/20"
                }`}>
                  <p className={`text-sm font-medium ${
                    isOnline ? "text-white/90" : "text-white/80"
                  }`}>
                    {isOnline ? "✅ Sistema Online" : "⚠️ Sistema Offline"} • Última sincronização: {
                      isOnline ? "agora" : "indisponível"
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Alerts */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 mb-12 border border-white/30 shadow-hero">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-warning to-warning/80 rounded-xl shadow-card">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Avisos Importantes</h3>
                  <p className="text-muted-foreground">
                    Treinamento obrigatório de segurança - Prazo: 15 dias
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="border-warning text-warning font-semibold px-4 py-2">
                Pendente
              </Badge>
            </div>
          </div>

          {/* Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {modules.map((module, index) => (
              <ModuleCard
                key={module.id}
                title={module.title}
                description={module.description}
                icon={module.icon}
                variant={module.variant}
                onClick={() => onNavigate(module.id)}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-hero hover:shadow-elevated transition-all duration-300 hover:scale-105 animate-fade-in cursor-pointer group">
              <div className="group-hover:animate-bounce-subtle">
                <div className="text-center space-y-3">
                  <div className="text-3xl font-bold text-primary">5</div>
                  <div className="text-sm font-medium text-muted-foreground">Reportes Ativos</div>
                </div>
              </div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-hero hover:shadow-elevated transition-all duration-300 hover:scale-105 animate-fade-in cursor-pointer group" style={{ animationDelay: "0.1s" }}>
              <div className="group-hover:animate-bounce-subtle">
                <div className="text-center space-y-3">
                  <div className="text-3xl font-bold text-success">12</div>
                  <div className="text-sm font-medium text-muted-foreground">Inspeções OK</div>
                </div>
              </div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-hero hover:shadow-elevated transition-all duration-300 hover:scale-105 animate-fade-in cursor-pointer group" style={{ animationDelay: "0.2s" }}>
              <div className="group-hover:animate-bounce-subtle">
                <div className="text-center space-y-3">
                  <div className="text-3xl font-bold text-warning">3</div>
                  <div className="text-sm font-medium text-muted-foreground">Pendências</div>
                </div>
              </div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-hero hover:shadow-elevated transition-all duration-300 hover:scale-105 animate-fade-in cursor-pointer group" style={{ animationDelay: "0.3s" }}>
              <div className="group-hover:animate-bounce-subtle">
                <div className="text-center space-y-3">
                  <div className="text-3xl font-bold text-success">98%</div>
                  <div className="text-sm font-medium text-muted-foreground">Conformidade</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Main>
    </div>
  );
};