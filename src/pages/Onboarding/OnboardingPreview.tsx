
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, AlertTriangle } from 'lucide-react';
import { Header } from '../../components/Layout/Header';

export const OnboardingPreview = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('onboarding_name') || 'Usuário';

  const handleStartPlan = () => {
    localStorage.setItem('onboarding_completed', 'true');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Seu Futuro Visual" />
      
      <div className="px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles size={32} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Olá, {userName}!
          </h1>
          <p className="text-muted-foreground body-text">
            Aqui está uma projeção de como você pode ficar após 12 meses seguindo nosso plano personalizado.
          </p>
        </div>

        <div className="glass-card rounded-xl p-6 mb-6">
          {/* Placeholder para imagem IA - em um app real seria gerada */}
          <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <Sparkles size={48} className="text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Projeção de seu visual em +12 meses
              </p>
            </div>
          </div>
          
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 flex items-start">
            <AlertTriangle size={20} className="text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-yellow-100">
              <strong>Importante:</strong> Esta é uma projeção artística baseada em suas preferências. 
              Resultados reais dependem da consistência e dedicação ao plano.
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="glass-card rounded-xl p-4">
            <h3 className="font-semibold text-foreground mb-2">Seu plano inclui:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Rotina diária personalizada de cuidados</li>
              <li>• Sugestões de cortes e estilos ideais</li>
              <li>• Exercícios para postura e confiança</li>
              <li>• Dicas de skincare para seu tipo de pele</li>
              <li>• Orientações de estilo e colorimetria</li>
            </ul>
          </div>
        </div>

        <button
          onClick={handleStartPlan}
          className="w-full bg-primary hover:bg-primary/90 text-white py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center"
        >
          Começar Minha Jornada
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
};
