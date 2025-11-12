"use client"

import { useState } from 'react'
import { Camera, Search, Leaf, Bell, Crown, Calendar, Droplets, Sun, Sprout, CreditCard, Star, CheckCircle, Zap, TrendingUp, Sparkles, Award, Shield, ChevronRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import AIAssistant from './components/AIAssistant'

export default function PlantSeedsProApp() {
  const [activeTab, setActiveTab] = useState('welcome')
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [showTrialForm, setShowTrialForm] = useState(false)
  const [userPlan, setUserPlan] = useState<'free' | 'monthly' | 'annual'>('monthly')
  const [userCredits, setUserCredits] = useState(500)

  const myPlants = [
    {
      id: 1,
      name: 'Tomate Cereja',
      scientificName: 'Solanum lycopersicum var. cerasiforme',
      stage: 'Floração',
      daysOld: 45,
      nextWater: '2h',
      nextFertilizer: '3 dias',
      health: 95,
      image: 'https://images.unsplash.com/photo-1592841200221-21e1c4e65746?w=400&h=600&fit=crop'
    },
    {
      id: 2,
      name: 'Manjericão',
      scientificName: 'Ocimum basilicum',
      stage: 'Crescimento',
      daysOld: 28,
      nextWater: '6h',
      nextFertilizer: '1 semana',
      health: 88,
      image: 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=400&h=600&fit=crop'
    },
    {
      id: 3,
      name: 'Alface',
      scientificName: 'Lactuca sativa',
      stage: 'Germinação',
      daysOld: 12,
      nextWater: '4h',
      nextFertilizer: '2 dias',
      health: 92,
      image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=600&fit=crop'
    }
  ]

  const plantStages = [
    { name: 'Germinação', icon: Sprout, color: 'from-yellow-400 to-amber-500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700' },
    { name: 'Crescimento', icon: Leaf, color: 'from-green-400 to-emerald-500', bgColor: 'bg-green-50', textColor: 'text-green-700' },
    { name: 'Floração', icon: Sun, color: 'from-orange-400 to-red-500', bgColor: 'bg-orange-50', textColor: 'text-orange-700' },
    { name: 'Frutificação', icon: Droplets, color: 'from-red-400 to-pink-500', bgColor: 'bg-red-50', textColor: 'text-red-700' }
  ]

  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-12">
        <div className="max-w-6xl mx-auto w-full space-y-12">
          {/* Logo e Título Principal com Animação */}
          <div className="text-center space-y-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>
              <div className="relative w-32 h-32 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-400 rounded-3xl flex items-center justify-center mx-auto shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-500">
                <Sprout className="w-16 h-16 text-white" />
                <Sparkles className="w-7 h-7 text-yellow-300 absolute -top-3 -right-3 animate-pulse" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-black text-white mb-2 tracking-tight animate-fade-in">
                <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-teal-300 bg-clip-text text-transparent drop-shadow-2xl">
                  PlantSeeds Pro
                </span>
              </h1>
              <div className="flex items-center justify-center gap-3">
                <div className="h-1.5 w-16 bg-gradient-to-r from-transparent via-emerald-400 to-emerald-400 rounded-full animate-pulse"></div>
                <p className="text-2xl md:text-4xl text-emerald-100 font-black tracking-wide">
                  Transforme Sementes em Sucesso 🌱
                </p>
                <div className="h-1.5 w-16 bg-gradient-to-l from-transparent via-emerald-400 to-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center justify-center gap-2 mt-6">
                <Award className="w-6 h-6 text-yellow-400 animate-bounce" />
                <span className="text-emerald-200 font-bold text-lg">Premiado como Melhor App de Jardinagem 2024</span>
              </div>
            </div>
          </div>

          {/* Valores e Benefícios com Cards Sofisticados */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border-2 border-white/30 hover:border-white/50 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Zap className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 text-center">IA Revolucionária</h3>
                <p className="text-emerald-100 text-center leading-relaxed text-lg">Identifique qualquer planta em segundos com nossa tecnologia de ponta</p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border-2 border-white/30 hover:border-white/50 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <TrendingUp className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 text-center">95% de Sucesso</h3>
                <p className="text-emerald-100 text-center leading-relaxed text-lg">Usuários aumentam em 95% a taxa de sobrevivência das plantas</p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border-2 border-white/30 hover:border-white/50 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Star className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 text-center">Especialista 24/7</h3>
                <p className="text-emerald-100 text-center leading-relaxed text-lg">Tenha um agrônomo virtual sempre ao seu lado</p>
              </div>
            </div>
          </div>

          {/* Call to Action Principal - Ultra Premium */}
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-[2.5rem] blur-3xl opacity-40 group-hover:opacity-60 transition-all duration-500 animate-pulse"></div>
              
              <div className="relative bg-gradient-to-br from-white/25 to-white/15 backdrop-blur-2xl rounded-[2.5rem] p-12 border-3 border-white/40 shadow-2xl">
                <div className="space-y-10">
                  {/* Badge Animado */}
                  <div className="flex items-center justify-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-lg animate-pulse"></div>
                      <Badge className="relative bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 text-xl font-black shadow-2xl border-3 border-white/40 animate-bounce">
                        🔥 OFERTA LIMITADA
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-center space-y-5">
                    <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
                      Teste <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent animate-pulse">GRÁTIS</span> por 7 dias!
                    </h2>
                    
                    <p className="text-3xl text-emerald-100 font-bold">
                      Junte-se a <strong className="text-white">50.000+ jardineiros</strong> apaixonados
                    </p>
                  </div>

                  {/* Grid de Benefícios */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { icon: CheckCircle, text: 'Identificação ilimitada por IA', color: 'text-green-400' },
                      { icon: Bell, text: 'Lembretes inteligentes', color: 'text-blue-400' },
                      { icon: Sparkles, text: 'Guias personalizados', color: 'text-purple-400' },
                      { icon: Shield, text: 'Suporte especializado', color: 'text-yellow-400' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4 bg-white/15 backdrop-blur-md rounded-2xl p-5 border-2 border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300">
                        <item.icon className={`w-7 h-7 ${item.color} flex-shrink-0`} />
                        <span className="text-white font-bold text-lg">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Botão CTA Premium */}
                  <div className="space-y-5">
                    <Button 
                      onClick={() => setShowTrialForm(true)}
                      className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-black font-black text-2xl py-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-3 border-white/40 group"
                    >
                      <CreditCard className="w-8 h-8 mr-4 group-hover:rotate-12 transition-transform" />
                      COMEÇAR TESTE GRÁTIS AGORA
                      <ChevronRight className="w-8 h-8 ml-4 group-hover:translate-x-2 transition-transform" />
                    </Button>
                    
                    <div className="flex items-center justify-center gap-3 text-emerald-200">
                      <Shield className="w-6 h-6" />
                      <p className="text-base font-bold">
                        💳 Apenas cartão de crédito • Cancele quando quiser • Sem taxas ocultas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Depoimentos Premium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {[
              { name: 'Maria S.', text: 'Minhas plantas nunca estiveram tão saudáveis!', avatar: '👩‍🌾' },
              { name: 'João P.', text: 'A IA identifica tudo perfeitamente!', avatar: '👨‍🌾' },
              { name: 'Ana L.', text: 'Economizei muito tempo e dinheiro!', avatar: '👩‍🔬' }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/30 hover:bg-white/20 transition-all hover:scale-105 transform duration-300 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-emerald-100 text-lg mb-5 leading-relaxed font-medium">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <p className="text-emerald-300 font-bold text-lg">{testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal do Formulário de Teste - Premium */}
      <Dialog open={showTrialForm} onOpenChange={setShowTrialForm}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-green-50 border-3 border-green-300 shadow-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-4xl font-black text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              🎉 Comece seu teste GRÁTIS!
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 text-lg font-bold">
              7 dias grátis • Cancele quando quiser
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-3xl border-3 border-green-300 shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Crown className="w-7 h-7 text-white" />
                </div>
                <span className="font-black text-green-800 text-2xl">PlantSeeds Pro</span>
              </div>
              <div className="text-5xl font-black text-green-800 mb-3">
                R$ 37,90<span className="text-xl font-normal text-gray-600">/mês</span>
              </div>
              <p className="text-base text-green-700 font-bold">Após o período de teste</p>
            </div>

            <div className="space-y-4">
              <Input 
                placeholder="Seu nome completo"
                className="text-lg h-14 border-3 border-gray-300 focus:border-green-500 rounded-2xl font-medium"
              />
              <Input 
                placeholder="Seu melhor e-mail"
                type="email"
                className="text-lg h-14 border-3 border-gray-300 focus:border-green-500 rounded-2xl font-medium"
              />
              <Input 
                placeholder="Número do cartão de crédito"
                className="text-lg h-14 border-3 border-gray-300 focus:border-green-500 rounded-2xl font-medium"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  placeholder="MM/AA"
                  className="text-lg h-14 border-3 border-gray-300 focus:border-green-500 rounded-2xl font-medium"
                />
                <Input 
                  placeholder="CVV"
                  className="text-lg h-14 border-3 border-gray-300 focus:border-green-500 rounded-2xl font-medium"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-3 border-yellow-400 rounded-3xl p-5 shadow-lg">
              <div className="flex items-start gap-4">
                <Shield className="w-7 h-7 text-yellow-600 flex-shrink-0 mt-1" />
                <p className="text-base text-yellow-800 font-bold leading-relaxed">
                  <strong>Garantia Total:</strong> Cancele nos primeiros 7 dias e não pague absolutamente nada!
                </p>
              </div>
            </div>

            <Button 
              onClick={() => {
                setShowTrialForm(false)
                setActiveTab('home')
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black py-8 text-xl rounded-2xl shadow-2xl transform hover:scale-105 transition-all"
            >
              🚀 ATIVAR TESTE GRÁTIS
            </Button>

            <p className="text-xs text-gray-500 text-center leading-relaxed">
              Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )

  if (activeTab === 'welcome') {
    return <WelcomeScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header Premium */}
      <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-b-3 border-green-300 dark:border-gray-700 sticky top-0 z-50 shadow-2xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl blur-lg opacity-60"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-300">
                  <Sprout className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  PlantSeeds Pro
                </h1>
                <p className="text-base text-gray-600 dark:text-gray-400 font-bold">Transforme sementes em sucesso</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <Button variant="outline" size="sm" className="relative border-3 hover:border-green-500 transition-all rounded-2xl shadow-lg">
                <Bell className="w-6 h-6" />
                <Badge className="absolute -top-2 -right-2 w-7 h-7 p-0 flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-black shadow-lg">
                  3
                </Badge>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-2xl transform hover:scale-105 transition-all rounded-2xl font-black text-lg px-6">
                    <Crown className="w-6 h-6 mr-2" />
                    Pro
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-green-50 rounded-3xl border-3 border-green-300">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-3xl font-black">
                      <Crown className="w-8 h-8 text-yellow-500" />
                      Planos PlantSeeds Pro
                    </DialogTitle>
                    <DialogDescription className="text-lg font-medium">
                      Desbloqueie recursos avançados para cuidar melhor das suas plantas
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <Card className="border-3 border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2 rounded-3xl">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-2xl font-black">Plano Mensal</CardTitle>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">R$ 37,90</span>
                          <span className="text-gray-600 font-bold text-lg">/mês</span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          'Identificação ilimitada por IA',
                          'Lembretes personalizados',
                          'Análise de crescimento',
                          '500 créditos mensais para Assistente IA'
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center gap-4 text-base font-bold">
                            <div className="w-7 h-7 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                            <span>{feature}</span>
                          </div>
                        ))}
                        <Button className="w-full mt-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-black py-7 text-lg rounded-2xl shadow-2xl">
                          Começar Agora
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-3 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 relative shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2 rounded-3xl">
                      <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 font-black text-lg shadow-2xl">
                        ⭐ Mais Popular
                      </Badge>
                      <CardHeader className="pb-4 pt-10">
                        <CardTitle className="text-2xl font-black">Plano Anual</CardTitle>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">R$ 349,90</span>
                          <span className="text-gray-600 font-bold text-lg">/ano</span>
                        </div>
                        <p className="text-lg text-green-600 font-black">💰 Economize R$ 105,90</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          'Todos os recursos do mensal',
                          'Consultoria especializada',
                          'Relatórios avançados',
                          '5.000 créditos mensais para Assistente IA'
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center gap-4 text-base font-bold">
                            <div className="w-7 h-7 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                            <span>{feature}</span>
                          </div>
                        ))}
                        <Button className="w-full mt-5 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 font-black py-7 text-lg rounded-2xl shadow-2xl">
                          Assinar Anual
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Premium */}
      <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border-b-3 border-green-200 dark:border-gray-700 shadow-xl">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-transparent h-auto p-0">
              {[
                { value: 'home', icon: Leaf, label: 'Minhas Plantas' },
                { value: 'identify', icon: Camera, label: 'Identificar' },
                { value: 'care', icon: Calendar, label: 'Cuidados' },
                { value: 'assistant', icon: MessageCircle, label: 'Assistente IA' },
                { value: 'reminders', icon: Bell, label: 'Lembretes' }
              ].map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className="flex flex-col gap-3 py-5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-100 data-[state=active]:to-emerald-100 data-[state=active]:text-green-700 font-black transition-all hover:bg-green-50 text-base"
                >
                  <tab.icon className="w-7 h-7" />
                  <span className="text-sm">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Minhas Plantas */}
          <TabsContent value="home" className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Minhas Plantas</h2>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-2xl transform hover:scale-105 transition-all rounded-2xl font-black text-lg px-6">
                <Sprout className="w-6 h-6 mr-2" />
                Adicionar Planta
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {myPlants.map((plant) => (
                <Card key={plant.id} className="overflow-hidden hover:shadow-3xl transition-all bg-white/95 backdrop-blur-sm border-3 border-green-200 hover:border-green-400 transform hover:-translate-y-3 duration-300 rounded-3xl">
                  <div className="relative">
                    <img 
                      src={plant.image} 
                      alt={plant.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black shadow-2xl border-3 border-white/50 text-base px-4 py-2">
                      {plant.stage}
                    </Badge>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                        <div className="flex items-center justify-between">
                          <span className="text-base font-black text-gray-700">Saúde da Planta</span>
                          <span className="text-2xl font-black text-green-600">{plant.health}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500 shadow-lg"
                            style={{ width: `${plant.health}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-black">{plant.name}</CardTitle>
                    <CardDescription className="text-base italic font-bold">
                      {plant.scientificName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="flex items-center justify-between text-base bg-green-50 rounded-2xl p-4 shadow-md">
                      <span className="text-gray-700 font-bold">Idade:</span>
                      <span className="font-black text-green-700 text-lg">{plant.daysOld} dias</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 bg-blue-50 rounded-2xl p-4 shadow-md">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                          <Droplets className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 font-bold">Próxima rega</p>
                          <p className="text-base font-black text-blue-700">{plant.nextWater}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 bg-green-50 rounded-2xl p-4 shadow-md">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                          <Sprout className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 font-bold">Fertilizante</p>
                          <p className="text-base font-black text-green-700">{plant.nextFertilizer}</p>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full border-3 border-green-300 hover:border-green-500 hover:bg-green-50 font-black rounded-2xl transition-all text-base py-6"
                      onClick={() => setSelectedPlant(plant)}
                    >
                      Ver Detalhes
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Identificar Planta */}
          <TabsContent value="identify" className="space-y-10">
            <div className="text-center space-y-5">
              <h2 className="text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Identificar Planta</h2>
              <p className="text-gray-600 dark:text-gray-400 text-xl font-bold">
                Use nossa IA para identificar plantas por foto ou nome científico
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-10">
              <Card className="bg-white/95 backdrop-blur-sm border-3 border-green-300 shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-3 border-green-300">
                  <CardTitle className="flex items-center gap-4 text-3xl font-black">
                    <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Camera className="w-7 h-7 text-white" />
                    </div>
                    Identificação por Foto
                  </CardTitle>
                  <CardDescription className="text-lg font-bold">
                    Tire uma foto da planta para identificação automática
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 p-10">
                  <div className="border-4 border-dashed border-green-400 rounded-3xl p-16 text-center hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer group">
                    <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-2xl">
                      <Camera className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-gray-700 mb-4 text-xl font-black">Clique para tirar foto ou arrastar imagem</p>
                    <p className="text-base text-gray-500 font-bold">PNG, JPG até 10MB</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-black py-8 text-xl rounded-2xl shadow-2xl">
                    Analisar Foto
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm border-3 border-green-300 shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-3 border-green-300">
                  <CardTitle className="flex items-center gap-4 text-3xl font-black">
                    <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Search className="w-7 h-7 text-white" />
                    </div>
                    Busca por Nome
                  </CardTitle>
                  <CardDescription className="text-lg font-bold">
                    Digite o nome comum ou científico da planta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 p-10">
                  <Input 
                    placeholder="Ex: Tomate, Solanum lycopersicum..."
                    className="text-lg h-16 border-3 border-gray-300 focus:border-green-500 rounded-2xl font-bold"
                  />
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-black py-8 text-xl rounded-2xl shadow-2xl">
                    Buscar Planta
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Cuidados */}
          <TabsContent value="care" className="space-y-10">
            <h2 className="text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Guia de Cuidados</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {plantStages.map((stage, index) => {
                const Icon = stage.icon
                return (
                  <Card key={index} className={`${stage.bgColor} border-3 border-gray-300 hover:shadow-3xl transition-all transform hover:-translate-y-3 duration-300 rounded-3xl overflow-hidden`}>
                    <CardHeader className="text-center pb-5">
                      <div className={`w-20 h-20 bg-gradient-to-r ${stage.color} rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-2xl`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <CardTitle className={`text-2xl font-black ${stage.textColor}`}>{stage.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-base">
                      <div className="flex items-center gap-4 bg-white/80 rounded-2xl p-4 shadow-md">
                        <Sun className="w-6 h-6 text-yellow-500" />
                        <span className="font-bold">6-8h luz diária</span>
                      </div>
                      <div className="flex items-center gap-4 bg-white/80 rounded-2xl p-4 shadow-md">
                        <Droplets className="w-6 h-6 text-blue-500" />
                        <span className="font-bold">Rega moderada</span>
                      </div>
                      <div className="flex items-center gap-4 bg-white/80 rounded-2xl p-4 shadow-md">
                        <Sprout className="w-6 h-6 text-green-500" />
                        <span className="font-bold">NPK balanceado</span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Assistente IA - NOVA ABA */}
          <TabsContent value="assistant" className="space-y-10">
            <AIAssistant userPlan={userPlan} initialCredits={userCredits} />
          </TabsContent>

          {/* Lembretes */}
          <TabsContent value="reminders" className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Lembretes</h2>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-2xl transform hover:scale-105 transition-all rounded-2xl font-black text-lg px-6">
                <Bell className="w-6 h-6 mr-2" />
                Novo Lembrete
              </Button>
            </div>

            <div className="space-y-6">
              {[
                { plant: 'Tomate Cereja', action: 'Regar', time: '2 horas', urgent: true, icon: Droplets, color: 'from-blue-500 to-cyan-500' },
                { plant: 'Manjericão', action: 'Fertilizar', time: '1 dia', urgent: false, icon: Sprout, color: 'from-green-500 to-emerald-500' },
                { plant: 'Alface', action: 'Regar', time: '4 horas', urgent: false, icon: Droplets, color: 'from-blue-500 to-cyan-500' },
              ].map((reminder, index) => {
                const Icon = reminder.icon
                return (
                  <Card key={index} className={`bg-white/95 backdrop-blur-sm border-3 ${reminder.urgent ? 'border-red-400 shadow-red-200' : 'border-green-300'} hover:shadow-2xl transition-all rounded-3xl`}>
                    <CardContent className="flex items-center justify-between p-8">
                      <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 bg-gradient-to-r ${reminder.color} rounded-3xl flex items-center justify-center shadow-2xl`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <p className="font-black text-xl text-gray-900">{reminder.action} - {reminder.plant}</p>
                          <p className="text-base text-gray-600 font-bold">Em {reminder.time}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-3 border-green-300 hover:border-green-500 hover:bg-green-50 font-black rounded-2xl text-base px-6 py-6"
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Concluído
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
