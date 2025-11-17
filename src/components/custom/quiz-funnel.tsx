"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Brain, Heart, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react"

type Answer = "A" | "B" | "C" | null

interface QuizAnswers {
  q1: Answer
  q2: Answer
  q3: Answer
  q4: Answer
  q5: Answer
}

interface UserData {
  name: string
  email: string
  phone: string
}

export default function QuizFunnel() {
  const [step, setStep] = useState<"intro" | "quiz" | "result" | "form" | "thanks">("intro")
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState<QuizAnswers>({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
  })
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
  })

  const questions = [
    {
      id: 1,
      question: "Como você tem se sentido nos últimos meses?",
      options: [
        { value: "A", label: "Muito bem" },
        { value: "B", label: "Às vezes estressado(a), mas gerenciável" },
        { value: "C", label: "Frequentemente ansioso(a) ou triste" },
      ],
    },
    {
      id: 2,
      question: "Com que frequência você encontra tempo para cuidar de sua saúde mental?",
      options: [
        { value: "A", label: "Eu sempre me priorizo" },
        { value: "B", label: "Às vezes, quando consigo" },
        { value: "C", label: "Raramente consigo fazer isso" },
      ],
    },
    {
      id: 3,
      question: "Você já tentou técnicas de relaxamento ou autocuidado?",
      options: [
        { value: "A", label: "Sim, regularmente" },
        { value: "B", label: "Já tentei algumas vezes" },
        { value: "C", label: "Nunca" },
      ],
    },
    {
      id: 4,
      question: "O que mais te incomoda no dia a dia?",
      options: [
        { value: "A", label: "Nada em particular" },
        { value: "B", label: "Estresse relacionado ao trabalho ou estudos" },
        { value: "C", label: "Ansiedade ou preocupações constantes" },
      ],
    },
    {
      id: 5,
      question: "O que te motiva a melhorar sua saúde mental?",
      options: [
        { value: "A", label: "Sentir-me melhor comigo mesmo" },
        { value: "B", label: "Melhorar relacionamentos" },
        { value: "C", label: "Superar desafios diários" },
      ],
    },
  ]

  const handleAnswer = (questionKey: keyof QuizAnswers, value: Answer) => {
    setAnswers({ ...answers, [questionKey]: value })
  }

  const handleNext = () => {
    if (currentQuestion < 5) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setStep("result")
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateResult = () => {
    const answerValues = Object.values(answers)
    const aCount = answerValues.filter((a) => a === "A").length
    const bCount = answerValues.filter((a) => a === "B").length
    const cCount = answerValues.filter((a) => a === "C").length

    if (aCount >= 3) return "A"
    if (cCount >= 3) return "C"
    return "B"
  }

  const getResultContent = () => {
    const result = calculateResult()

    const results = {
      A: {
        title: "Você está indo bem!",
        description:
          "O MindCare pode te ajudar a aprimorar ainda mais suas práticas de autocuidado e manter seu bem-estar em alta.",
        icon: Sparkles,
        color: "from-emerald-400 to-teal-600",
      },
      B: {
        title: "Você está no caminho certo!",
        description:
          "O MindCare oferece ferramentas para reduzir o estresse e melhorar seu bem-estar de forma consistente.",
        icon: Heart,
        color: "from-blue-400 to-indigo-600",
      },
      C: {
        title: "Você precisa de suporte!",
        description:
          "O MindCare é ideal para te guiar em momentos difíceis e te dar as ferramentas necessárias para enfrentar desafios.",
        icon: Brain,
        color: "from-purple-400 to-pink-600",
      },
    }

    return results[result]
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("thanks")
  }

  const progress = (currentQuestion / 5) * 100

  if (step === "intro") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Como anda a sua saúde mental?
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              Responda a algumas perguntas rápidas para entender melhor suas necessidades e como o MindCare pode te
              ajudar a estar bem!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-purple-600 mb-2" />
                <p className="text-sm text-center font-medium">5 perguntas rápidas</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <Heart className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-sm text-center font-medium">Resultado personalizado</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
                <Sparkles className="w-8 h-8 text-pink-600 mb-2" />
                <p className="text-sm text-center font-medium">Plano de autocuidado</p>
              </div>
            </div>
            <Button
              onClick={() => setStep("quiz")}
              className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Começar Quiz
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "quiz") {
    const currentQ = questions[currentQuestion - 1]
    const currentAnswerKey = `q${currentQuestion}` as keyof QuizAnswers
    const currentAnswer = answers[currentAnswerKey]

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Pergunta {currentQuestion} de 5</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {currentQ.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentAnswerKey, option.value as Answer)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                    currentAnswer === option.value
                      ? "border-purple-600 bg-purple-50 dark:bg-purple-900/30 shadow-md"
                      : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        currentAnswer === option.value
                          ? "border-purple-600 bg-purple-600"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {currentAnswer === option.value && <div className="w-3 h-3 bg-white rounded-full" />}
                    </div>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              {currentQuestion > 1 && (
                <Button onClick={handlePrevious} variant="outline" className="flex-1 h-12">
                  Voltar
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!currentAnswer}
                className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion === 5 ? "Ver Resultado" : "Próxima"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "result") {
    const result = getResultContent()
    const Icon = result.icon

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className={`mx-auto w-24 h-24 bg-gradient-to-br ${result.color} rounded-full flex items-center justify-center shadow-xl`}>
              <Icon className="w-12 h-12 text-white" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
              {result.title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              {result.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
              <h3 className="font-bold text-xl mb-3 text-gray-800 dark:text-gray-100">
                O MindCare oferece:
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Ferramentas de meditação e relaxamento guiadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Diário emocional para acompanhar seu progresso</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Exercícios práticos de autocuidado personalizados</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Conteúdos educativos sobre saúde mental</span>
                </li>
              </ul>
            </div>

            <Button
              onClick={() => setStep("form")}
              className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Receber Meu Plano de Autocuidado
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "form") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Receba seu plano personalizado
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              Preencha seus dados para receber dicas exclusivas e começar sua jornada de autocuidado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                  Nome completo *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  required
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                  E-mail *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">
                  Telefone (opcional)
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  className="h-12"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Receber Meu Plano Gratuito
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                Ao continuar, você concorda em receber comunicações do MindCare
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "thanks") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center shadow-xl animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
              Parabéns, {userData.name.split(" ")[0]}!
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              Você completou o quiz com sucesso! 🎉
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Enviamos para <strong>{userData.email}</strong> seu plano personalizado de autocuidado e dicas
                valiosas sobre saúde mental.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Fique atento à sua caixa de entrada e também à pasta de spam/promoções!
              </p>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open("https://mindcare.app", "_blank")}
              >
                Baixar MindCare Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                className="w-full h-12"
                onClick={() => {
                  setStep("intro")
                  setCurrentQuestion(1)
                  setAnswers({ q1: null, q2: null, q3: null, q4: null, q5: null })
                  setUserData({ name: "", email: "", phone: "" })
                }}
              >
                Fazer Quiz Novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
