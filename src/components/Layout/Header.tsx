
import { ArrowLeft, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showNotifications?: boolean;
  rightAction?: React.ReactNode;
}

export const Header = ({ 
  title, 
  showBack = false, 
  showNotifications = false,
  rightAction 
}: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-4 py-3 pt-safe-top bg-background/95 backdrop-blur-lg border-b border-border sticky top-0 z-40">
      <div className="flex items-center">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="mr-3 p-2 -ml-2 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={24} strokeWidth={2} />
          </button>
        )}
        {title && (
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        {rightAction}
        {showNotifications && (
          <button className="p-2 text-foreground hover:text-primary transition-colors">
            <Bell size={24} strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
};
