"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wind, Play, Pause, RotateCcw } from "lucide-react"
import { Progress } from "@/components/ui/progress"

type ExerciseType = "box" | "478" | "calm"

interface Exercise {
  id: ExerciseType
  name: string
  description: string
  steps: string[]
  duration: number
  color: string
}

export default function BreathingExercise() {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseType | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [breathCount, setBreathCount] = useState(0)

  const exercises: Exercise[] = [
    {
      id: "box",
      name: "Respiração Quadrada",
      description: "Técnica simples e eficaz para reduzir ansiedade",
      steps: ["Inspire por 4s", "Segure por 4s", "Expire por 4s", "Segure por 4s"],
      duration: 4000,
      color: "from-blue-400 to-cyan-500"
    },
    {
      id: "478",
      name: "Respiração 4-7-8",
      description: "Ajuda a relaxar e dormir melhor",
      steps: ["Inspire por 4s", "Segure por 7s", "Expire por 8s"],
      duration: 4000,
      color: "from-purple-400 to-pink-500"
    },
    {
      id: "calm",
      name: "Respiração Calmante",
      description: "Para momentos de estresse agudo",
      steps: ["Inspire profundamente por 5s", "Expire lentamente por 7s"],
      duration: 5000,
      color: "from-green-400 to-emerald-500"
    }
  ]

  const currentExercise = exercises.find(e => e.id === selectedExercise)

  useEffect(() => {
    if (!isActive || !currentExercise) return

    const stepDuration = currentExercise.duration
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentStep(prevStep => {
            const nextStep = (prevStep + 1) % currentExercise.steps.length
            if (nextStep === 0) {
              setBreathCount(prev => prev + 1)
            }
            return nextStep
          })
          return 0
        }
        return prev + (100 / (stepDuration / 100))
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isActive, currentExercise, currentStep])

  const handleStart = () => {
    setIsActive(true)
  }

  const handlePause = () => {
    setIsActive(false)
  }

  const handleReset = () => {
    setIsActive(false)
    setCurrentStep(0)
    setProgress(0)
    setBreathCount(0)
  }

  const handleSelectExercise = (exerciseId: ExerciseType) => {
    setSelectedExercise(exerciseId)
    handleReset()
  }

  return (
    <div className="space-y-6">
      {/* Exercise Selection */}
      {!selectedExercise && (
        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-blue-500" />
              Escolha um Exercício de Respiração
            </CardTitle>
            <CardDescription>
              Pratique técnicas de respiração para reduzir ansiedade e estresse
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {exercises.map((exercise) => (
                <button
                  key={exercise.id}
                  onClick={() => handleSelectExercise(exercise.id)}
                  className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:scale-105 text-left group"
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${exercise.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Wind className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{exercise.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {exercise.description}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Exercise Player */}
      {selectedExercise && currentExercise && (
        <Card className="border-none shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-blue-500" />
                  {currentExercise.name}
                </CardTitle>
                <CardDescription>{currentExercise.description}</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedExercise(null)}
              >
                Trocar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Breathing Circle */}
            <div className="flex flex-col items-center justify-center py-8">
              <div 
                className={`
                  w-48 h-48 rounded-full bg-gradient-to-br ${currentExercise.color} 
                  flex items-center justify-center shadow-2xl
                  transition-all duration-1000 ease-in-out
                  ${isActive ? 'scale-110' : 'scale-100'}
                `}
              >
                <div className="text-center text-white">
                  <div className="text-6xl font-bold mb-2">
                    {Math.ceil((100 - progress) * (currentExercise.duration / 100000))}
                  </div>
                  <div className="text-sm font-medium">
                    {currentExercise.steps[currentStep]}
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full max-w-md mt-8">
                <Progress value={progress} className="h-2" />
              </div>

              {/* Breath Counter */}
              <div className="mt-6 text-center">
                <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                  {breathCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  ciclos completos
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              {!isActive ? (
                <Button
                  onClick={handleStart}
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Iniciar
                </Button>
              ) : (
                <Button
                  onClick={handlePause}
                  size="lg"
                  variant="outline"
                >
                  <Pause className="w-5 h-5 mr-2" />
                  Pausar
                </Button>
              )}
              <Button
                onClick={handleReset}
                size="lg"
                variant="outline"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reiniciar
              </Button>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium mb-2 text-blue-900 dark:text-blue-100">
                Como praticar:
              </h4>
              <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
                <li>Encontre uma posição confortável</li>
                <li>Siga as instruções na tela</li>
                <li>Respire pelo nariz e expire pela boca</li>
                <li>Pratique por 5-10 minutos diariamente</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
