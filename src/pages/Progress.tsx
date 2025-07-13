
import { useState } from 'react';
import { Camera, Upload } from 'lucide-react';
import { Header } from '../components/Layout/Header';
import { TabBar } from '../components/Layout/TabBar';
import { ProgressChart } from '../components/UI/ProgressChart';

const progressData = [
  { day: 'Seg', value: 20, completed: true },
  { day: 'Ter', value: 40, completed: true },
  { day: 'Qua', value: 60, completed: true },
  { day: 'Qui', value: 45, completed: false },
  { day: 'Sex', value: 80, completed: true },
  { day: 'Sáb', value: 70, completed: false },
  { day: 'Dom', value: 90, completed: true },
];

const mockSelfies = [
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop&crop=face',
    date: '15 Jul 2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f82?w=200&h=300&fit=crop&crop=face',
    date: '12 Jul 2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=300&fit=crop&crop=face',
    date: '08 Jul 2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=200&h=300&fit=crop&crop=face',
    date: '05 Jul 2025'
  },
];

export const Progress = () => {
  const [activeTab, setActiveTab] = useState<'chart' | 'selfies'>('chart');

  const handleAddSelfie = () => {
    console.log('Adicionando nova selfie...');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Seu Progresso" />
      
      <div className="px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">7</p>
            <p className="text-xs text-muted-foreground">Dias ativos</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">85%</p>
            <p className="text-xs text-muted-foreground">Consistência</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">12</p>
            <p className="text-xs text-muted-foreground">Missões</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-muted rounded-xl p-1 mb-6">
          <button
            onClick={() => setActiveTab('chart')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'chart'
                ? 'bg-primary text-white'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Gráfico
          </button>
          <button
            onClick={() => setActiveTab('selfies')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'selfies'
                ? 'bg-primary text-white'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Selfies
          </button>
        </div>

        {/* Content */}
        {activeTab === 'chart' ? (
          <div className="glass-card rounded-xl p-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Consistência Semanal
            </h3>
            <ProgressChart data={progressData} />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Galeria de Evolução
              </h3>
              <button
                onClick={handleAddSelfie}
                className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg transition-colors"
              >
                <Camera size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {mockSelfies.map((selfie, index) => (
                <div key={index} className="glass-card rounded-xl overflow-hidden">
                  <img 
                    src={selfie.url} 
                    alt={`Selfie ${index + 1}`}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-3">
                    <p className="text-sm font-medium text-foreground">{selfie.date}</p>
                    <p className="text-xs text-muted-foreground">
                      Progresso #{index + 1}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Add New Selfie Card */}
              <button
                onClick={handleAddSelfie}
                className="glass-card rounded-xl h-60 flex flex-col items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Upload size={24} className="text-primary mb-2" />
                <span className="text-sm text-muted-foreground">
                  Nova selfie
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      <TabBar />
    </div>
  );
};
