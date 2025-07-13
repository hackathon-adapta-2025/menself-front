
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Target, Zap, Sparkles } from 'lucide-react';
import { Header } from '../../components/Layout/Header';

const lifestyleOptions = [
  {
    id: 'essential',
    title: 'Essencial',
    description: 'Rotina tranquila, foco no básico que funciona.',
    icon: Users,
  },
  {
    id: 'disciplined',
    title: 'Disciplinado',
    description: 'Gosta de seguir rotinas e atingir metas.',
    icon: Target,
  },
  {
    id: 'rush',
    title: 'Correria',
    description: 'Pouco tempo e muita coisa pra fazer.',
    icon: Zap,
  },
  {
    id: 'transformation',
    title: 'Transformação Total',
    description: 'Quer mudar tudo e se comprometer com isso.',
    icon: Sparkles,
  },
];

export const OnboardingStep4 = () => {
  const [selectedLifestyle, setSelectedLifestyle] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedLifestyle) {
      localStorage.setItem('onboarding_lifestyle', selectedLifestyle);
      navigate('/onboarding/step5');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Passo 4/6" showBack />
      
      <div className="px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Como é seu estilo de vida?
          </h1>
          <p className="text-muted-foreground body-text">
            Isso nos ajuda a criar um plano que se encaixe perfeitamente na sua rotina.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {lifestyleOptions.map((option) => {
            const IconComponent = option.icon;
            const isSelected = selectedLifestyle === option.id;
            
            return (
              <button
                key={option.id}
                onClick={() => setSelectedLifestyle(option.id)}
                className={`w-full glass-card rounded-xl p-4 text-left transition-all ${
                  isSelected 
                    ? 'ring-2 ring-primary bg-primary/10' 
                    : 'hover:bg-white/10'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    isSelected ? 'bg-primary text-white' : 'bg-secondary/30 text-secondary'
                  }`}>
                    <IconComponent size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {option.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={!selectedLifestyle}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-secondary disabled:text-muted-foreground text-white py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center"
        >
          Continuar
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>

      <div className="px-4 pb-8">
        <div className="w-full bg-secondary/30 rounded-full h-2">
          <div className="bg-primary h-2 rounded-full w-4/6 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};
