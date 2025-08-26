import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ModuleCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "primary" | "warning" | "success";
}

export const ModuleCard = ({ 
  title, 
  description, 
  icon: Icon, 
  onClick, 
  className,
  variant = "default" 
}: ModuleCardProps) => {
  return (
    <Card 
      className={cn(
        "group relative overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-hero hover:-translate-y-2 active:scale-98",
        "bg-white/95 backdrop-blur-sm border border-white/30 shadow-elevated hover:bg-white hover:border-white/50",
        variant === "primary" && "bg-gradient-primary text-white shadow-hero hover:shadow-elevated border-white/20 hover:border-white/40",
        variant === "warning" && "border-warning/30 hover:border-warning/50",
        variant === "success" && "border-success/30 hover:border-success/50",
        className
      )}
      onClick={onClick}
    >
      {/* Background decoration with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-50 blur-xl transition-all duration-700" />
      
      <CardContent className="relative z-10 p-8 flex flex-col items-center text-center space-y-6">
        <div className={cn(
          "flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
          variant === "default" && "bg-primary/10 text-primary group-hover:bg-primary/20",
          variant === "primary" && "bg-white/20 text-white backdrop-blur-sm",
          variant === "warning" && "bg-warning/10 text-warning group-hover:bg-warning/20",
          variant === "success" && "bg-success/10 text-success group-hover:bg-success/20"
        )}>
          <Icon className="h-8 w-8 transition-all duration-500 group-hover:scale-110" />
        </div>
        
        <div className="space-y-3">
          <h3 className={cn(
            "text-xl font-bold transition-all duration-300 group-hover:scale-105",
            variant === "primary" ? "text-white" : "text-foreground group-hover:text-primary"
          )}>
            {title}
          </h3>
          {description && (
            <p className={cn(
              "text-sm leading-relaxed transition-colors duration-300",
              variant === "primary" ? "text-white/95" : "text-muted-foreground group-hover:text-foreground"
            )}>
              {description}
            </p>
          )}
        </div>
        
        {/* Hover indicator */}
        <div className={cn(
          "h-1 w-0 rounded-full transition-all duration-500 group-hover:w-12",
          variant === "primary" ? "bg-white/50" : "bg-primary"
        )} />
      </CardContent>
    </Card>
  );
};