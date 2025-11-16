"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, BookOpen, Wind, Brain, Phone, AlertCircle, Smile, Meh, Frown, Calendar } from "lucide-react"
import MoodTracker from "@/components/custom/mood-tracker"
import BreathingExercise from "@/components/custom/breathing-exercise"
import Journal from "@/components/custom/journal"
import EducationalContent from "@/components/custom/educational-content"
import EmergencyHelp from "@/components/custom/emergency-help"

export default function Home() {
  const [activeTab, setActiveTab] = useState("mood")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  MindCare
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Seu bem-estar mental importa</p>
              </div>
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              className="bg-red-500 hover:bg-red-600"
              onClick={() => setActiveTab("emergency")}
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Emergência
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Card */}
          <Card className="mb-8 border-none shadow-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Olá! Como você está se sentindo hoje?</CardTitle>
              <CardDescription className="text-purple-100">
                Cuide da sua saúde mental com ferramentas práticas e apoio profissional quando necessário
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2 bg-white/50 dark:bg-gray-800/50 p-2 rounded-xl backdrop-blur-sm">
              <TabsTrigger value="mood" className="flex items-center gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                <Smile className="w-4 h-4" />
                <span className="hidden sm:inline">Humor</span>
              </TabsTrigger>
              <TabsTrigger value="breathing" className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                <Wind className="w-4 h-4" />
                <span className="hidden sm:inline">Respiração</span>
              </TabsTrigger>
              <TabsTrigger value="journal" className="flex items-center gap-2 data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Diário</span>
              </TabsTrigger>
              <TabsTrigger value="learn" className="flex items-center gap-2 data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
                <Brain className="w-4 h-4" />
                <span className="hidden sm:inline">Aprender</span>
              </TabsTrigger>
              <TabsTrigger value="emergency" className="flex items-center gap-2 data-[state=active]:bg-red-500 data-[state=active]:text-white">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Ajuda</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mood" className="space-y-6">
              <MoodTracker />
            </TabsContent>

            <TabsContent value="breathing" className="space-y-6">
              <BreathingExercise />
            </TabsContent>

            <TabsContent value="journal" className="space-y-6">
              <Journal />
            </TabsContent>

            <TabsContent value="learn" className="space-y-6">
              <EducationalContent />
            </TabsContent>

            <TabsContent value="emergency" className="space-y-6">
              <EmergencyHelp />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            MindCare não substitui atendimento profissional. Em caso de emergência, procure ajuda imediatamente.
          </p>
        </div>
      </footer>
    </div>
  )
}
