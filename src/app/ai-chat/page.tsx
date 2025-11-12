"use client"

import { useState } from 'react'
import { MessageCircle, Send, Leaf, ArrowLeft, Sparkles, Coins, Crown, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

type PlanType = 'free' | 'monthly' | 'annual'

interface UserPlan {
  type: PlanType
  credits: number
  monthlyCredits: number
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: 'Olá! 👋 Sou sua assistente especializada em cuidados com plantas. Como posso ajudar você hoje?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Simulação de plano do usuário - em produção viria do backend/auth
  const [userPlan, setUserPlan] = useState<UserPlan>({
    type: 'monthly', // 'free' | 'monthly' | 'annual'
    credits: 500, // Créditos disponíveis
    monthlyCredits: 500 // Créditos mensais do plano (500 mensal, 5000 anual)
  })

  const COST_PER_MESSAGE = 50

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    // Verificar se usuário tem plano
    if (userPlan.type === 'free') {
      alert('⚠️ Você precisa de um plano ativo para usar o Chat IA. Assine o plano Mensal ou Anual!')
      return
    }

    // Verificar créditos
    if (userPlan.credits < COST_PER_MESSAGE) {
      alert('⚠️ Créditos insuficientes! Aguarde a renovação mensal ou faça upgrade para o plano Anual.')
      return
    }

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Deduzir créditos
    setUserPlan(prev => ({
      ...prev,
      credits: prev.credits - COST_PER_MESSAGE
    }))

    // Simular resposta da IA (em produção seria uma chamada real à API)
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: getAIResponse(inputMessage),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  // Simulação de respostas da IA
  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('rega') || input.includes('água')) {
      return '💧 Para regar adequadamente sua planta, observe o solo: ele deve estar levemente úmido, mas não encharcado. A maioria das plantas precisa de rega quando os primeiros 2-3cm do solo estão secos. Em geral, regue 2-3 vezes por semana no verão e 1-2 vezes no inverno. Qual tipo de planta você tem?'
    }
    
    if (input.includes('luz') || input.includes('sol')) {
      return '☀️ A quantidade de luz varia por espécie:\n\n• Plantas de sol pleno: 6-8h diretas\n• Meia-sombra: 4-6h indiretas\n• Sombra: 2-4h indiretas\n\nFolhas amareladas = excesso de luz\nFolhas escuras/alongadas = falta de luz\n\nQual planta você está cultivando?'
    }
    
    if (input.includes('adubo') || input.includes('nutriente') || input.includes('fertilizante')) {
      return '🌱 Nutrientes essenciais:\n\n• NPK 20-20-20: crescimento vegetativo\n• NPK 10-30-20: floração\n• NPK 5-10-15: frutificação\n\nAplique a cada 15-30 dias, sempre em solo úmido. Evite excesso para não queimar raízes. Prefere orgânico ou químico?'
    }
    
    if (input.includes('doente') || input.includes('praga') || input.includes('amarela')) {
      return '🔍 Vamos diagnosticar:\n\n• Folhas amarelas: excesso de água ou falta de nutrientes\n• Manchas marrons: fungos (reduza umidade)\n• Furos nas folhas: insetos (use óleo de neem)\n• Folhas murchas: falta de água ou raízes danificadas\n\nPode descrever melhor os sintomas?'
    }
    
    if (input.includes('tomate')) {
      return '🍅 Tomate precisa de:\n\n• Luz: 8-10h diretas\n• Rega: 2x ao dia (manhã e tarde)\n• NPK 10-10-10 + Cálcio\n• Tutor/estaca para suporte\n• Poda de brotos laterais\n\nEstá em qual fase? Germinação, crescimento ou floração?'
    }

    return `🌿 Entendi sua dúvida sobre "${userInput}". Para te ajudar melhor, preciso de mais detalhes:\n\n• Qual tipo de planta?\n• Está em vaso ou solo?\n• Ambiente interno ou externo?\n• Há quanto tempo você a tem?\n\nCom essas informações posso dar orientações mais precisas!`
  }

  const getPlanBadge = () => {
    if (userPlan.type === 'annual') {
      return (
        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-black">
          <Crown className="w-4 h-4 mr-1" />
          Plano Anual
        </Badge>
      )
    }
    if (userPlan.type === 'monthly') {
      return (
        <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black">
          <Crown className="w-4 h-4 mr-1" />
          Plano Mensal
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="font-black">
        Sem Plano
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-2xl border-b-2 border-green-300 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-5">
              <Link href="/">
                <Button variant="outline" size="sm" className="rounded-xl border-2 hover:border-green-500">
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur-lg opacity-60"></div>
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl">
                    <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Chat IA Especialista
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 font-bold">Assistente de cuidados com plantas</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              {getPlanBadge()}
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-1.5 rounded-xl border-2 border-yellow-300">
                <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                <span className="text-sm sm:text-base font-black text-yellow-700">
                  {userPlan.credits} créditos
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Info Banner */}
      <div className="container mx-auto px-4 py-4">
        <Alert className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-2xl">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <AlertDescription className="text-sm sm:text-base font-bold text-blue-900">
            💬 Cada mensagem custa <strong>50 créditos</strong> • 
            {userPlan.type === 'monthly' && ' Plano Mensal: 500 créditos/mês'}
            {userPlan.type === 'annual' && ' Plano Anual: 5.000 créditos/mês'}
            {userPlan.type === 'free' && ' Assine um plano para usar o Chat IA'}
          </AlertDescription>
        </Alert>
      </div>

      {/* Chat Container */}
      <main className="container mx-auto px-4 pb-32 sm:pb-36">
        <Card className="bg-white/95 backdrop-blur-sm border-3 border-green-300 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-3 border-green-300">
            <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl font-black">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
              Converse com a IA
            </CardTitle>
            <CardDescription className="text-sm sm:text-base font-bold">
              Tire dúvidas sobre rega, luz, nutrientes, pragas e muito mais!
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-6 space-y-4 min-h-[400px] max-h-[600px] overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 sm:p-5 shadow-lg ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      : 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-900 border-2 border-gray-200'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="w-5 h-5 text-green-600" />
                      <span className="text-xs font-black text-green-600">Assistente IA</span>
                    </div>
                  )}
                  <p className="text-sm sm:text-base font-medium whitespace-pre-line leading-relaxed">
                    {message.content}
                  </p>
                  <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-green-100' : 'text-gray-500'} font-bold`}>
                    {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl p-5 shadow-lg border-2 border-gray-200">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-600 animate-pulse" />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Input Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-2xl border-t-3 border-green-300 shadow-2xl z-50">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex gap-3 sm:gap-4 max-w-4xl mx-auto">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite sua dúvida sobre plantas..."
              className="flex-1 h-12 sm:h-14 text-sm sm:text-base border-3 border-green-300 focus:border-green-500 rounded-2xl font-bold"
              disabled={isLoading || userPlan.type === 'free' || userPlan.credits < COST_PER_MESSAGE}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading || userPlan.type === 'free' || userPlan.credits < COST_PER_MESSAGE}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed font-black px-6 sm:px-8 h-12 sm:h-14 rounded-2xl shadow-2xl"
            >
              <Send className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
          </div>
          
          {userPlan.credits < COST_PER_MESSAGE && userPlan.type !== 'free' && (
            <p className="text-center text-sm sm:text-base text-red-600 font-bold mt-3">
              ⚠️ Créditos insuficientes. Aguarde renovação mensal ou faça upgrade.
            </p>
          )}
          
          {userPlan.type === 'free' && (
            <p className="text-center text-sm sm:text-base text-orange-600 font-bold mt-3">
              ⚠️ Assine o Plano Mensal ou Anual para usar o Chat IA
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
