"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, Plus, Trash2, Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface JournalEntry {
  id: string
  title: string
  content: string
  date: string
  time: string
}

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null)

  const prompts = [
    "O que me deixou grato(a) hoje?",
    "Qual foi meu maior desafio hoje?",
    "Como estou me sentindo agora?",
    "O que aprendi sobre mim hoje?",
    "Que conquista pequena tive hoje?",
  ]

  const handleSaveEntry = () => {
    if (!newContent.trim()) return

    const now = new Date()
    const entry: JournalEntry = {
      id: Date.now().toString(),
      title: newTitle.trim() || "Sem título",
      content: newContent.trim(),
      date: now.toLocaleDateString('pt-BR'),
      time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }

    setEntries([entry, ...entries])
    setNewTitle("")
    setNewContent("")
    setIsDialogOpen(false)
  }

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id))
    setSelectedEntry(null)
  }

  const handleUsePrompt = (prompt: string) => {
    setNewContent(prompt + "\n\n")
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-none shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-pink-500" />
                Diário Pessoal
              </CardTitle>
              <CardDescription>
                Escreva seus pensamentos e sentimentos
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Entrada
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Nova Entrada no Diário</DialogTitle>
                  <DialogDescription>
                    Escreva livremente sobre seus pensamentos e sentimentos
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Título (opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Meu dia hoje..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Conteúdo
                    </label>
                    <Textarea
                      placeholder="Escreva aqui seus pensamentos..."
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      className="min-h-[300px] resize-none"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSaveEntry}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                      disabled={!newContent.trim()}
                    >
                      Salvar Entrada
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Writing Prompts */}
      <Card className="border-none shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg">Sugestões de Reflexão</CardTitle>
          <CardDescription>
            Use estas perguntas para começar a escrever
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {prompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleUsePrompt(prompt)}
                className="p-4 text-left rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-pink-400 dark:hover:border-pink-500 transition-all duration-300 hover:scale-105"
              >
                <p className="text-sm font-medium">{prompt}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Journal Entries */}
      {entries.length === 0 ? (
        <Card className="border-none shadow-xl">
          <CardContent className="py-12">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Nenhuma entrada ainda</p>
              <p className="text-sm">Comece seu diário clicando em "Nova Entrada"</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {entries.map((entry) => (
            <Card 
              key={entry.id}
              className="border-none shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
              onClick={() => setSelectedEntry(entry)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{entry.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {entry.date} às {entry.time}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteEntry(entry.id)
                    }}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {entry.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Entry Detail Dialog */}
      {selectedEntry && (
        <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedEntry.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                {selectedEntry.date} às {selectedEntry.time}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {selectedEntry.content}
              </p>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => handleDeleteEntry(selectedEntry.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir
              </Button>
              <Button onClick={() => setSelectedEntry(null)}>
                Fechar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
