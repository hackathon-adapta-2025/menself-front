import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Header } from "../../components/Layout/Header";
import { submitOnboarding } from "../../utils/onboarding"; // Ajuste o caminho conforme sua estrutura

const preferences = [
  {
    id: "classic",
    label: "Clássico & Sofisticado",
    description: "Visual elegante com peças atemporais e cortes refinados.",
  },
  {
    id: "modern",
    label: "Moderno & Minimalista",
    description: "Estilo urbano com foco em simplicidade e funcionalidade.",
  },
  {
    id: "sporty",
    label: "Esportivo & Saudável",
    description: "Aparência ativa com roupas confortáveis e toque atlético.",
  },
  {
    id: "creative",
    label: "Criativo & Autêntico",
    description:
      "Visual marcante que valoriza originalidade e expressão pessoal.",
  },
  {
    id: "casual",
    label: "Casual & Natural",
    description: "Estilo leve e descomplicado para o dia a dia.",
  },
];

export const OnboardingStep6 = () => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const togglePreference = (id: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleFinishOnboarding = async () => {
    if (selectedPreferences.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      // Salvar as preferências no localStorage antes de enviar
      localStorage.setItem(
        "onboarding_preferences",
        JSON.stringify(selectedPreferences)
      );

      // Enviar todos os dados do onboarding para a API
      const result = await submitOnboarding();

      if (result.success) {
        console.log("Onboarding concluído com sucesso:", result.data);

        navigate("/");
      } else {
        setError(result.message);
        console.error("Erro no onboarding:", result.message);
      }
    } catch (error) {
      const errorMessage =
        "Erro inesperado ao finalizar configuração. Tente novamente.";
      setError(errorMessage);
      console.error("Erro inesperado:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Passo 6/6" showBack />

      <div className="px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Qual seu estilo ideal?
          </h1>
          <p className="text-muted-foreground body-text">
            Selecione as opções que mais combinam com você. Pode escolher mais
            de uma!
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4 mb-8">
          {preferences.map((preference) => {
            const isSelected = selectedPreferences.includes(preference.id);

            return (
              <button
                key={preference.id}
                onClick={() => togglePreference(preference.id)}
                disabled={isLoading}
                className={`w-full glass-card rounded-xl p-5 text-left transition-all flex items-start justify-between ${
                  isSelected
                    ? "ring-2 ring-primary bg-primary/10"
                    : "hover:bg-white/10"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="flex-1 pr-4">
                  <h3 className="font-semibold text-foreground mb-2">
                    {preference.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {preference.description}
                  </p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                    isSelected
                      ? "bg-primary border-primary text-white"
                      : "border-secondary"
                  }`}
                >
                  {isSelected && <Check size={16} strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleFinishOnboarding}
          disabled={selectedPreferences.length === 0 || isLoading}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-secondary disabled:text-muted-foreground text-white py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="mr-2 animate-spin" />
              Finalizando...
            </>
          ) : (
            <>
              Finalizar Configuração
              <ArrowRight size={20} className="ml-2" />
            </>
          )}
        </button>
      </div>

      <div className="px-4 pb-8">
        <div className="w-full bg-secondary/30 rounded-full h-2">
          <div className="bg-primary h-2 rounded-full w-full transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};
