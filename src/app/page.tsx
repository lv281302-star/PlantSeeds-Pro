"use client"

import { useState, useEffect } from 'react'
import { Camera, Search, Leaf, Bell, Crown, Calendar, Droplets, Sun, Sprout, CreditCard, Star, CheckCircle, Zap, TrendingUp, Sparkles, Award, Shield, ChevronRight, MessageCircle, Plus, Clock, AlertCircle, Beaker, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'

type PlantStage = 'germination' | 'growth' | 'flowering' | 'fruiting'

interface Plant {
  id: number
  name: string
  scientificName: string
  stage: PlantStage
  daysOld: number
  nextWater: string
  nextFertilizer: string
  health: number
  image: string
  lightHours: number
  wateringSchedule: string
  nutrients: string
}

interface Reminder {
  id: number
  plantId: number
  plantName: string
  type: 'water' | 'fertilizer' | 'light'
  time: string
  urgent: boolean
}

export default function PlantSeedsProApp() {
  const [activeTab, setActiveTab] = useState('welcome')
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null)
  const [showAddPlant, setShowAddPlant] = useState(false)
  const [showIdentify, setShowIdentify] = useState(false)
  const [identifyMethod, setIdentifyMethod] = useState<'photo' | 'name'>('photo')
  const [showVideo, setShowVideo] = useState(true)
  const [showPlansDialog, setShowPlansDialog] = useState(false)

  const [myPlants, setMyPlants] = useState<Plant[]>([
    {
      id: 1,
      name: 'Tomate Cereja',
      scientificName: 'Solanum lycopersicum var. cerasiforme',
      stage: 'flowering',
      daysOld: 45,
      nextWater: '2h',
      nextFertilizer: '3 dias',
      health: 95,
      image: 'https://images.unsplash.com/photo-1592841200221-21e1c4e65746?w=400&h=600&fit=crop',
      lightHours: 8,
      wateringSchedule: '2x ao dia (manhã e tarde)',
      nutrients: 'NPK 10-10-10 + Cálcio'
    },
    {
      id: 2,
      name: 'Manjericão',
      scientificName: 'Ocimum basilicum',
      stage: 'growth',
      daysOld: 28,
      nextWater: '6h',
      nextFertilizer: '1 semana',
      health: 88,
      image: 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=400&h=600&fit=crop',
      lightHours: 6,
      wateringSchedule: '1x ao dia (manhã)',
      nutrients: 'NPK 20-20-20'
    }
  ])

  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, plantId: 1, plantName: 'Tomate Cereja', type: 'water', time: '2 horas', urgent: true },
    { id: 2, plantId: 2, plantName: 'Manjericão', type: 'fertilizer', time: '1 dia', urgent: false },
    { id: 3, plantId: 1, plantName: 'Tomate Cereja', type: 'light', time: '4 horas', urgent: false }
  ])

  const stageInfo = {
    germination: {
      name: 'Germinação',
      icon: Sprout,
      color: 'from-yellow-400 to-amber-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      lightHours: '12-16h',
      watering: 'Manter solo úmido constantemente',
      nutrients: 'Não necessário (usar substrato rico)'
    },
    growth: {
      name: 'Crescimento',
      icon: Leaf,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      lightHours: '14-18h',
      watering: '1-2x ao dia conforme temperatura',
      nutrients: 'NPK 20-20-20 (rico em nitrogênio)'
    },
    flowering: {
      name: 'Floração',
      icon: Sun,
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      lightHours: '12-14h',
      watering: '2x ao dia (manhã e tarde)',
      nutrients: 'NPK 10-30-20 (rico em fósforo)'
    },
    fruiting: {
      name: 'Frutificação',
      icon: Droplets,
      color: 'from-red-400 to-pink-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      lightHours: '10-12h',
      watering: '2-3x ao dia conforme necessidade',
      nutrients: 'NPK 5-10-15 (rico em potássio)'
    }
  }

  // Auto-hide video after 5 seconds
  useEffect(() => {
    if (showVideo) {
      const timer = setTimeout(() => {
        setShowVideo(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showVideo])

  const handleStartFreeTrial = () => {
    setActiveTab('home')
    setShowPlansDialog(true)
  }

  const VideoIntro = () => (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950 flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setShowVideo(false)}
        className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-white/40"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 px-4 animate-fade-in">
        {/* Logo Animation */}
        <div className="relative inline-block animate-scale-in">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-3xl blur-3xl opacity-80 animate-pulse"></div>
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-400 rounded-3xl flex items-center justify-center mx-auto shadow-2xl animate-float">
            <Sprout className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-white animate-bounce-slow" />
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300 absolute -top-3 -right-3 animate-pulse" />
          </div>
        </div>

        {/* Title Animation */}
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black text-white tracking-tight text-center">
            <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-teal-300 bg-clip-text text-transparent drop-shadow-2xl animate-gradient">
              PlantSeeds Pro
            </span>
          </h1>
          
          {/* Slogan Animation */}
          <div className="flex items-center justify-center gap-3 flex-wrap px-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="h-1.5 w-16 bg-gradient-to-r from-transparent via-emerald-400 to-emerald-400 rounded-full animate-pulse"></div>
            <p className="text-2xl sm:text-3xl lg:text-5xl text-emerald-100 font-black tracking-wide text-center">
              Seu App Pro de Cultivo 🌱
            </p>
            <div className="h-1.5 w-16 bg-gradient-to-l from-transparent via-emerald-400 to-emerald-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto animate-slide-up" style={{ animationDelay: '0.9s' }}>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-progress shadow-lg"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
          animation-fill-mode: both;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-progress {
          animation: progress 5s ease-out;
        }
      `}</style>
    </div>
  )

  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto w-full space-y-8 sm:space-y-12">
          {/* Logo e Título */}
          <div className="text-center space-y-4 sm:space-y-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-400 rounded-3xl flex items-center justify-center mx-auto shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-500">
                <Sprout className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-300 absolute -top-2 -right-2 sm:-top-3 sm:-right-3 animate-pulse" />
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white tracking-tight text-center px-4">
                <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-teal-300 bg-clip-text text-transparent drop-shadow-2xl">
                  PlantSeeds Pro
                </span>
              </h1>
              <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap px-4">
                <div className="h-1 sm:h-1.5 w-12 sm:w-16 bg-gradient-to-r from-transparent via-emerald-400 to-emerald-400 rounded-full animate-pulse"></div>
                <p className="text-xl sm:text-2xl lg:text-4xl text-emerald-100 font-black tracking-wide text-center">
                  Cultive com Inteligência 🌱
                </p>
                <div className="h-1 sm:h-1.5 w-12 sm:w-16 bg-gradient-to-l from-transparent via-emerald-400 to-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6 px-4">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 animate-bounce flex-shrink-0" />
                <span className="text-sm sm:text-base lg:text-lg text-emerald-200 font-bold text-center">Premiado como Melhor App de Jardinagem 2024</span>
              </div>
            </div>
          </div>

          {/* Benefícios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
            {[
              { icon: Zap, title: 'IA Revolucionária', desc: 'Identifique qualquer planta em segundos', gradient: 'from-yellow-400 to-orange-500' },
              { icon: TrendingUp, title: '95% de Sucesso', desc: 'Aumente a sobrevivência das suas plantas', gradient: 'from-blue-400 to-cyan-500' },
              { icon: Star, title: 'Especialista 24/7', desc: 'Tenha um agrônomo virtual sempre ao seu lado', gradient: 'from-purple-400 to-pink-500' }
            ].map((item, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl sm:rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-500`}></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-white/30 hover:border-white/50 transition-all duration-500 transform hover:-translate-y-2 sm:hover:-translate-y-3 hover:shadow-2xl">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${item.gradient} rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 lg:mb-8 shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                    <item.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-2 sm:mb-3 lg:mb-4 text-center">{item.title}</h3>
                  <p className="text-sm sm:text-base lg:text-lg text-emerald-100 text-center leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Principal */}
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl sm:rounded-[2.5rem] blur-3xl opacity-40 group-hover:opacity-60 transition-all duration-500 animate-pulse"></div>
              
              <div className="relative bg-gradient-to-br from-white/25 to-white/15 backdrop-blur-2xl rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-12 border-2 sm:border-3 border-white/40 shadow-2xl">
                <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                  {/* Badge */}
                  <div className="flex items-center justify-center">
                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-base sm:text-lg lg:text-xl font-black shadow-2xl border-2 sm:border-3 border-white/40 animate-bounce">
                      🔥 OFERTA LIMITADA
                    </Badge>
                  </div>
                  
                  <div className="text-center space-y-3 sm:space-y-4 lg:space-y-5">
                    <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-tight">
                      Teste <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent animate-pulse">GRÁTIS</span> por 7 dias!
                    </h2>
                    <p className="text-lg sm:text-xl lg:text-3xl text-emerald-100 font-bold">
                      Junte-se a <strong className="text-white">50.000+ jardineiros</strong> apaixonados
                    </p>
                  </div>

                  {/* Benefícios Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                    {[
                      { icon: CheckCircle, text: 'Identificação ilimitada por IA', color: 'text-green-400' },
                      { icon: Bell, text: 'Lembretes inteligentes', color: 'text-blue-400' },
                      { icon: Sparkles, text: 'Guias personalizados', color: 'text-purple-400' },
                      { icon: Shield, text: 'Suporte especializado', color: 'text-yellow-400' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 sm:gap-4 bg-white/15 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 border-2 border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300">
                        <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 ${item.color} flex-shrink-0`} />
                        <span className="text-white font-bold text-sm sm:text-base lg:text-lg">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Botão CTA */}
                  <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                    <Button 
                      onClick={handleStartFreeTrial}
                      className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-black font-black text-lg sm:text-xl lg:text-2xl py-6 sm:py-8 lg:py-10 rounded-2xl sm:rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 sm:border-3 border-white/40 group"
                    >
                      <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mr-2 sm:mr-3 lg:mr-4 group-hover:rotate-12 transition-transform" />
                      COMEÇAR TESTE GRÁTIS
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ml-2 sm:ml-3 lg:ml-4 group-hover:translate-x-2 transition-transform" />
                    </Button>
                    
                    <div className="flex items-center justify-center gap-2 sm:gap-3 text-emerald-200 flex-wrap">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0" />
                      <p className="text-xs sm:text-sm lg:text-base font-bold text-center">
                        💳 Apenas cartão de crédito • Cancele quando quiser • Sem taxas ocultas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Depoimentos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
            {[
              { name: 'Maria S.', text: 'Minhas plantas nunca estiveram tão saudáveis!', avatar: '👩‍🌾' },
              { name: 'João P.', text: 'A IA identifica tudo perfeitamente!', avatar: '👨‍🌾' },
              { name: 'Ana L.', text: 'Economizei muito tempo e dinheiro!', avatar: '👩‍🔬' }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/15 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-white/30 hover:bg-white/20 transition-all hover:scale-105 transform duration-300 shadow-xl">
                <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-emerald-100 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 lg:mb-5 leading-relaxed font-medium text-center">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <p className="text-emerald-300 font-bold text-sm sm:text-base lg:text-lg">{testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Show video intro first
  if (showVideo) {
    return <VideoIntro />
  }

  if (activeTab === 'welcome') {
    return <WelcomeScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-2xl border-b-2 border-green-300 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl sm:rounded-3xl blur-lg opacity-60"></div>
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-300">
                  <Sprout className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  PlantSeeds Pro
                </h1>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-bold hidden sm:block">Cultive com inteligência</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-5">
              {/* Chat IA Button - DESTAQUE MAIOR */}
              <Link href="/ai-chat" className="relative group">
                {/* Glow effect animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-2xl sm:rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                
                {/* Badge de destaque */}
                <Badge className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 text-[10px] sm:text-xs font-black shadow-2xl border-2 border-white z-10 animate-bounce">
                  ✨ NOVO
                </Badge>
                
                <Button className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 shadow-2xl transform hover:scale-110 transition-all duration-300 rounded-2xl sm:rounded-3xl font-black text-base sm:text-lg lg:text-xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 border-3 border-white/30">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 mr-2 animate-pulse" />
                  <span className="hidden sm:inline">Chat IA Especialista</span>
                  <span className="sm:hidden">Chat IA</span>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 ml-2 text-yellow-300 animate-spin-slow" />
                </Button>
              </Link>

              <Button variant="outline" size="sm" className="relative border-2 hover:border-green-500 transition-all rounded-xl sm:rounded-2xl shadow-lg p-2 sm:p-3">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-7 sm:h-7 p-0 flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs sm:text-sm font-black shadow-lg">
                  {reminders.length}
                </Badge>
              </Button>
              <Dialog open={showPlansDialog} onOpenChange={setShowPlansDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-2xl transform hover:scale-105 transition-all rounded-xl sm:rounded-2xl font-black text-sm sm:text-base lg:text-lg px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Pro</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-green-50 rounded-3xl border-3 border-green-300 max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-2xl sm:text-3xl font-black">
                      <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
                      Planos PlantSeeds Pro
                    </DialogTitle>
                    <DialogDescription className="text-base sm:text-lg font-medium">
                      Desbloqueie recursos avançados para cuidar melhor das suas plantas
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 sm:space-y-6">
                    {/* Plano Mensal */}
                    <Card className="border-3 border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2 rounded-3xl">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl sm:text-2xl font-black text-center">Plano Mensal</CardTitle>
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">R$ 37,90</span>
                          <span className="text-gray-600 font-bold text-base sm:text-lg">/mês</span>
                        </div>
                        <div className="flex justify-center">
                          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black text-sm">
                            500 créditos/mês
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3 sm:space-y-4">
                        {[
                          'Identificação ilimitada por IA',
                          'Chat IA: 500 créditos mensais',
                          'Lembretes personalizados',
                          'Análise de crescimento',
                          'Guias de cuidados detalhados'
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base font-bold">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <span className="break-words">{feature}</span>
                          </div>
                        ))}
                        <Button 
                          onClick={() => window.open('https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=316db666e39545fc97eb8bc71454cdde', '_blank')}
                          className="w-full mt-4 sm:mt-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-black py-5 sm:py-7 text-base sm:text-lg rounded-2xl shadow-2xl"
                        >
                          Começar Agora
                        </Button>
                      </CardContent>
                    </Card>
                    
                    {/* Plano Anual */}
                    <Card className="border-3 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 relative shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2 rounded-3xl">
                      <Badge className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 sm:px-6 py-1 sm:py-2 font-black text-sm sm:text-lg shadow-2xl">
                        ⭐ Mais Popular
                      </Badge>
                      <CardHeader className="pb-4 pt-8 sm:pt-10">
                        <CardTitle className="text-xl sm:text-2xl font-black text-center">Plano Anual</CardTitle>
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">R$ 349,90</span>
                          <span className="text-gray-600 font-bold text-base sm:text-lg">/ano</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <p className="text-base sm:text-lg text-green-600 font-black text-center">💰 Economize R$ 105,90</p>
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-sm">
                            5.000 créditos/mês
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3 sm:space-y-4">
                        {[
                          'Todos os recursos do mensal',
                          'Chat IA: 5.000 créditos mensais',
                          'Consultoria especializada',
                          'Relatórios avançados',
                          'Suporte prioritário 24/7'
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base font-bold">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <span className="break-words">{feature}</span>
                          </div>
                        ))}
                        <Button 
                          onClick={() => window.open('https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=78411e52239547dc87134b7f83ddf324', '_blank')}
                          className="w-full mt-4 sm:mt-5 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 font-black py-5 sm:py-7 text-base sm:text-lg rounded-2xl shadow-2xl"
                        >
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

      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-2xl border-b-2 border-green-200 shadow-xl sticky top-[72px] sm:top-[88px] z-40">
        <div className="container mx-auto px-2 sm:px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-transparent h-auto p-0">
              {[
                { value: 'home', icon: Leaf, label: 'Plantas' },
                { value: 'identify', icon: Camera, label: 'Identificar' },
                { value: 'care', icon: Calendar, label: 'Cuidados' },
                { value: 'reminders', icon: Bell, label: 'Lembretes' }
              ].map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className="flex flex-col gap-1 sm:gap-3 py-3 sm:py-5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-100 data-[state=active]:to-emerald-100 data-[state=active]:text-green-700 font-black transition-all hover:bg-green-50 text-xs sm:text-base"
                >
                  <tab.icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  <span className="text-xs sm:text-sm">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8 lg:py-10">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Minhas Plantas */}
          <TabsContent value="home" className="space-y-6 sm:space-y-8 lg:space-y-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Minhas Plantas</h2>
              <Button 
                onClick={() => setShowAddPlant(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-2xl transform hover:scale-105 transition-all rounded-xl sm:rounded-2xl font-black text-base sm:text-lg px-4 sm:px-6 py-3"
              >
                <Plus className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                Adicionar Planta
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {myPlants.map((plant) => {
                const stageData = stageInfo[plant.stage]
                return (
                  <Card key={plant.id} className="overflow-hidden hover:shadow-3xl transition-all bg-white/95 backdrop-blur-sm border-3 border-green-200 hover:border-green-400 transform hover:-translate-y-3 duration-300 rounded-3xl">
                    <div className="relative">
                      <img 
                        src={plant.image} 
                        alt={plant.name}
                        className="w-full h-48 sm:h-56 lg:h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <Badge className={`absolute top-4 right-4 bg-gradient-to-r ${stageData.color} text-white font-black shadow-2xl border-3 border-white/50 text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2`}>
                        {stageData.name}
                      </Badge>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 sm:p-4 shadow-xl">
                          <div className="flex items-center justify-between">
                            <span className="text-sm sm:text-base font-black text-gray-700">Saúde</span>
                            <span className="text-xl sm:text-2xl font-black text-green-600">{plant.health}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mt-2 sm:mt-3">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 sm:h-3 rounded-full transition-all duration-500 shadow-lg"
                              style={{ width: `${plant.health}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="text-xl sm:text-2xl font-black">{plant.name}</CardTitle>
                      <CardDescription className="text-sm sm:text-base italic font-bold truncate">
                        {plant.scientificName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 sm:space-y-5">
                      <div className="flex items-center justify-between text-sm sm:text-base bg-green-50 rounded-2xl p-3 sm:p-4 shadow-md">
                        <span className="text-gray-700 font-bold">Idade:</span>
                        <span className="font-black text-green-700 text-base sm:text-lg">{plant.daysOld} dias</span>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center gap-3 sm:gap-4 bg-blue-50 rounded-2xl p-3 sm:p-4 shadow-md">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                            <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm text-gray-600 font-bold">Próxima rega</p>
                            <p className="text-sm sm:text-base font-black text-blue-700 truncate">{plant.nextWater}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 bg-green-50 rounded-2xl p-3 sm:p-4 shadow-md">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                            <Beaker className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm text-gray-600 font-bold">Fertilizante</p>
                            <p className="text-sm sm:text-base font-black text-green-700 truncate">{plant.nextFertilizer}</p>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full border-3 border-green-300 hover:border-green-500 hover:bg-green-50 font-black rounded-2xl transition-all text-sm sm:text-base py-5 sm:py-6"
                        onClick={() => setSelectedPlant(plant)}
                      >
                        Ver Detalhes Completos
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Identificar */}
          <TabsContent value="identify" className="space-y-6 sm:space-y-8 lg:space-y-10">
            <div className="text-center space-y-3 sm:space-y-5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Identificar Planta</h2>
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl font-bold">
                Use nossa IA para identificar plantas por foto ou nome científico
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
              {/* Foto */}
              <Card className="bg-white/95 backdrop-blur-sm border-3 border-green-300 shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-3 border-green-300">
                  <CardTitle className="flex items-center justify-center gap-3 sm:gap-4 text-2xl sm:text-3xl font-black">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Camera className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    Identificação por Foto
                  </CardTitle>
                  <CardDescription className="text-base sm:text-lg font-bold text-center">
                    Tire uma foto ou envie uma imagem da planta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 sm:space-y-8 p-6 sm:p-8 lg:p-10">
                  <div className="border-4 border-dashed border-green-400 rounded-3xl p-12 sm:p-16 text-center hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer group">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-transform shadow-2xl">
                      <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <p className="text-gray-700 mb-3 sm:mb-4 text-lg sm:text-xl font-black">Clique para enviar ou arrastar imagem</p>
                    <p className="text-sm sm:text-base text-gray-500 font-bold">PNG, JPG até 10MB</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-black py-6 sm:py-8 text-lg sm:text-xl rounded-2xl shadow-2xl">
                    <Camera className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    Analisar Foto com IA
                  </Button>
                </CardContent>
              </Card>

              {/* Nome */}
              <Card className="bg-white/95 backdrop-blur-sm border-3 border-green-300 shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-3 border-green-300">
                  <CardTitle className="flex items-center justify-center gap-3 sm:gap-4 text-2xl sm:text-3xl font-black">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Search className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    Busca por Nome
                  </CardTitle>
                  <CardDescription className="text-base sm:text-lg font-bold text-center">
                    Digite o nome comum ou científico da planta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 sm:space-y-8 p-6 sm:p-8 lg:p-10">
                  <Input 
                    placeholder="Ex: Tomate, Solanum lycopersicum..."
                    className="text-base sm:text-lg h-14 sm:h-16 border-3 border-gray-300 focus:border-green-500 rounded-2xl font-bold"
                  />
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-black py-6 sm:py-8 text-lg sm:text-xl rounded-2xl shadow-2xl">
                    <Search className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    Buscar Planta
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Cuidados */}
          <TabsContent value="care" className="space-y-6 sm:space-y-8 lg:space-y-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent text-center">Guia de Cuidados por Ciclo</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {Object.entries(stageInfo).map(([key, stage]) => {
                const Icon = stage.icon
                return (
                  <Card key={key} className={`${stage.bgColor} border-3 border-gray-300 hover:shadow-3xl transition-all transform hover:-translate-y-3 duration-300 rounded-3xl overflow-hidden`}>
                    <CardHeader className="text-center pb-4 sm:pb-5">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${stage.color} rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-2xl`}>
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <CardTitle className={`text-xl sm:text-2xl font-black ${stage.textColor}`}>{stage.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                      <div className="flex items-start gap-3 sm:gap-4 bg-white/80 rounded-2xl p-3 sm:p-4 shadow-md">
                        <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-gray-800 mb-1">Luz</p>
                          <p className="font-bold text-gray-600 break-words">{stage.lightHours}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 sm:gap-4 bg-white/80 rounded-2xl p-3 sm:p-4 shadow-md">
                        <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-gray-800 mb-1">Rega</p>
                          <p className="font-bold text-gray-600 break-words">{stage.watering}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 sm:gap-4 bg-white/80 rounded-2xl p-3 sm:p-4 shadow-md">
                        <Beaker className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-gray-800 mb-1">Nutrientes</p>
                          <p className="font-bold text-gray-600 break-words">{stage.nutrients}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Lembretes */}
          <TabsContent value="reminders" className="space-y-6 sm:space-y-8 lg:space-y-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Lembretes</h2>
              <Button className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-2xl transform hover:scale-105 transition-all rounded-xl sm:rounded-2xl font-black text-base sm:text-lg px-4 sm:px-6 py-3">
                <Plus className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                Novo Lembrete
              </Button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {reminders.map((reminder) => {
                const icons = {
                  water: { icon: Droplets, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50' },
                  fertilizer: { icon: Beaker, color: 'from-green-500 to-emerald-500', bg: 'bg-green-50' },
                  light: { icon: Sun, color: 'from-yellow-500 to-orange-500', bg: 'bg-yellow-50' }
                }
                const iconData = icons[reminder.type]
                const Icon = iconData.icon
                
                return (
                  <Card key={reminder.id} className={`bg-white/95 backdrop-blur-sm border-3 ${reminder.urgent ? 'border-red-400 shadow-red-200' : 'border-green-300'} hover:shadow-2xl transition-all rounded-2xl sm:rounded-3xl`}>
                    <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 lg:p-8">
                      <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${iconData.color} rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl flex-shrink-0`}>
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-base sm:text-lg lg:text-xl text-gray-900 mb-1 break-words">
                            {reminder.type === 'water' ? 'Regar' : reminder.type === 'fertilizer' ? 'Fertilizar' : 'Ajustar Luz'} - {reminder.plantName}
                          </p>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                            <p className="text-sm sm:text-base text-gray-600 font-bold">Em {reminder.time}</p>
                          </div>
                          {reminder.urgent && (
                            <Badge className="mt-2 bg-red-500 text-white font-black text-xs sm:text-sm">
                              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              Urgente
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full sm:w-auto border-3 border-green-300 hover:border-green-500 hover:bg-green-50 font-black rounded-xl sm:rounded-2xl text-sm sm:text-base px-4 sm:px-6 py-4 sm:py-6"
                      >
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Concluir
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Dialog Detalhes da Planta */}
      <Dialog open={!!selectedPlant} onOpenChange={() => setSelectedPlant(null)}>
        <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-white to-green-50 rounded-3xl border-3 border-green-300 max-h-[90vh] overflow-y-auto">
          {selectedPlant && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl sm:text-3xl font-black text-center">{selectedPlant.name}</DialogTitle>
                <DialogDescription className="text-base sm:text-lg italic font-bold text-center">
                  {selectedPlant.scientificName}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 sm:space-y-6">
                <img 
                  src={selectedPlant.image} 
                  alt={selectedPlant.name}
                  className="w-full h-48 sm:h-64 object-cover rounded-2xl shadow-xl"
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl">
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
                        <h3 className="font-black text-base sm:text-lg">Luz Diária</h3>
                      </div>
                      <p className="text-2xl sm:text-3xl font-black text-green-700">{selectedPlant.lightHours}h</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-2xl">
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <Droplets className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                        <h3 className="font-black text-base sm:text-lg">Rega</h3>
                      </div>
                      <p className="text-base sm:text-lg font-black text-blue-700 break-words">{selectedPlant.wateringSchedule}</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <Beaker className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                      <h3 className="font-black text-base sm:text-lg">Nutrientes Recomendados</h3>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-green-700 break-words">{selectedPlant.nutrients}</p>
                  </CardContent>
                </Card>

                <div className="flex gap-3 sm:gap-4">
                  <Button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-black py-5 sm:py-6 text-base sm:text-lg rounded-2xl shadow-2xl">
                    <Bell className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    Criar Lembrete
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedPlant(null)}
                    className="flex-1 border-3 border-gray-300 hover:border-gray-500 font-black py-5 sm:py-6 text-base sm:text-lg rounded-2xl"
                  >
                    Fechar
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  )
}
