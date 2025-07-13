import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, X } from 'lucide-react';
import { Header } from '../components/Layout/Header';

const taskDetails = {
  '1': {
    id: '1',
    title: 'Hidratação facial matinal',
    description: 'Aplique o hidratante com FPS 30 em movimentos circulares',
    category: 'skincare' as const,
    fullDescription: 'A hidratação facial matinal é essencial para manter sua pele saudável e protegida durante todo o dia. Use um hidratante com FPS 30 ou superior, aplicando em movimentos circulares suaves, começando pelo centro do rosto e espalhando em direção às laterais.',
    tips: [
      'Lave o rosto com água morna antes de aplicar',
      'Use a quantidade equivalente a uma moeda de R$ 1',
      'Não esqueça do pescoço e orelhas',
      'Aguarde 5 minutos antes de aplicar maquiagem'
    ],
    duration: '5 minutos',
    frequency: 'Diariamente pela manhã'
  },
  '2': {
    id: '2',
    title: '10 minutos de postura',
    description: 'Exercícios para fortalecer o core e melhorar a postura',
    category: 'posture' as const,
    fullDescription: 'Série de exercícios focados em fortalecer os músculos do core e corrigir a postura. Estes exercícios ajudam a reduzir dores nas costas e melhorar sua presença física.',
    tips: [
      'Mantenha os ombros alinhados durante os exercícios',
      'Respire profundamente em cada movimento',
      'Pare se sentir dor intensa',
      'Use um tapete para maior conforto'
    ],
    duration: '10 minutos',
    frequency: '3x por semana'
  },
  '3': {
    id: '3',
    title: 'Escolha do outfit',
    description: 'Use uma das combinações sugeridas no seu moodboard',
    category: 'style' as const,
    fullDescription: 'Momento de escolher o look do dia baseado nas sugestões personalizadas do seu perfil. Considere o clima, ocasião e seu objetivo de estilo pessoal.',
    tips: [
      'Verifique a previsão do tempo',
      'Considere as atividades do dia',
      'Combine no máximo 3 cores',
      'Escolha uma peça de destaque por look'
    ],
    duration: '5-10 minutos',
    frequency: 'Diariamente'
  }
};

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

export const TaskDetail = () => {
  const data = JSON.parse(localStorage.getItem('onboarding_result') || '{}')

  const { id } = useParams<{ id: string }>();
  const task = id ?  data?.profile?.missions[0]?.dailyTasks[id as keyof typeof taskDetails] : null;

  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(task.progress);



  if (!task) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Tarefa não encontrada</p>
      </div>
    );
  }

  const handleComplete = () => {
    setIsCompleted(true);
    setTimeout(() => navigate('/'), 1500);

  
    let newTasks = data?.profile?.missions[0]?.dailyTasks?.map((task, index) =>
   index == id ? { ...task, progress: 100 } : { ...task, index: index});


    let newMissions = data?.profile?.missions?.map((data, index) => {
      if(index === 0) {
        return {
          ...data,
          dailyTasks: newTasks
        }
      }

      return data;
    })

    console.log({
      ...data,
      profile: {
        ...data.profile,
        missions: newMissions
      }
    })
    localStorage.setItem('onboarding_result', JSON.stringify({
      ...data,
      profile: {
        ...data.profile,
        missions: newMissions
      }
    }));

  };

  const handleSkip = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title=""
        showBack={true}
      />
      
      <div className="px-4 py-6">
        <div className="glass-card rounded-xl p-6">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${categoryColors[task.category]}`}>
            {categoryLabels[task.category]}
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-3">{task.title}</h1>
          <p className="text-muted-foreground mb-6">{task.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="glass-card rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Duração</p>
              <p className="font-medium text-foreground">{task.duration}</p>
            </div>
            <div className="glass-card rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Frequência</p>
              <p className="font-medium text-foreground">Diariamente</p>
            </div>
          </div>
          
          {isCompleted ? (
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Parabéns! 🎉
              </h3>
              <p className="text-muted-foreground">
                Tarefa concluída com sucesso!
              </p>
            </div>
          ) : (
            <div className="flex space-x-3">
              <button
                onClick={handleSkip}
                className="px-6 py-3 text-secondary hover:text-foreground transition-colors flex items-center justify-center"
              >
                <X size={16} className="mr-2" />
                Pular
              </button>
              <button
                onClick={handleComplete}
                className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <Check size={16} className="mr-2" />
                Concluir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
