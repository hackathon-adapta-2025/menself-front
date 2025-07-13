import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Pages
import { Home } from "./pages/Home";
import { Plan } from "./pages/Plan";
import { Suggestions } from "./pages/Suggestions";
import { Progress } from "./pages/Progress";
import { Profile } from "./pages/Profile";
import { TaskDetail } from "./pages/TaskDetail";
import { SuggestionDetail } from "./pages/SuggestionDetail";

// Onboarding
import { OnboardingStep1 } from "./pages/Onboarding/OnboardingStep1";
import { OnboardingStep2 } from "./pages/Onboarding/OnboardingStep2";
import { OnboardingStep3 } from "./pages/Onboarding/OnboardingStep3";
import { OnboardingStep4 } from "./pages/Onboarding/OnboardingStep4";
import { OnboardingStep5 } from "./pages/Onboarding/OnboardingStep5";
import { OnboardingPreview } from "./pages/Onboarding/OnboardingPreview";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    const completed = localStorage.getItem('onboarding_completed') === 'true';
    setIsOnboardingCompleted(completed);
  }, []);

  if (isOnboardingCompleted === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-inter">
      <Routes>
        {!isOnboardingCompleted ? (
          <>
            <Route path="/onboarding/step1" element={<OnboardingStep1 />} />
            <Route path="/onboarding/step2" element={<OnboardingStep2 />} />
            <Route path="/onboarding/step3" element={<OnboardingStep3 />} />
            <Route path="/onboarding/step4" element={<OnboardingStep4 />} />
            <Route path="/onboarding/step5" element={<OnboardingStep5 />} />
            <Route path="/onboarding/preview" element={<OnboardingPreview />} />
            <Route path="*" element={<Navigate to="/onboarding/step1" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/suggestions" element={<Suggestions />} />
            <Route path="/suggestions/:id" element={<SuggestionDetail />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/task/:id" element={<TaskDetail />} />
            <Route path="/onboarding/*" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
