"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, AlertCircle, Heart, ExternalLink, Clock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function EmergencyHelp() {
  const emergencyContacts = [
    {
      name: "CVV - Centro de Valorização da Vida",
      number: "188",
      description: "Apoio emocional e prevenção do suicídio. Atendimento 24h, gratuito e sigiloso.",
      type: "phone",
      color: "from-red-500 to-pink-500",
      available: "24 horas"
    },
    {
      name: "SAMU",
      number: "192",
      description: "Emergências médicas e psiquiátricas. Atendimento 24h.",
      type: "phone",
      color: "from-red-600 to-orange-500",
      available: "24 horas"
    },
    {
      name: "Polícia Militar",
      number: "190",
      description: "Em situações de risco imediato à vida.",
      type: "phone",
      color: "from-blue-600 to-blue-700",
      available: "24 horas"
    },
    {
      name: "Disque 100",
      number: "100",
      description: "Denúncias de violações de direitos humanos.",
      type: "phone",
      color: "from-purple-600 to-indigo-600",
      available: "24 horas"
    }
  ]

  const professionalHelp = [
    {
      title: "Psicólogo",
      description: "Profissional especializado em saúde mental que oferece terapia e aconselhamento.",
      when: "Para questões emocionais, comportamentais e relacionais."
    },
    {
      title: "Psiquiatra",
      description: "Médico especializado em saúde mental que pode prescrever medicamentos.",
      when: "Para diagnóstico e tratamento de transtornos mentais."
    },
    {
      title: "CAPS - Centro de Atenção Psicossocial",
      description: "Serviço público gratuito de saúde mental.",
      when: "Atendimento gratuito pelo SUS para diversos transtornos mentais."
    }
  ]

  const warningSignals = [
    "Pensamentos recorrentes sobre morte ou suicídio",
    "Sentimento de desesperança ou falta de propósito",
    "Isolamento social extremo",
    "Mudanças drásticas de comportamento",
    "Abuso de substâncias",
    "Comportamento de risco ou imprudente",
    "Despedidas ou distribuição de pertences",
    "Piora significativa de sintomas de saúde mental"
  ]

  return (
    <div className="space-y-6">
      {/* Critical Alert */}
      <Alert className="border-red-500 bg-red-50 dark:bg-red-900/20">
        <AlertCircle className="h-5 w-5 text-red-600" />
        <AlertTitle className="text-red-800 dark:text-red-200 font-bold">
          Em caso de emergência imediata
        </AlertTitle>
        <AlertDescription className="text-red-700 dark:text-red-300">
          Se você ou alguém está em risco imediato de se machucar, ligue <strong>188 (CVV)</strong> ou <strong>192 (SAMU)</strong> agora. 
          Não espere - sua vida é importante e há pessoas prontas para ajudar.
        </AlertDescription>
      </Alert>

      {/* Emergency Contacts */}
      <Card className="border-none shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-red-500" />
            Contatos de Emergência
          </CardTitle>
          <CardDescription>
            Linhas diretas disponíveis 24 horas por dia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-red-400 dark:hover:border-red-500 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${contact.color} flex items-center justify-center mb-4`}>
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{contact.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {contact.number}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {contact.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {contact.available}
                </div>
                <Button
                  className={`w-full mt-4 bg-gradient-to-r ${contact.color} hover:opacity-90`}
                  onClick={() => window.open(`tel:${contact.number}`)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar Agora
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Warning Signals */}
      <Card className="border-none shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            Sinais de Alerta
          </CardTitle>
          <CardDescription>
            Quando procurar ajuda profissional imediatamente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
            <p className="text-sm text-orange-900 dark:text-orange-100 mb-4 font-medium">
              Procure ajuda profissional se você ou alguém próximo apresentar:
            </p>
            <ul className="space-y-2">
              {warningSignals.map((signal, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-orange-800 dark:text-orange-200">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Professional Help */}
      <Card className="border-none shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-purple-500" />
            Ajuda Profissional
          </CardTitle>
          <CardDescription>
            Tipos de profissionais que podem ajudar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {professionalHelp.map((help, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800"
              >
                <h3 className="font-bold text-lg mb-2 text-purple-900 dark:text-purple-100">
                  {help.title}
                </h3>
                <p className="text-sm text-purple-800 dark:text-purple-200 mb-2">
                  {help.description}
                </p>
                <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">
                  Quando procurar: {help.when}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Online Resources */}
      <Card className="border-none shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-500" />
            Recursos Online
          </CardTitle>
          <CardDescription>
            Plataformas de apoio e informação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() => window.open('https://www.cvv.org.br', '_blank')}
            >
              <span>Site do CVV - Chat Online</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() => window.open('https://www.setembroamarelo.com', '_blank')}
            >
              <span>Setembro Amarelo - Prevenção</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() => window.open('https://www.gov.br/saude/pt-br/assuntos/saude-mental', '_blank')}
            >
              <span>Ministério da Saúde - Saúde Mental</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Support Message */}
      <Card className="border-none shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <Heart className="w-12 h-12 mx-auto mb-4 text-purple-500" />
            <h3 className="font-bold text-lg mb-2">Você não está sozinho(a)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Buscar ajuda é um ato de coragem e autocuidado. Existem pessoas e profissionais 
              prontos para apoiar você. Sua vida tem valor e há esperança, mesmo nos momentos 
              mais difíceis.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
