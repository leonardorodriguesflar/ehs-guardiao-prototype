import { useEffect, useState } from "react";
import { Layout } from "@/components/ui/layout";
import abbottLogo from "@/assets/abbott-logo.jpg";

interface SplashScreenProps {
  onLoadingComplete: () => void;
}

export const SplashScreen = ({ onLoadingComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [onLoadingComplete]);

  return (
    <Layout className="bg-gradient-hero">
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="text-center space-y-8 max-w-md">
          {/* Logo */}
          <div className="mx-auto w-32 h-16 rounded-xl overflow-hidden shadow-hero">
            <img 
              src={abbottLogo} 
              alt="Abbott" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* App Title */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">
              Guardião Abbott
            </h1>
            <p className="text-primary-light text-lg">
              Sistema EHS Corporativo
            </p>
          </div>

          {/* Loading Progress */}
          <div className="w-full space-y-2">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-white/80 text-sm">
              Carregando... {Math.round(progress)}%
            </p>
          </div>

          {/* Loading Animation */}
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/30 border-t-white" />
          </div>
        </div>
      </div>
    </Layout>
  );
};