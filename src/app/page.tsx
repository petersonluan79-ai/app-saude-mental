"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Brain, Heart, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react"

type QuizStep = "intro" | "quiz" | "result" | "lead" | "thanks"

interface Answer {
  question: number
  answer: string
}

export default function QuizFunnel() {
  const [step, setStep] = useState<QuizStep>("intro")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })

  const questions = [
    {
      id: 1,
      question: "Como você tem se sentido nos últimos meses?",
      options: [
        { value: "A", label: "Muito bem", score: 1 },
        { value: "B", label: "Às vezes estressado(a), mas gerenciável", score: 2 },
        { value: "C", label: "Frequentemente ansioso(a) ou triste", score: 3 }
      ]
    },
    {
      id: 2,
      question: "Com que frequência você encontra tempo para cuidar de sua saúde mental?",
      options: [
        { value: "A", label: "Eu sempre me priorizo", score: 1 },
        { value: "B", label: "Às vezes, quando consigo", score: 2 },
        { value: "C", label: "Raramente consigo fazer isso", score: 3 }
      ]
    },
    {
      id: 3,
      question: "Você já tentou técnicas de relaxamento ou autocuidado?",
      options: [
        { value: "A", label: "Sim, regularmente", score: 1 },
        { value: "B", label: "Já tentei algumas vezes", score: 2 },
        { value: "C", label: "Nunca", score: 3 }
      ]
    },
    {
      id: 4,
      question: "O que mais te incomoda no dia a dia?",
      options: [
        { value: "A", label: "Nada em particular", score: 1 },
        { value: "B", label: "Estresse relacionado ao trabalho ou estudos", score: 2 },
        { value: "C", label: "Ansiedade ou preocupações constantes", score: 3 }
      ]
    },
    {
      id: 5,
      question: "O que te motiva a melhorar sua saúde mental?",
      options: [
        { value: "A", label: "Sentir-me melhor comigo mesmo", score: 1 },
        { value: "B", label: "Melhorar relacionamentos", score: 2 },
        { value: "C", label: "Superar desafios diários", score: 3 }
      ]
    }
  ]

  const calculateResult = () => {
    const totalScore = answers.reduce((sum, answer) => {
      const question = questions.find(q => q.id === answer.question)
      const option = question?.options.find(o => o.value === answer.answer)
      return sum + (option?.score || 0)
    }, 0)

    if (totalScore <= 7) return "A"
    if (totalScore <= 11) return "B"
    return "C"
  }

  const results = {
    A: {
      title: "Você está indo bem! 🌟",
      description: "O MindCare pode te ajudar a aprimorar ainda mais suas práticas de autocuidado.",
      color: "from-emerald-500 to-teal-500",
      benefits: [
        "Mantenha sua rotina de bem-estar",
        "Descubra novas técnicas de relaxamento",
        "Acompanhe seu progresso diário",
        "Conecte-se com uma comunidade positiva"
      ]
    },
    B: {
      title: "Você está no caminho certo! 💪",
      description: "O MindCare oferece ferramentas para reduzir o estresse e melhorar seu bem-estar.",
      color: "from-blue-500 to-cyan-500",
      benefits: [
        "Técnicas comprovadas de gestão de estresse",
        "Exercícios de respiração e meditação",
        "Diário de emoções personalizado",
        "Suporte profissional quando precisar"
      ]
    },
    C: {
      title: "Você precisa de suporte! 🤝",
      description: "O MindCare é ideal para te guiar em momentos difíceis e te dar as ferramentas necessárias para enfrentar desafios.",
      color: "from-purple-500 to-pink-500",
      benefits: [
        "Acesso a profissionais qualificados",
        "Plano personalizado de autocuidado",
        "Comunidade de apoio 24/7",
        "Ferramentas para gerenciar ansiedade"
      ]
    }
  }

  const handleNextQuestion = () => {
    if (!currentAnswer) return

    setAnswers([...answers, { question: questions[currentQuestion].id, answer: currentAnswer }])
    setCurrentAnswer("")

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setStep("result")
    }
  }

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("thanks")
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Intro Step */}
        {step === "intro" && (
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Como anda a sua saúde mental?
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                Responda a algumas perguntas rápidas para entender melhor suas necessidades e como o MindCare pode te ajudar a estar bem!
              </p>
            </div>

            <Card className="p-8 md:p-12 bg-white dark:bg-gray-800 border-0 shadow-2xl">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">5 Perguntas</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Rápido e simples</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Resultado Personalizado</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Feito para você</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">100% Gratuito</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Sem compromisso</p>
                </div>
              </div>

              <Button 
                size="lg"
                onClick={() => setStep("quiz")}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Começar o Quiz
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Card>
          </div>
        )}

        {/* Quiz Step */}
        {step === "quiz" && (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Pergunta {currentQuestion + 1} de {questions.length}
                </span>
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  {Math.round(progress)}% completo
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Card className="p-8 md:p-12 bg-white dark:bg-gray-800 border-0 shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {questions[currentQuestion].question}
              </h2>

              <RadioGroup value={currentAnswer} onValueChange={setCurrentAnswer}>
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        currentAnswer === option.value
                          ? "border-purple-600 bg-purple-50 dark:bg-purple-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                      }`}
                    >
                      <RadioGroupItem value={option.value} id={option.value} className="mr-4" />
                      <span className="text-lg text-gray-900 dark:text-white">{option.label}</span>
                    </label>
                  ))}
                </div>
              </RadioGroup>

              <Button
                size="lg"
                onClick={handleNextQuestion}
                disabled={!currentAnswer}
                className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion < questions.length - 1 ? "Próxima Pergunta" : "Ver Resultado"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Card>
          </div>
        )}

        {/* Result Step */}
        {step === "result" && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${results[calculateResult() as keyof typeof results].color} rounded-full mb-6`}>
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {results[calculateResult() as keyof typeof results].title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {results[calculateResult() as keyof typeof results].description}
              </p>
            </div>

            <Card className="p-8 md:p-12 bg-white dark:bg-gray-800 border-0 shadow-2xl mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Como o MindCare pode te ajudar:
              </h3>
              <div className="space-y-4 mb-8">
                {results[calculateResult() as keyof typeof results].benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-6 h-6 bg-gradient-to-br ${results[calculateResult() as keyof typeof results].color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-300">{benefit}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-8">
                <p className="text-center text-lg font-medium text-gray-900 dark:text-white">
                  🎁 Oferta Especial: <span className="text-purple-600 dark:text-purple-400">14 dias grátis</span> para você começar sua jornada!
                </p>
              </div>

              <Button
                size="lg"
                onClick={() => setStep("lead")}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Receber Meu Plano Personalizado
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Card>
          </div>
        )}

        {/* Lead Capture Step */}
        {step === "lead" && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Receba seu plano de autocuidado personalizado!
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Preencha os dados abaixo e comece sua jornada de transformação hoje mesmo.
              </p>
            </div>

            <Card className="p-8 md:p-12 bg-white dark:bg-gray-800 border-0 shadow-2xl">
              <form onSubmit={handleSubmitLead} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-lg font-medium text-gray-900 dark:text-white mb-2 block">
                    Nome completo *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Digite seu nome"
                    className="h-12 text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-lg font-medium text-gray-900 dark:text-white mb-2 block">
                    E-mail *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu@email.com"
                    className="h-12 text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-lg font-medium text-gray-900 dark:text-white mb-2 block">
                    Telefone (opcional)
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(00) 00000-0000"
                    className="h-12 text-lg"
                  />
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    🔒 Seus dados estão seguros. Não compartilhamos com terceiros.
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Receber Meu Plano de Autocuidado
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </Card>
          </div>
        )}

        {/* Thanks Step */}
        {step === "thanks" && (
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mb-6 animate-bounce">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Parabéns, {formData.name.split(' ')[0]}! 🎉
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
                Você completou o quiz com sucesso!
              </p>
            </div>

            <Card className="p-8 md:p-12 bg-white dark:bg-gray-800 border-0 shadow-2xl">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  O que acontece agora?
                </h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 dark:text-purple-400 font-bold">1</span>
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 pt-0.5">
                      Enviamos seu plano personalizado para <strong>{formData.email}</strong>
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 dark:text-purple-400 font-bold">2</span>
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 pt-0.5">
                      Você receberá dicas valiosas sobre saúde mental nos próximos dias
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 pt-0.5">
                      Fique atento a promoções exclusivas do MindCare
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white mb-8">
                <h4 className="text-2xl font-bold mb-3">🎁 Oferta Especial para Você!</h4>
                <p className="text-lg mb-4">
                  Baixe o MindCare agora e ganhe <strong>14 dias grátis</strong> de acesso premium!
                </p>
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Baixar MindCare Agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <p className="text-gray-600 dark:text-gray-400">
                Não recebeu o e-mail? Verifique sua caixa de spam ou{" "}
                <button className="text-purple-600 dark:text-purple-400 font-medium hover:underline">
                  clique aqui para reenviar
                </button>
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
