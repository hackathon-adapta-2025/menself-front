
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Header } from '../../components/Layout/Header';

const timeOptions = [
  { id: '15min', label: '15 minutos/dia', description: 'Básico e rápido' },
  { id: '30min', label: '30 minutos/dia', description: 'Recomendado' },
  { id: '45min', label: '45 minutos/dia', description: 'Mais completo' },
  { id: '60min', label: '1 hora/dia', description: 'Máximo resultado' },
];

export const OnboardingStep5 = () => {
  const [selectedTime, setSelectedTime] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedTime) {
      localStorage.setItem('onboarding_time', selectedTime);
      navigate('/onboarding/step6');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        showLogo 
        logoSrc="/lovable-uploads/68b3e0c8-9c1f-4db4-9eeb-6f8daba716d4.png"
        showBack 
      />
      
      <div className="px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Quanto tempo você tem disponível?
          </h1>
          <p className="text-muted-foreground body-text">
            Vamos criar um cronograma que funcione para sua rotina.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {timeOptions.map((option) => {
            const isSelected = selectedTime === option.id;
            
            return (
              <button
                key={option.id}
                onClick={() => setSelectedTime(option.id)}
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
                    <Clock size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {option.label}
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
          disabled={!selectedTime}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-secondary disabled:text-muted-foreground text-white py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center"
        >
          Continuar
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>

      <div className="px-4 pb-8">
        <div className="w-full bg-secondary/30 rounded-full h-2">
          <div className="bg-primary h-2 rounded-full w-5/6 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};
