
import { useState } from 'react';
import { Plus, Target, Calendar } from 'lucide-react';
import { Header } from '../components/Layout/Header';
import { TabBar } from '../components/Layout/TabBar';
import { TaskCard } from '../components/custom/TaskCard';

const todayTasks = [
  {
    id: '1',
    title: 'Hidratação facial matinal',
    description: 'Aplique o hidratante com FPS 30 em movimentos circulares',
    category: 'skincare' as const,
    progress: 0,
  },
  {
    id: '2',
    title: '10 minutos de postura',
    description: 'Exercícios para fortalecer o core e melhorar a postura',
    category: 'posture' as const,
    progress: 45,
  },
  {
    id: '3',
    title: 'Escolha do outfit',
    description: 'Use uma das combinações sugeridas no seu moodboard',
    category: 'style' as const,
    progress: 0,
  },
];

export const Home = () => {
  const [tasks, setTasks] = useState(todayTasks);
  const userName = localStorage.getItem('onboarding_name') || 'Usuário';
  const completedTasks = tasks.filter(task => task.progress === 100).length;

  const handleCompleteTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, progress: 100 } : task
    ));
  };

  const handleSkipTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        title={`Olá, ${userName}`}
        showNotifications
      />
      
      <div className="px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="glass-card ai-interactive ai-shimmer rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Target size={20} className="text-primary transition-all duration-300" />
              <span className="text-xs text-muted-foreground transition-colors duration-300">Hoje</span>
            </div>
            <p className="text-2xl font-bold text-foreground transition-colors duration-300">{completedTasks}/{tasks.length}</p>
            <p className="text-sm text-muted-foreground transition-colors duration-300">Missões</p>
          </div>
          
          <div className="glass-card ai-interactive ai-shimmer rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Calendar size={20} className="text-primary transition-all duration-300" />
              <span className="text-xs text-muted-foreground transition-colors duration-300">Semana</span>
            </div>
            <p className="text-2xl font-bold text-foreground transition-colors duration-300">5</p>
            <p className="text-sm text-muted-foreground transition-colors duration-300">Dias ativos</p>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground transition-colors duration-300">Missões do Dia</h2>
          <button className="p-2 text-primary hover:text-primary/80 rounded-lg transition-all duration-300 ai-interactive hover:bg-primary/10">
            <Plus size={20} />
          </button>
        </div>

        {/* Tasks */}
        {tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                category={task.category}
                progress={task.progress}
                onComplete={() => handleCompleteTask(task.id)}
                onSkip={() => handleSkipTask(task.id)}
              />
            ))}
          </div>
        ) : (
          <div className="glass-card ai-interactive rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 ai-interactive">
              <Target size={24} className="text-primary animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2 transition-colors duration-300">
              Parabéns! 🎉
            </h3>
            <p className="text-muted-foreground transition-colors duration-300">
              Nenhuma missão hoje? Use esse tempo pra cuidar de você.
            </p>
          </div>
        )}
      </div>

      <TabBar />
    </div>
  );
};
