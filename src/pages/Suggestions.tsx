import { useState } from 'react'
import { Filter } from 'lucide-react'
import { Header } from '../components/Layout/Header'
import { TabBar } from '../components/Layout/TabBar'
import { SuggestionCard } from '../components/custom/SuggestionCard'

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'estilo-aparencia', label: 'Estilo e Aparência' },
  { id: 'postura-corpo', label: 'Postura e Corpo' },
  { id: 'saude-energia', label: 'Saúde e Energia' },
  { id: 'cuidados-diarios', label: 'Cuidados Diários' },
  { id: 'identidade-expressao', label: 'Identidade e Expressão' },
  { id: 'autoestima-motivacao', label: 'Autoestima e Motivação' },
  { id: 'organizacao-consistencia', label: 'Organização e Consistência' }
]

const suggestions = [
  {
    id: '1',
    title: 'Paleta Outono Profundo',
    category: 'estilo-aparencia' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
    description: 'Tons terrosos e profundos que valorizam seu tom de pele'
  },
  {
    id: '2',
    title: 'Corte Fade Clássico',
    category: 'estilo-aparencia' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=300&h=200&fit=crop',
    description: 'Degradê suave nas laterais com volume controlado no topo'
  },
  {
    id: '3',
    title: 'Exercícios de Postura',
    category: 'postura-corpo' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=200&fit=crop',
    description: 'Rotina para fortalecer core e melhorar alinhamento corporal'
  },
  {
    id: '4',
    title: 'Look Casual Elegante',
    category: 'estilo-aparencia' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=300&h=200&fit=crop',
    description: 'Camisa social com calça chino - versatilidade garantida'
  },
  {
    id: '5',
    title: 'Rotina de Hidratação',
    category: 'cuidados-diarios' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop',
    description: 'Cuidados essenciais para manter a pele saudável'
  },
  {
    id: '6',
    title: 'Técnicas de Respiração',
    category: 'saude-energia' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop',
    description: 'Exercícios para aumentar energia e reduzir estresse'
  }
]

export const Suggestions = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [likedSuggestions, setLikedSuggestions] = useState<string[]>([])

  const filteredSuggestions =
    activeCategory === 'all'
      ? suggestions
      : suggestions.filter(s => s.category === activeCategory)

  const handleLike = (id: string) => {
    setLikedSuggestions(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )

    if (!likedSuggestions.includes(id)) {
      // Simular notificação
      console.log('Adicionamos ao seu moodboard!')
    }
  }

  const handleVisualize = (id: string) => {
    console.log('Visualizando sugestão:', id)
    // Aqui abriria modal com preview
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header
        title="Sugestões"
        rightAction={
          <button className="p-2 text-foreground hover:text-primary transition-colors">
            <Filter size={24} />
          </button>
        }
      />

      <div className="px-4 py-6">
        {/* Category Filter */}
        <div className="flex space-x-2 mb-6 overflow-x-auto hide-scrollbar">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Suggestions Grid */}
        <div className="space-y-6">
          <div className="space-y-4">
            {filteredSuggestions.map(suggestion => (
              <div key={suggestion.id} className="w-full">
                <SuggestionCard
                  id={suggestion.id}
                  title={suggestion.title}
                  category={suggestion.category}
                  imageUrl={suggestion.imageUrl}
                  description={suggestion.description}
                  liked={likedSuggestions.includes(suggestion.id)}
                  onLike={handleLike}
                  onVisualize={handleVisualize}
                />
              </div>
            ))}
          </div>
        </div>

        {filteredSuggestions.length === 0 && (
          <div className="glass-card rounded-xl p-8 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhuma sugestão encontrada
            </h3>
            <p className="text-muted-foreground">
              Tente selecionar outra categoria
            </p>
          </div>
        )}
      </div>

      <TabBar />
    </div>
  )
}
