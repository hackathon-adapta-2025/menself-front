
import { Check, ArrowRight, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete?.();
  };

  const handleCardClick = () => {
    // Encontrar o ID da tarefa baseado no título
    const taskId = title === 'Hidratação facial matinal' ? '1' : 
                   title === '10 minutos de postura' ? '2' : 
                   title === 'Escolha do outfit' ? '3' : '1';
    navigate(`/task/${taskId}`);
  };

  return (
    <div 
      className={`glass-card ai-interactive ai-shimmer rounded-xl p-4 cursor-pointer ${
        isCompleted ? 'opacity-60 ai-selected' : ''
      }`}
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-2 transition-all duration-300 hover:scale-105 ${categoryColors[category]}`}>
            {categoryLabels[category]}
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1 transition-colors duration-300">{title}</h3>
          <p className="text-sm text-muted-foreground transition-colors duration-300">{description}</p>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleComplete();
          }}
          disabled={isCompleted}
          className={`ml-3 w-8 h-8 rounded-full border-2 flex items-center justify-center ai-interactive transition-all duration-300 ${
            isCompleted 
              ? 'bg-primary border-primary text-white ai-selected' 
              : 'border-secondary hover:border-primary hover:bg-primary/10'
          }`}
        >
          {isCompleted && <Check size={16} strokeWidth={3} className="animate-pulse" />}
        </button>
      </div>

      {progress > 0 && (
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-muted-foreground transition-colors duration-300">Progresso</span>
            <span className="text-xs font-medium text-foreground transition-colors duration-300">{progress}%</span>
          </div>
          <div className="w-full bg-secondary/30 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-700 ai-shimmer"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
