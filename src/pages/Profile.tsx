import { Bell, Settings, HelpCircle, LogOut, User } from 'lucide-react'
import { Header } from '../components/Layout/Header'
import { TabBar } from '../components/Layout/TabBar'

export const Profile = () => {
  const userName = localStorage.getItem('onboarding_name') || 'Usuário'
  const userAge = localStorage.getItem('onboarding_age') || '25'

  const menuItems = [
    {
      icon: User,
      label: 'Editar Perfil',
      action: () => console.log('Editar perfil')
    },
    {
      icon: Bell,
      label: 'Notificações',
      action: () => console.log('Notificações')
    },
    {
      icon: Settings,
      label: 'Configurações',
      action: () => console.log('Configurações')
    },
    {
      icon: HelpCircle,
      label: 'Ajuda e Suporte',
      action: () => console.log('Ajuda')
    },
    {
      icon: LogOut,
      label: 'Sair',
      action: () => console.log('Logout'),
      danger: true
    }
  ]

  return (
    <div className="min-h-screen bg-background pb-20 pt-3">
      <Header title="Perfil" />

      <div className="px-4 py-6">
        {/* User Info */}
        <div className="glass-card rounded-xl p-6 text-center mb-6">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={32} className="text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            {userName}
          </h2>
          <p className="text-muted-foreground">{userAge} anos</p>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-lg font-bold text-primary">7</p>
              <p className="text-xs text-muted-foreground">Dias</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-primary">12</p>
              <p className="text-xs text-muted-foreground">Missões</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-primary">85%</p>
              <p className="text-xs text-muted-foreground">Taxa</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <button
                key={index}
                onClick={item.action}
                className={`w-full glass-card rounded-xl p-4 flex items-center hover:bg-white/10 transition-colors ${
                  item.danger ? 'text-red-400' : 'text-foreground'
                }`}
              >
                <IconComponent size={20} className="mr-4" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* App Info */}
        <div className="text-center mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">Menself v1.0.0</p>
          <p className="text-xs text-muted-foreground mt-1">
            Sua jornada de autoimagem começa aqui
          </p>
        </div>
      </div>

      <TabBar />
    </div>
  )
}
