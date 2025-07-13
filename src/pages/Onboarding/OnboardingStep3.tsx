import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Scissors, Palette, Dumbbell, Shirt } from "lucide-react";
import { Header } from "../../components/Layout/Header";

const goals = [
  {
    id: "hair",
    title: "Cabelo e Barba",
    description: "Cortes, cuidados e estilo",
    icon: Scissors,
  },
  {
    id: "skin",
    title: "Cuidados com a Pele",
    description: "Skincare e colorimetria",
    icon: Palette,
  },
  {
    id: "fitness",
    title: "Forma Física",
    description: "Exercícios e postura",
    icon: Dumbbell,
  },
  {
    id: "style",
    title: "Estilo Pessoal",
    description: "Roupas e acessórios",
    icon: Shirt,
  },
];

export const OnboardingStep3 = () => {
  const [selectedGoal, setSelectedGoal] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedGoal) {
      localStorage.setItem("onboarding_goal", selectedGoal);
      navigate("/onboarding/step4");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        showLogo
        logoSrc="/uploads/68b3e0c8-9c1f-4db4-9eeb-6f8daba716d4.png"
        showBack
      />

      <div className="px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Qual parte do visual você mais quer evoluir?
          </h1>
          <p className="text-muted-foreground body-text">
            Escolha seu foco principal. Você pode trabalhar outras áreas depois.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {goals.map((goal) => {
            const IconComponent = goal.icon;
            const isSelected = selectedGoal === goal.id;

            return (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={`w-full glass-card rounded-xl p-4 text-left transition-all ${
                  isSelected
                    ? "ring-2 ring-primary bg-primary/10"
                    : "hover:bg-white/10"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-secondary/30 text-secondary"
                    }`}
                  >
                    <IconComponent size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {goal.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {goal.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={!selectedGoal}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-secondary disabled:text-muted-foreground text-white py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center"
        >
          Continuar
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>

      <div className="px-4 pb-8">
        <div className="w-full bg-secondary/30 rounded-full h-2">
          <div className="bg-primary h-2 rounded-full w-3/6 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};
