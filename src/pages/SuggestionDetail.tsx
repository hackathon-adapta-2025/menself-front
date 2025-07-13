import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Heart, Eye } from 'lucide-react'
import { Header } from '../components/Layout/Header'

const suggestionDetails = {
  '1': {
    id: '1',
    title: 'Paleta Outono Profundo',
    category: 'estilo-aparencia' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
    description: 'Tons terrosos e profundos que valorizam seu tom de pele',
    fullDescription:
      'A paleta Outono Profundo é perfeita para quem possui subtom quente e intensidade alta. Essas cores complementam naturalmente seu tom de pele, criando harmonia e destacando seus traços.',
    colors: ['#8B4513', '#A0522D', '#CD853F', '#D2691E', '#B22222', '#800000'],
    tips: [
      'Use essas cores próximas ao rosto para realçar sua beleza natural',
      'Combine tons terrosos com acessórios em dourado',
      'Evite cores muito frias ou pastéis que podem te deixar apagado',
      'Experimente diferentes intensidades da mesma família de cor'
    ],
    occasions: ['Trabalho', 'Eventos sociais', 'Casual elegante']
  },
  '2': {
    id: '2',
    title: 'Corte Fade Clássico',
    category: 'estilo-aparencia' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=300&h=200&fit=crop',
    description: 'Degradê suave nas laterais com volume controlado no topo',
    fullDescription:
      'O corte fade clássico oferece versatilidade e elegância. Com laterais bem degradadas e volume controlado no topo, é ideal para quem busca um visual moderno e profissional.',
    tips: [
      'Mantenha o corte a cada 3-4 semanas',
      'Use pomada ou gel para estilizar o topo',
      'O fade deve ser gradual e bem executado',
      'Comunique claramente a altura desejada do fade'
    ],
    maintenance: 'Corte a cada 3-4 semanas',
    occasions: ['Profissional', 'Casual', 'Eventos formais']
  },
  '3': {
    id: '3',
    title: 'Exercícios de Postura',
    category: 'postura-corpo' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=200&fit=crop',
    description: 'Rotina para fortalecer core e melhorar alinhamento corporal',
    fullDescription:
      'Uma postura adequada não só melhora sua aparência, mas também sua saúde e confiança. Estes exercícios ajudam a fortalecer os músculos do core e melhorar o alinhamento corporal.',
    tips: [
      'Pratique 15-20 minutos diariamente',
      'Mantenha consistência para ver resultados',
      'Foque na qualidade dos movimentos, não na quantidade',
      'Respire profundamente durante os exercícios'
    ],
    maintenance: 'Praticar diariamente por 15-20 minutos',
    occasions: ['Casa', 'Academia', 'Escritório']
  },
  '4': {
    id: '4',
    title: 'Look Casual Elegante',
    category: 'estilo-aparencia' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=300&h=200&fit=crop',
    description: 'Camisa social com calça chino - versatilidade garantida',
    fullDescription:
      'O look casual elegante combina sofisticação com conforto. A camisa social com calça chino oferece versatilidade para diversas ocasiões, desde reuniões casuais até encontros sociais.',
    tips: [
      'Escolha camisas em cores neutras ou padronagens discretas',
      'Calças chino devem ter caimento perfeito',
      'Sapatos podem variar entre social e casual clean',
      'Adicione um cinto que combine com os sapatos'
    ],
    pieces: [
      'Camisa social',
      'Calça chino',
      'Sapato social casual',
      'Cinto de couro'
    ],
    occasions: ['Trabalho casual', 'Almoços', 'Eventos informais']
  },
  '5': {
    id: '5',
    title: 'Rotina de Hidratação',
    category: 'cuidados-diarios' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop',
    description: 'Cuidados essenciais para manter a pele saudável',
    fullDescription:
      'Uma rotina consistente de hidratação é fundamental para manter a pele saudável e com aparência jovem. Estes cuidados simples fazem toda diferença.',
    tips: [
      'Use produtos adequados para seu tipo de pele',
      'Aplique hidratante sempre após o banho',
      'Não esqueça do protetor solar diariamente',
      'Mantenha consistência na rotina'
    ],
    maintenance: 'Aplicar 2x ao dia - manhã e noite',
    occasions: ['Diário', 'Manhã', 'Noite']
  },
  '6': {
    id: '6',
    title: 'Técnicas de Respiração',
    category: 'saude-energia' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop',
    description: 'Exercícios para aumentar energia e reduzir estresse',
    fullDescription:
      'Técnicas de respiração são ferramentas poderosas para gerenciar estresse, aumentar energia e melhorar o foco. Práticas simples com resultados imediatos.',
    tips: [
      'Pratique em um ambiente calmo e silencioso',
      'Comece com 5-10 minutos diários',
      'Foque na respiração abdominal profunda',
      'Use como ferramenta antes de situações estressantes'
    ],
    maintenance: 'Praticar 10-15 minutos diariamente',
    occasions: ['Manhã', 'Antes de reuniões', 'Momentos de estresse']
  }
}

const categoryLabels = {
  'estilo-aparencia': 'Estilo e Aparência',
  'postura-corpo': 'Postura e Corpo',
  'saude-energia': 'Saúde e Energia',
  'cuidados-diarios': 'Cuidados Diários',
  'identidade-expressao': 'Identidade e Expressão',
  'autoestima-motivacao': 'Autoestima e Motivação',
  'organizacao-consistencia': 'Organização e Consistência'
}

export const SuggestionDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(false)

  const suggestion = id
    ? suggestionDetails[id as keyof typeof suggestionDetails]
    : null

  if (!suggestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Sugestão não encontrada</p>
      </div>
    )
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleVisualize = () => {
    console.log('Visualizando sugestão:', suggestion.id)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="" showBack={true} />

      <div className="px-4 py-6">
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="relative">
            {/* <img 
              src={suggestion.imageUrl} 
              alt={suggestion.title}
              className="w-full h-64 object-cover"
            /> */}
            <div className="absolute top-4 left-4">
              <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                {categoryLabels[suggestion.category]}
              </span>
            </div>
            <button
              onClick={handleLike}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
                isLiked
                  ? 'bg-primary/90 text-white'
                  : 'bg-black/30 text-white hover:bg-black/50'
              }`}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="p-6 mt-6">
            <h1 className="text-2xl font-bold text-foreground mb-3">
              {suggestion.title}
            </h1>
            <p className="text-muted-foreground mb-6">
              {suggestion.fullDescription}
            </p>

            {'colors' in suggestion && (
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Paleta de cores:
                </h3>
                <div className="flex space-x-2">
                  {suggestion.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-12 h-12 rounded-lg border border-white/20"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {'pieces' in suggestion && (
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Peças essenciais:
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {suggestion.pieces.map((piece, index) => (
                    <div key={index} className="glass-card rounded-lg p-3">
                      <p className="text-sm text-foreground">{piece}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {'maintenance' in suggestion && (
              <div className="mb-6">
                <div className="glass-card rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    Manutenção
                  </p>
                  <p className="font-medium text-foreground">
                    {suggestion.maintenance}
                  </p>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">
                Dicas importantes:
              </h3>
              <ul className="space-y-2">
                {suggestion.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">
                Ideal para:
              </h3>
              <div className="flex flex-wrap gap-2">
                {suggestion.occasions.map((occasion, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                  >
                    {occasion}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleVisualize}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <Eye size={20} className="mr-2" />
              Visualizar Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
