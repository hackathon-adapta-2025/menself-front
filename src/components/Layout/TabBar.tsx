
import { Home, Map, Heart, TrendingUp, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'plan', label: 'Plano', icon: Map, path: '/plan' },
  { id: 'suggestions', label: 'Sugestões', icon: Heart, path: '/suggestions' },
  { id: 'progress', label: 'Progresso', icon: TrendingUp, path: '/progress' },
  { id: 'profile', label: 'Perfil', icon: User, path: '/profile' },
];

export const TabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
      <div className="grid grid-cols-5 px-2 py-2 pb-safe-bottom">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const IconComponent = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
                isActive 
                  ? 'text-primary' 
                  : 'text-secondary hover:text-foreground'
              }`}
            >
              <IconComponent 
                size={24} 
                strokeWidth={2}
                className="mb-1"
              />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
