
import { Check, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface TaskCardProps {
  title: string;
  description: string;
  category: 'exercise' | 'nutrition' | 'skincare' | 'posture' | 'style';
  progress?: number;
  completed?: boolean;
  onComplete?: () => void;
  onSkip?: () => void;
}

const categoryColors = {
  exercise: 'bg-blue-500/20 text-blue-400',
  nutrition: 'bg-green-500/20 text-green-400',
  skincare: 'bg-purple-500/20 text-purple-400',
  posture: 'bg-yellow-500/20 text-yellow-400',
  style: 'bg-pink-500/20 text-pink-400',
};

const categoryLabels = {
  exercise: 'Exercício',
  nutrition: 'Nutrição',
  skincare: 'Skincare',
  posture: 'Postura',
  style: 'Estilo',
};

export const TaskCard = ({
  title,
  description,
  category,
  progress = 0,
  completed = false,
  onComplete,
  onSkip,
}: TaskCardProps) => {
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete?.();
  };

  return (
    <div className={`glass-card rounded-xl p-4 transition-all duration-200 ${
      isCompleted ? 'opacity-60 scale-95' : 'hover:scale-[1.02]'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-2 ${categoryColors[category]}`}>
            {categoryLabels[category]}
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        
        <button
          onClick={handleComplete}
          disabled={isCompleted}
          className={`ml-3 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
            isCompleted 
              ? 'bg-primary border-primary text-white' 
              : 'border-secondary hover:border-primary'
          }`}
        >
          {isCompleted && <Check size={16} strokeWidth={3} />}
        </button>
      </div>

      {progress > 0 && (
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-muted-foreground">Progresso</span>
            <span className="text-xs font-medium text-foreground">{progress}%</span>
          </div>
          <div className="w-full bg-secondary/30 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {!isCompleted && (
        <div className="flex space-x-2 mt-4">
          <button
            onClick={handleComplete}
            className="flex-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Concluir
            <ArrowRight size={16} className="ml-1" />
          </button>
          {onSkip && (
            <button
              onClick={onSkip}
              className="px-4 py-2 text-secondary hover:text-foreground transition-colors"
            >
              Pular
            </button>
          )}
        </div>
      )}
    </div>
  );
};
