import { Heart, Eye, Info } from 'lucide-react';
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

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(id);
  };

  const handleLearnMore = () => {
    navigate(`/suggestions/${id}`);
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden w-full">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
            {categoryLabels[category]}
          </span>
        </div>
        <button
          onClick={handleLike}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
            isLiked 
              ? 'bg-primary/90 text-white' 
              : 'bg-black/30 text-white hover:bg-black/50'
          }`}
        >
          <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        <div className="flex space-x-3">
          <button
            onClick={handleLearnMore}
            className="flex-1 border border-secondary text-secondary hover:bg-secondary/10 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <Info size={16} className="mr-2" />
            Saiba mais
          </button>
          
          <button
            onClick={() => onVisualize?.(id)}
            className="flex-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <Eye size={16} className="mr-2" />
            Preview
          </button>
        </div>
      </div>
    </div>
  );
};
