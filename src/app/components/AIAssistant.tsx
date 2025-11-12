"use client"

import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, AlertCircle, Zap, MessageCircle, Leaf, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIAssistantProps {
  userPlan: 'free' | 'monthly' | 'annual'
  initialCredits?: number
}

export default function AIAssistant({ userPlan, initialCredits = 500 }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '🌱 Olá! Sou seu assistente especializado em cuidados com plantas. Posso te ajudar com dúvidas sobre rega, iluminação, nutrientes, pragas e muito mais! Como posso ajudar suas plantas hoje?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [credits, setCredits] = useState(initialCredits)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Verificar se usuário tem plano mensal ou anual
    if (userPlan === 'free') {
      alert('⚠️ O Assistente IA está disponível apenas para assinantes dos planos Mensal ou Anual!')
      return
    }

    // Verificar créditos
    if (credits < 50) {
      alert('⚠️ Créditos insuficientes! Você precisa de 50 créditos para enviar uma mensagem. Seus créditos serão renovados no próximo mês.')
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Deduzir créditos
    setCredits(prev => prev - 50)

    // Simular resposta da IA (aqui você integraria com uma API real)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(input),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()

    // Respostas contextuais baseadas em palavras-chave
    if (lowerQuestion.includes('rega') || lowerQuestion.includes('água')) {
      return '💧 Sobre rega: A frequência ideal depende da espécie e do clima. Em geral:\n\n• Plantas tropicais: 2-3x por semana\n• Suculentas: 1x por semana\n• Hortaliças: diariamente em clima quente\n\nDica: Verifique se o solo está seco 2-3cm abaixo da superfície antes de regar. Evite encharcar!'
    }

    if (lowerQuestion.includes('luz') || lowerQuestion.includes('sol')) {
      return '☀️ Sobre iluminação: A luz é essencial para fotossíntese!\n\n• Pleno sol: 6-8h diretas (tomate, pimentão)\n• Meia-sombra: 4-6h (alface, manjericão)\n• Sombra: 2-4h indiretas (samambaias)\n\nObserve as folhas: amareladas = excesso de luz, alongadas = falta de luz.'
    }

    if (lowerQuestion.includes('adubo') || lowerQuestion.includes('nutriente') || lowerQuestion.includes('fertilizante')) {
      return '🌿 Sobre nutrientes: NPK é fundamental!\n\n• N (Nitrogênio): crescimento folhas\n• P (Fósforo): raízes e flores\n• K (Potássio): frutos e resistência\n\nGerminação: NPK 10-10-10\nCrescimento: NPK 20-10-10\nFloração: NPK 10-20-20\n\nAplique a cada 15-30 dias.'
    }

    if (lowerQuestion.includes('praga') || lowerQuestion.includes('doença') || lowerQuestion.includes('fungo')) {
      return '🐛 Sobre pragas e doenças:\n\n• Pulgões: spray de água com sabão neutro\n• Cochonilhas: álcool 70% com cotonete\n• Fungos: reduzir umidade, calda bordalesa\n• Lagartas: catação manual ou Bacillus thuringiensis\n\nPrevenção: boa ventilação, evitar molhar folhas, inspeção regular!'
    }

    if (lowerQuestion.includes('tomate')) {
      return '🍅 Tomate (Solanum lycopersicum):\n\n• Luz: 6-8h sol direto\n• Rega: diária, solo úmido mas não encharcado\n• Nutrientes: NPK 10-10-10 (crescimento), 5-10-10 (frutificação)\n• Espaçamento: 50-80cm entre plantas\n• Colheita: 60-90 dias após transplante\n\nDica: Faça tutoramento e remova brotos laterais!'
    }

    if (lowerQuestion.includes('manjericão') || lowerQuestion.includes('basil')) {
      return '🌿 Manjericão (Ocimum basilicum):\n\n• Luz: 4-6h sol direto\n• Rega: 2-3x por semana, solo levemente úmido\n• Nutrientes: NPK 10-10-10 a cada 15 dias\n• Colheita: 30-45 dias, sempre pela manhã\n• Poda: remova flores para estimular folhas\n\nDica: Plante perto de tomates - eles se ajudam!'
    }

    if (lowerQuestion.includes('alface')) {
      return '🥬 Alface (Lactuca sativa):\n\n• Luz: 4-6h sol (prefere clima ameno)\n• Rega: diária, solo sempre úmido\n• Nutrientes: NPK 20-10-10 a cada 10 dias\n• Colheita: 45-60 dias após semeadura\n• Temperatura ideal: 15-25°C\n\nDica: Proteja do sol forte no verão!'
    }

    if (lowerQuestion.includes('germinação') || lowerQuestion.includes('germinar') || lowerQuestion.includes('semente')) {
      return '🌱 Sobre germinação:\n\n1. Escolha substrato leve e úmido\n2. Profundidade: 2-3x o tamanho da semente\n3. Mantenha úmido (não encharcado)\n4. Temperatura: 20-25°C\n5. Luz indireta até brotar\n\nTempo médio:\n• Alface: 3-7 dias\n• Tomate: 5-10 dias\n• Manjericão: 7-14 dias\n\nPaciência é fundamental!'
    }

    // Resposta genérica
    return `🌿 Entendi sua dúvida sobre "${question}".\n\nComo especialista em plantas, posso te ajudar com:\n\n• Identificação de espécies\n• Cronograma de rega e fertilização\n• Problemas com pragas e doenças\n• Condições ideais de luz e temperatura\n• Dicas de cultivo para cada fase\n\nPode me fazer perguntas mais específicas sobre qualquer aspecto do cuidado com suas plantas!`
  }

  // Determinar mensagem de renovação baseada no plano
  const getRenewalMessage = () => {
    if (userPlan === 'monthly') {
      return '💡 Importante: Cada pergunta custa 50 créditos. Você recebeu 500 créditos no registro e eles são renovados mensalmente!'
    } else if (userPlan === 'annual') {
      return '💡 Importante: Cada pergunta custa 50 créditos. Como assinante anual, você recebe 5.000 créditos mensalmente!'
    }
    return ''
  }

  const badgeClassName = userPlan === 'annual' 
    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2.5 text-base font-black shadow-2xl'
    : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-5 py-2.5 text-base font-black shadow-2xl'

  const alertClassName = userPlan === 'annual'
    ? 'mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 border-3 border-purple-400 rounded-3xl shadow-xl'
    : 'mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-3 border-yellow-400 rounded-3xl shadow-xl'

  const alertIconColor = userPlan === 'annual' ? 'text-purple-600' : 'text-yellow-600'
  const alertTextColor = userPlan === 'annual' ? 'text-purple-800' : 'text-yellow-800'

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] max-w-5xl mx-auto">
      {/* Header com Créditos */}
      <Card className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-3 border-purple-300 shadow-2xl rounded-3xl">
        <CardHeader className="pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Assistente IA PlantSeeds
                </CardTitle>
                <p className="text-base text-gray-600 font-bold">Especialista em cuidados com plantas</p>
              </div>
            </div>
            
            <div className="flex items-center gap-5">
              {/* Badge do Plano */}
              <Badge className={badgeClassName}>
                <Crown className="w-5 h-5 mr-2" />
                {userPlan === 'monthly' ? 'Plano Mensal' : 'Plano Anual'}
              </Badge>
              
              {/* Contador de Créditos */}
              <div className="bg-white rounded-3xl px-8 py-4 border-3 border-purple-300 shadow-2xl">
                <div className="flex items-center gap-4">
                  <Zap className="w-7 h-7 text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-600 font-bold">Créditos disponíveis</p>
                    <p className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {credits}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Aviso sobre custo */}
      {userPlan !== 'free' && (
        <Alert className={alertClassName}>
          <AlertCircle className={`h-6 w-6 ${alertIconColor}`} />
          <AlertDescription className={`text-base font-black ${alertTextColor}`}>
            <strong>{getRenewalMessage()}</strong>
          </AlertDescription>
        </Alert>
      )}

      {/* Área de Mensagens */}
      <Card className="flex-1 mb-8 bg-white/95 backdrop-blur-sm border-3 border-green-300 shadow-2xl rounded-3xl overflow-hidden flex flex-col">
        <CardContent className="flex-1 overflow-y-auto p-8 space-y-8">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-3xl p-6 shadow-2xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                    : 'bg-gradient-to-r from-purple-50 to-pink-50 text-gray-800 border-3 border-purple-300'
                }`}
              >
                <div className="flex items-start gap-4 mb-3">
                  {message.role === 'assistant' && (
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Leaf className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-base font-black mb-2">
                      {message.role === 'user' ? 'Você' : 'Assistente IA'}
                    </p>
                    <p className="text-base leading-relaxed whitespace-pre-line font-medium">
                      {message.content}
                    </p>
                  </div>
                </div>
                <p className={`text-sm mt-3 ${message.role === 'user' ? 'text-green-100' : 'text-gray-500'} font-medium`}>
                  {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-6 border-3 border-purple-300 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <Leaf className="w-6 h-6 text-white animate-pulse" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </CardContent>
      </Card>

      {/* Input de Mensagem */}
      <Card className="bg-white/95 backdrop-blur-sm border-3 border-green-300 shadow-2xl rounded-3xl">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite sua pergunta sobre plantas... (50 créditos por mensagem)"
              className="flex-1 text-lg h-16 border-3 border-gray-300 focus:border-green-500 rounded-2xl font-bold"
              disabled={isLoading || userPlan === 'free'}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim() || userPlan === 'free' || credits < 50}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-10 h-16 rounded-2xl font-black text-lg shadow-2xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-6 h-6 mr-2" />
              Enviar
            </Button>
          </div>
          
          {userPlan === 'free' && (
            <p className="text-base text-red-600 font-black mt-4 text-center">
              ⚠️ Assine o Plano Mensal ou Anual para usar o Assistente IA!
            </p>
          )}
          
          {credits < 50 && userPlan !== 'free' && (
            <p className="text-base text-orange-600 font-black mt-4 text-center">
              ⚠️ Créditos insuficientes! Seus créditos serão renovados no próximo mês.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
