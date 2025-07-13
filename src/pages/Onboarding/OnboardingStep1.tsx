import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Header } from '../../components/Layout/Header'
import { Button } from '../../components/ui/button'
import { Calendar } from '../../components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export const OnboardingStep1 = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState<Date>()
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const navigate = useNavigate()

  const handleNext = () => {
    if (name && email && birthDate && height && weight) {
      localStorage.setItem('onboarding_name', name)
      localStorage.setItem('onboarding_email', email)
      localStorage.setItem('onboarding_birth_date', birthDate.toISOString())
      localStorage.setItem('onboarding_height', height)
      localStorage.setItem('onboarding_weight', weight)
      navigate('/onboarding/step2')
    }
  }

  return (
    <div className="min-h-screen bg-background  pt-3">
      <Header
        showLogo
        logoSrc="/lovable-uploads/68b3e0c8-9c1f-4db4-9eeb-6f8daba716d4.png"
      />

      <div className="px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Sua melhor versão começa aqui
          </h1>
          <p className="text-muted-foreground body-text">
            Vamos reunir o essencial para criar um plano que combina com seus
            objetivos e seu estilo.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Como você gostaria de ser chamado?
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Seu nome"
              className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Qual seu e-mail?
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Data de nascimento
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal px-4 py-3 h-auto bg-muted border-0 rounded-xl text-foreground hover:bg-muted/80',
                    !birthDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {birthDate ? (
                    format(birthDate, 'dd/MM/yyyy')
                  ) : (
                    <span>Selecione sua data de nascimento</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={birthDate}
                  onSelect={setBirthDate}
                  disabled={date =>
                    date > new Date() || date < new Date('1900-01-01')
                  }
                  initialFocus
                  captionLayout="dropdown-buttons"
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                  className={cn('p-3 pointer-events-auto')}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Altura (cm)
              </label>
              <input
                type="number"
                value={height}
                onChange={e => setHeight(e.target.value)}
                placeholder="Ex: 175"
                className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Peso (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                placeholder="Ex: 75"
                className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={!name || !email || !birthDate || !height || !weight}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-secondary disabled:text-muted-foreground text-white py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center"
        >
          Continuar
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>

      <div className="px-4 pb-8">
        <div className="w-full bg-secondary/30 rounded-full h-2">
          <div className="bg-primary h-2 rounded-full w-1/6 transition-all duration-300" />
        </div>
      </div>
    </div>
  )
}
