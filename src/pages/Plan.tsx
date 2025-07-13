<<<<<<< HEAD

import { Calendar, CheckCircle, Lock, Eye } from 'lucide-react';
import { Header } from '../components/Layout/Header';
import { TabBar } from '../components/Layout/TabBar';
import { Progress } from '../components/ui/progress';
import { useMemo } from 'react';

=======
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Calendar, CheckCircle, Eye, Lock } from 'lucide-react'
import { Header } from '../components/Layout/Header'
import { TabBar } from '../components/Layout/TabBar'
import { Progress } from '../components/ui/progress'

const weeks = [
  {
    week: 1,
    title: 'Fundamentos',
    description: 'Estabelecendo rotinas básicas',
    completed: true,
    current: false
  },
  {
    week: 2,
    title: 'Cuidados Essenciais',
    description: 'Skincare e higiene pessoal',
    completed: false,
    current: true
  },
  {
    week: 3,
    title: 'Estilo Pessoal',
    description: 'Descobrindo seu visual',
    completed: false,
    current: false
  },
  {
    week: 4,
    title: 'Forma Física',
    description: 'Exercícios e postura',
    completed: false,
    current: false
  }
]
>>>>>>> eca9bd68733ac27ef8881af3a6ac92154d21bbd7

export const Plan = () => {
  const data = JSON.parse(localStorage.getItem('onboarding_result') || '{}')

  const handleVisualizeGoal = () => {
    console.log('Visualizando objetivo com preview gerado')
    // Aqui abriria modal com a imagem de preview
  }

  const data = JSON.parse(localStorage.getItem('onboarding_result') || '{}')

  const weeks = useMemo(() => {
    return data?.profile?.missions.map((week) => {
      return {
        ...week,
        completed: week.dailyTasks.filter((daily) => daily.progress === 100).length / week.dailyTasks.length * 100,
        current: false
      }
    })
  }, [data]);

  const weeksCompleted = useMemo(() => {
    return weeks.filter((week) => week.completed).length;

  }, [weeks]);

  const weeksPercent = useMemo(() => {

    return weeksCompleted / weeks.length * 100;
  }, [weeks]);

  const weekSelected = useMemo(() => {
    return weeks.find((week) => !week.completed)
  }, [weeks]);

  const daysPercent = useMemo(() => {
    const daysCompleted = weekSelected.dailyTasks.filter((day) => day.completed).length;

    return daysCompleted / weekSelected.dailyTasks.length * 100;
  }, [weekSelected]);

  return (
    <div className="min-h-screen bg-background pb-20 pt-3">
      <Header title="Plano de 12 Meses" />

      <div className="px-4 py-6">
        {/* Progress Overview */}
        <div className="glass-card rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
<<<<<<< HEAD
              <h2 className="text-xl font-semibold text-foreground">{weekSelected?.missionTitle}</h2>
=======
              <h2 className="text-xl font-semibold text-foreground">
                Semana 2
              </h2>
>>>>>>> eca9bd68733ac27ef8881af3a6ac92154d21bbd7
              <p className="text-muted-foreground">Cuidados Essenciais</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{daysPercent}%</p>
              <p className="text-sm text-muted-foreground">Concluído</p>
            </div>
          </div>

          <div className="mb-4">
            <Progress value={daysPercent} className="h-2" />
          </div>
        </div>

        {/* 12-Month Progress Bar */}
        <div className="glass-card rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Meu Plano</h3>

            <Popover>
              <PopoverTrigger asChild>
                <button className="border border-primary text-primary hover:bg-primary/10 py-1 px-3 rounded-lg text-sm font-medium transition-colors flex items-center">
                  <Eye size={14} className="mr-1" />
                  Visualizar
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <img
                      src={data.profile.imagePreview}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="mb-3">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Mês 1</span>
              <span>Mês 12</span>
            </div>
            <Progress value={weeksPercent} className="h-3" />
          </div>
          <p className="text-sm text-muted-foreground">
            {weeksCompleted} de {weeks.length} meses concluído
          </p>
        </div>

        {/* Weekly Timeline */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Calendar size={20} className="mr-2" />
            Cronograma Mensal
          </h3>

<<<<<<< HEAD
          {weeks?.map((week, index) => (
=======
          {weeks.map(week => (
>>>>>>> eca9bd68733ac27ef8881af3a6ac92154d21bbd7
            <div
              key={week.week}
              className={`glass-card rounded-xl p-4 transition-all ${week.current ? 'ring-2 ring-primary bg-primary/10' : ''
                }`}
            >
              <div className="flex items-center">
<<<<<<< HEAD
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${week.completed
                  ? 'bg-green-500 text-white'
                  : week.current
                    ? 'bg-primary text-white'
                    : 'bg-secondary/30 text-secondary'
                  }`}>
=======
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                    week.completed
                      ? 'bg-green-500 text-white'
                      : week.current
                      ? 'bg-primary text-white'
                      : 'bg-secondary/30 text-secondary'
                  }`}
                >
>>>>>>> eca9bd68733ac27ef8881af3a6ac92154d21bbd7
                  {week.completed ? (
                    <CheckCircle size={20} />
                  ) : week.current ? (
                    <span className="font-bold">{week.week}</span>
                  ) : (
                    <Lock size={16} />
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">
                    {week.missionTitle}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {week.missionDescription}
                  </p>
                </div>

                {week.current && (
                  <div className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                    Atual
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps */}
        <div className="glass-card rounded-xl p-6 mt-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Próximos Passos
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Complete suas missões diárias desta semana</li>
            <li>• Tire selfies para acompanhar o progresso</li>
            <li>• Explore as sugestões personalizadas</li>
            <li>• Mantenha a consistência por mais 5 dias</li>
          </ul>
        </div>
      </div>

      <TabBar />
    </div>
  )
}
