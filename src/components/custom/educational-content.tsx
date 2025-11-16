"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, BookOpen, Lightbulb, Heart, Users, Sparkles } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EducationalContent() {
  const articles = [
    {
      id: "1",
      category: "Ansiedade",
      icon: Brain,
      color: "from-blue-400 to-cyan-500",
      title: "Entendendo a Ansiedade",
      summary: "A ansiedade é uma resposta natural do corpo ao estresse",
      content: `A ansiedade é uma emoção normal que todos experimentamos. Ela nos ajuda a ficar alertas e preparados para situações desafiadoras. No entanto, quando a ansiedade se torna excessiva ou persistente, pode interferir na vida diária.

Sintomas comuns:
• Preocupação excessiva
• Tensão muscular
• Dificuldade de concentração
• Problemas para dormir
• Irritabilidade

O que fazer:
• Pratique técnicas de respiração
• Mantenha uma rotina regular de sono
• Exercite-se regularmente
• Limite cafeína e álcool
• Busque apoio profissional quando necessário`
    },
    {
      id: "2",
      category: "Depressão",
      icon: Heart,
      color: "from-purple-400 to-pink-500",
      title: "Reconhecendo a Depressão",
      summary: "Sinais e sintomas da depressão e como buscar ajuda",
      content: `A depressão é mais do que apenas tristeza passageira. É uma condição médica séria que afeta como você se sente, pensa e age.

Sinais de alerta:
• Tristeza persistente
• Perda de interesse em atividades
• Mudanças no apetite ou peso
• Problemas de sono
• Fadiga ou falta de energia
• Sentimentos de inutilidade
• Dificuldade de concentração

Quando buscar ajuda:
Se você experimenta vários desses sintomas por mais de duas semanas, é importante procurar um profissional de saúde mental. A depressão é tratável e você não precisa enfrentá-la sozinho.`
    },
    {
      id: "3",
      category: "Autocuidado",
      icon: Sparkles,
      color: "from-green-400 to-emerald-500",
      title: "Práticas de Autocuidado",
      summary: "Pequenas ações diárias que fazem grande diferença",
      content: `O autocuidado não é egoísmo - é essencial para sua saúde mental e bem-estar.

Práticas diárias:
• Reserve 10 minutos para meditação
• Faça uma refeição nutritiva
• Durma 7-9 horas por noite
• Pratique gratidão
• Conecte-se com pessoas queridas
• Faça algo que você gosta
• Estabeleça limites saudáveis

Lembre-se: Pequenos passos consistentes levam a grandes mudanças. Comece com uma prática por vez.`
    },
    {
      id: "4",
      category: "Relacionamentos",
      icon: Users,
      color: "from-orange-400 to-red-500",
      title: "Relacionamentos Saudáveis",
      summary: "Como construir e manter conexões positivas",
      content: `Relacionamentos saudáveis são fundamentais para o bem-estar mental.

Características de relacionamentos saudáveis:
• Comunicação aberta e honesta
• Respeito mútuo
• Confiança
• Apoio emocional
• Limites claros
• Espaço para crescimento individual

Sinais de alerta:
• Controle excessivo
• Desrespeito constante
• Falta de comunicação
• Violência física ou emocional

Se você está em um relacionamento abusivo, procure ajuda profissional imediatamente.`
    }
  ]

  const tips = [
    {
      title: "Mindfulness no Dia a Dia",
      description: "Pratique estar presente no momento atual. Observe seus pensamentos sem julgamento.",
      icon: Brain
    },
    {
      title: "Exercício Físico",
      description: "30 minutos de atividade física liberam endorfinas e melhoram o humor.",
      icon: Heart
    },
    {
      title: "Sono de Qualidade",
      description: "Mantenha uma rotina regular de sono. Evite telas 1 hora antes de dormir.",
      icon: Sparkles
    },
    {
      title: "Conexões Sociais",
      description: "Mantenha contato com amigos e família. Relacionamentos são essenciais.",
      icon: Users
    }
  ]

  const faqs = [
    {
      question: "Quando devo procurar ajuda profissional?",
      answer: "Procure ajuda se seus sintomas persistirem por mais de duas semanas, interferirem nas atividades diárias, ou se você tiver pensamentos de autolesão. Não espere a situação piorar - buscar ajuda é um sinal de força, não fraqueza."
    },
    {
      question: "Terapia realmente funciona?",
      answer: "Sim! Estudos mostram que a terapia é eficaz para tratar diversos problemas de saúde mental. Diferentes abordagens funcionam para diferentes pessoas, então pode ser necessário experimentar até encontrar o que funciona melhor para você."
    },
    {
      question: "Como posso ajudar alguém com problemas de saúde mental?",
      answer: "Ouça sem julgar, mostre empatia, ofereça apoio prático, incentive a busca por ajuda profissional e cuide também da sua própria saúde mental. Às vezes, apenas estar presente já faz diferença."
    },
    {
      question: "Medicação é sempre necessária?",
      answer: "Não necessariamente. O tratamento depende da condição e gravidade. Algumas pessoas se beneficiam de terapia sozinha, outras de medicação, e muitas de uma combinação. Um profissional de saúde mental pode ajudar a determinar o melhor tratamento."
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-none shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-500" />
            Conteúdo Educativo
          </CardTitle>
          <CardDescription>
            Aprenda sobre saúde mental e bem-estar emocional
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/50 dark:bg-gray-800/50 p-1 rounded-xl">
          <TabsTrigger value="articles">Artigos</TabsTrigger>
          <TabsTrigger value="tips">Dicas</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        {/* Articles Tab */}
        <TabsContent value="articles" className="space-y-4">
          {articles.map((article) => {
            const Icon = article.icon
            return (
              <Card key={article.id} className="border-none shadow-xl overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${article.color}`} />
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${article.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                        {article.category}
                      </div>
                      <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                      <CardDescription>{article.summary}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                      {article.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        {/* Tips Tab */}
        <TabsContent value="tips" className="space-y-4">
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Dicas Práticas para o Bem-Estar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {tips.map((tip, index) => {
                  const Icon = tip.icon
                  return (
                    <div
                      key={index}
                      className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300"
                    >
                      <Icon className="w-8 h-8 text-indigo-500 mb-3" />
                      <h3 className="font-semibold mb-2">{tip.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {tip.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <Card className="border-none shadow-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
            <CardHeader>
              <CardTitle className="text-lg">Recursos Adicionais</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                  <span>Livros recomendados sobre saúde mental e autocuidado</span>
                </li>
                <li className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                  <span>Podcasts sobre bem-estar emocional</span>
                </li>
                <li className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                  <span>Aplicativos de meditação e mindfulness</span>
                </li>
                <li className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                  <span>Grupos de apoio online e presenciais</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-4">
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>
                Respostas para dúvidas comuns sobre saúde mental
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
