import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { forwardRef } from "react";

interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
}

export const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ children, loading, loadingText, disabled, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "transition-all duration-200",
          loading && "cursor-not-allowed",
          className
        )}
        {...props}
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <LoadingSpinner size="sm" />
            <span>{loadingText || "Carregando..."}</span>
          </div>
        ) : (
          children
        )}
      </Button>
    );
  }
);

EnhancedButton.displayName = "EnhancedButton";