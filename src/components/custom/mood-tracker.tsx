"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smile, Meh, Frown, ThumbsUp, ThumbsDown, Heart, Calendar } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface MoodEntry {
  id: string
  mood: string
  emoji: string
  note: string
  date: string
  time: string
}

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string>("")
  const [note, setNote] = useState("")
  const [entries, setEntries] = useState<MoodEntry[]>([])
  const [showSuccess, setShowSuccess] = useState(false)

  const moods = [
    { value: "excelente", label: "Excelente", emoji: "😄", color: "from-green-400 to-emerald-500", icon: ThumbsUp },
    { value: "bom", label: "Bom", emoji: "🙂", color: "from-blue-400 to-cyan-500", icon: Smile },
    { value: "neutro", label: "Neutro", emoji: "😐", color: "from-yellow-400 to-orange-400", icon: Meh },
    { value: "ruim", label: "Ruim", emoji: "😟", color: "from-orange-400 to-red-400", icon: Frown },
    { value: "pessimo", label: "Péssimo", emoji: "😢", color: "from-red-500 to-pink-500", icon: ThumbsDown },
  ]

  const handleSaveMood = () => {
    if (!selectedMood) return

    const mood = moods.find(m => m.value === selectedMood)
    if (!mood) return

    const now = new Date()
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: mood.label,
      emoji: mood.emoji,
      note,
      date: now.toLocaleDateString('pt-BR'),
      time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }

    setEntries([newEntry, ...entries])
    setSelectedMood("")
    setNote("")
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Mood Selection */}
      <Card className="border-none shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-purple-500" />
            Como você está se sentindo agora?
          </CardTitle>
          <CardDescription>
            Registre seu humor diário para acompanhar seu bem-estar emocional
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mood Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {moods.map((mood) => {
              const Icon = mood.icon
              return (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`
                    p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105
                    ${selectedMood === mood.value 
                      ? `bg-gradient-to-br ${mood.color} border-transparent text-white shadow-lg` 
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                    }
                  `}
                >
                  <div className="text-4xl mb-2">{mood.emoji}</div>
                  <div className="text-sm font-medium">{mood.label}</div>
                </button>
              )
            })}
          </div>

          {/* Note Input */}
          {selectedMood && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
              <label className="text-sm font-medium">
                Quer adicionar uma nota? (opcional)
              </label>
              <Textarea
                placeholder="Como foi seu dia? O que você está sentindo?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <Button 
                onClick={handleSaveMood}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Salvar Registro
              </Button>
            </div>
          )}

          {/* Success Message */}
          {showSuccess && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-green-800 dark:text-green-200 text-sm font-medium text-center">
                ✓ Humor registrado com sucesso!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mood History */}
      {entries.length > 0 && (
        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              Histórico de Humor
            </CardTitle>
            <CardDescription>
              Seus últimos registros de humor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {entries.slice(0, 5).map((entry) => (
                <div 
                  key={entry.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{entry.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{entry.mood}</span>
                        <span className="text-xs text-gray-500">
                          {entry.date} às {entry.time}
                        </span>
                      </div>
                      {entry.note && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          {entry.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
