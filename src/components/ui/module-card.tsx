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
        "cursor-pointer transition-all duration-300 hover:shadow-elevated hover:-translate-y-1",
        "bg-gradient-card border-border/50 backdrop-blur-sm",
        variant === "primary" && "border-primary/20 hover:border-primary/40 hover:shadow-[0_8px_24px_hsl(213_100%_40%/0.15)]",
        variant === "warning" && "border-warning/20 hover:border-warning/40",
        variant === "success" && "border-success/20 hover:border-success/40",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 flex items-center space-x-4">
        <div className={cn(
          "p-3 rounded-xl",
          variant === "default" && "bg-primary/10 text-primary",
          variant === "primary" && "bg-primary text-primary-foreground",
          variant === "warning" && "bg-warning text-warning-foreground",
          variant === "success" && "bg-success text-success-foreground"
        )}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-card-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};