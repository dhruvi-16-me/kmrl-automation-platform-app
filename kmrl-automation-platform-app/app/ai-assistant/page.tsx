"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, User, Send, FileText, AlertTriangle, TrendingUp, Clock, ExternalLink } from "lucide-react"

interface Message {
  id: number
  type: "user" | "assistant"
  content: string
  timestamp: string
  sources?: Array<{
    title: string
    type: string
    relevance: string
  }>
  suggestions?: string[]
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content:
        "Hello! I'm your KMRL Document Intelligence Assistant. I can help you analyze documents, find information, and provide insights about your organizational data. What would you like to know?",
      timestamp: "10:30 AM",
      suggestions: [
        "Summarize this invoice",
        "What safety circulars were issued last week?",
        "Show me maintenance trends",
        "Find compliance documents",
      ],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const quickActions = [
    {
      title: "Document Analysis",
      description: "Upload and analyze any document",
      icon: FileText,
      action: "Analyze the latest safety manual",
    },
    {
      title: "Compliance Check",
      description: "Check regulatory compliance status",
      icon: AlertTriangle,
      action: "What compliance issues need attention?",
    },
    {
      title: "Trend Analysis",
      description: "Identify patterns in your data",
      icon: TrendingUp,
      action: "Show me document processing trends",
    },
    {
      title: "Recent Updates",
      description: "Get latest document summaries",
      icon: Clock,
      action: "What documents were processed today?",
    },
  ]

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    // Simulate AI response
    const aiResponse: Message = {
      id: messages.length + 2,
      type: "assistant",
      content: generateAIResponse(inputMessage),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sources: [
        { title: "Safety Manual v2.1", type: "Manual", relevance: "High" },
        { title: "MoHUA Compliance Circular", type: "Circular", relevance: "Medium" },
      ],
    }

    setMessages([...messages, userMessage, aiResponse])
    setInputMessage("")
  }

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("safety") || lowerInput.includes("circular")) {
      return "Based on my analysis of recent safety documents, I found 3 safety circulars issued last week:\n\n1. **Emergency Evacuation Procedures Update** - Updated protocols for passenger evacuation during emergencies\n2. **Track Maintenance Safety Guidelines** - New safety measures for maintenance crew working on tracks\n3. **Fire Safety Equipment Inspection** - Quarterly inspection requirements for fire safety systems\n\nAll circulars are compliant with MoHUA standards and have been distributed to relevant departments. Would you like me to provide detailed summaries of any specific circular?"
    }

    if (lowerInput.includes("invoice") || lowerInput.includes("payment")) {
      return "I've analyzed the recent invoice documents. Here's a summary:\n\n**Invoice INV-001** (TechCorp Solutions)\n- Amount: ₹2,45,000\n- Service: Electrical equipment maintenance\n- Status: Pending approval\n- Due Date: January 20\n- Compliance: All tax documents attached\n\nThe invoice appears to be legitimate and follows standard procurement procedures. It requires approval from the Finance Department head. Would you like me to route this for approval or provide more details?"
    }

    if (lowerInput.includes("trend") || lowerInput.includes("analysis")) {
      return "Here are the key trends I've identified from recent document processing:\n\n📈 **Processing Volume**: 15% increase compared to last month\n🎯 **Accuracy Rate**: Maintained at 98.7% average\n⚡ **Processing Speed**: 23% faster due to AI optimizations\n📋 **Document Types**: Safety documents increased by 30%\n\n**Key Insights:**\n- Engineering department shows highest document accuracy (99.1%)\n- Safety-related documents require more manual review\n- Invoice processing time reduced by 40%\n\nWould you like me to generate a detailed trend report or focus on a specific department?"
    }

    return "I understand you're looking for information about KMRL operations. I can help you with document analysis, compliance checks, trend identification, and finding specific information from your organizational knowledge base. Could you please be more specific about what you'd like to know?"
  }

  const handleQuickAction = (action: string) => {
    setInputMessage(action)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">AI Assistant</h1>
          <p className="text-muted-foreground">
            Get intelligent insights and answers from your organizational documents
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Common tasks and queries</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
                    onClick={() => handleQuickAction(action.action)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <action.icon className="h-4 w-4" />
                      <span className="font-medium text-sm">{action.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-left">{action.description}</p>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>3 new compliance alerts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Safety trends identified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Invoice anomaly detected</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  KMRL AI Assistant
                </CardTitle>
                <CardDescription>Ask questions about documents, policies, or organizational data</CardDescription>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.type === "assistant" && (
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div className={`max-w-[80%] space-y-2 ${message.type === "user" ? "order-first" : ""}`}>
                          <div
                            className={`rounded-lg p-3 ${
                              message.type === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-line">{message.content}</p>
                          </div>

                          {message.sources && (
                            <div className="space-y-2">
                              <p className="text-xs text-muted-foreground">Sources:</p>
                              <div className="flex flex-wrap gap-2">
                                {message.sources.map((source, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    <FileText className="h-3 w-3 mr-1" />
                                    {source.title}
                                    <ExternalLink className="h-3 w-3 ml-1" />
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {message.suggestions && (
                            <div className="space-y-2">
                              <p className="text-xs text-muted-foreground">Try asking:</p>
                              <div className="flex flex-wrap gap-2">
                                {message.suggestions.map((suggestion, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-7 bg-transparent"
                                    onClick={() => handleQuickAction(suggestion)}
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}

                          <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                        </div>

                        {message.type === "user" && (
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="flex gap-2 mt-4">
                  <Input
                    placeholder="Ask about documents, compliance, trends, or any KMRL data..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
