
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ArrowRight, Upload } from 'lucide-react';
import { Header } from '../../components/Layout/Header';

export const OnboardingStep2 = () => {
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const navigate = useNavigate();

  const handleSelfie = () => {
    // Simula upload de selfie
    setSelfieUploaded(true);
  };

  const handleNext = () => {
    if (selfieUploaded) {
      navigate('/onboarding/step3');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Passo 2/5" showBack />
      
      <div className="px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Vamos capturar seu momento atual
          </h1>
          <p className="text-muted-foreground body-text">
            Tire uma selfie para que possamos criar sugestões personalizadas para você.
          </p>
        </div>

        <div className="mb-8">
          <div className="glass-card rounded-xl p-8 text-center">
            {!selfieUploaded ? (
              <>
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Selfie frontal
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Para melhores resultados, tire a foto em um ambiente bem iluminado
                </p>
                <button
                  onClick={handleSelfie}
                  className="bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center mx-auto"
                >
                  <Camera size={20} className="mr-2" />
                  Tirar Selfie
                </button>
              </>
            ) : (
              <>
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload size={32} className="text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Selfie capturada!
                </h3>
                <p className="text-sm text-muted-foreground">
                  Perfeito! Agora podemos criar sugestões personalizadas
                </p>
              </>
            )}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={!selfieUploaded}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-secondary disabled:text-muted-foreground text-white py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center"
        >
          Continuar
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>

      <div className="px-4 pb-8">
        <div className="w-full bg-secondary/30 rounded-full h-2">
          <div className="bg-primary h-2 rounded-full w-2/5 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};
