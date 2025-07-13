
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SuggestionCardProps {
  id: string;
  title: string;
  category: 'colorimetria' | 'corte' | 'barba' | 'estilo';
  imageUrl: string;
  description: string;
  liked?: boolean;
  onLike?: (id: string) => void;
  onVisualize?: (id: string) => void;
}

const categoryLabels = {
  colorimetria: 'Colorimetria',
  corte: 'Corte de Cabelo',
  barba: 'Barba',
  estilo: 'Estilo',
};

export const SuggestionCard = ({
  id,
  title,
  category,
  imageUrl,
  description,
  liked = false,
  onLike,
  onVisualize,
}: SuggestionCardProps) => {
  const [isLiked, setIsLiked] = useState(liked);
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    onLike?.(id);
  };

  const handleCardClick = () => {
    navigate(`/suggestions/${id}`);
  };

  return (
    <div 
      className="glass-card rounded-xl p-4 w-full cursor-pointer hover:scale-[1.02] transition-transform duration-200"
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium">
            {categoryLabels[category]}
          </span>
          <h3 className="font-semibold text-foreground mt-2 mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        
        <button
          onClick={handleLike}
          className={`ml-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isLiked 
              ? 'bg-primary/90 text-white' 
              : 'bg-muted hover:bg-muted/80 text-muted-foreground'
          }`}
        >
          <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
};
