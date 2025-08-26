import { useState } from "react";
import { SplashScreen } from "@/components/ehs/splash-screen";
import { Dashboard } from "@/components/ehs/dashboard";
import { ReportForm } from "@/components/ehs/report-form";
import { InspectionForm } from "@/components/ehs/inspection-form";
import { MyReports } from "@/components/ehs/my-reports";
import { Library } from "@/components/ehs/library";

type AppState = "loading" | "dashboard" | "report" | "inspection" | "reports" | "library";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("loading");

  const handleLoadingComplete = () => {
    setCurrentState("dashboard");
  };

  const handleNavigate = (page: string) => {
    setCurrentState(page as AppState);
  };

  const handleBack = () => {
    setCurrentState("dashboard");
  };

  if (currentState === "loading") {
    return <SplashScreen onLoadingComplete={handleLoadingComplete} />;
  }

  if (currentState === "dashboard") {
    return <Dashboard onNavigate={handleNavigate} />;
  }

  if (currentState === "report") {
    return <ReportForm onBack={handleBack} />;
  }

  if (currentState === "inspection") {
    return <InspectionForm onBack={handleBack} />;
  }

  if (currentState === "reports") {
    return <MyReports onBack={handleBack} />;
  }

  if (currentState === "library") {
    return <Library onBack={handleBack} />;
  }

  return <Dashboard onNavigate={handleNavigate} />;
};

export default Index;
