import { useEffect, useMemo, useState } from 'react'
import { Plus, Target, Calendar } from 'lucide-react'
import { Header } from '../components/Layout/Header'
import { TabBar } from '../components/Layout/TabBar'
import { TaskCard } from '../components/custom/TaskCard'


export const Home = () => {
    const data = JSON.parse(localStorage.getItem('onboarding_result') || '{}')

    const daysTask = useMemo(() => {
    return data?.profile?.missions[0]?.dailyTasks.map((task, index) => {
      return ({
        id: index,
        title: task.title,
        description: task.description,
        category: 'skincare' as const,
        progress: task.progress ?? 0
      })
    });
  }, [data])


  const [tasks, setTasks] = useState(daysTask)
  const userName = localStorage.getItem('onboarding_name') || 'Usuário'
  const completedTasks = tasks.filter(task => task.progress === 100).length

  useEffect(() => {
    console.log(daysTask, "daysTask")
  }, [data]);


  const handleCompleteTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task => (task.id === taskId ? { ...task, progress: 100 } : task))
    )
  }

  const handleSkipTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header
        showLogo
        logoSrc="/lovable-uploads/68b3e0c8-9c1f-4db4-9eeb-6f8daba716d4.png"
        showNotifications
        rightAction={
          <span className="text-lg font-medium text-foreground mr-2">
            Olá, {data?.user?.name}
          </span>
        }
      />

      <div className="px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Target size={20} className="text-primary" />
              <span className="text-xs text-muted-foreground">Hoje</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {completedTasks}/{tasks.length}
            </p>
            <p className="text-sm text-muted-foreground">Missões</p>
          </div>

          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Calendar size={20} className="text-primary" />
              <span className="text-xs text-muted-foreground">Semana</span>
            </div>
            <p className="text-2xl font-bold text-foreground">5</p>
            <p className="text-sm text-muted-foreground">Dias ativos</p>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            Missões do Dia
          </h2>
          <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
            <Plus size={20} />
          </button>
        </div>

        {/* Tasks */}
        {tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <TaskCard
                key={index}
                id={index}
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
          <div className="glass-card rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Parabéns! 🎉
            </h3>
            <p className="text-muted-foreground">
              Nenhuma missão hoje? Use esse tempo pra cuidar de você.
            </p>
          </div>
        )}
      </div>

      <TabBar />
    </div>
  )
}
