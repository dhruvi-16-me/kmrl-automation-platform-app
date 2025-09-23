"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  FileText,
  Shield,
  Wrench,
  Users,
  DollarSign,
  Eye,
  Download,
  Star,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"

const knowledgeCategories = [
  { id: "safety", name: "Safety", icon: Shield, count: 45, color: "text-red-500" },
  { id: "engineering", name: "Engineering", icon: Wrench, count: 67, color: "text-blue-500" },
  { id: "hr", name: "HR", icon: Users, count: 23, color: "text-green-500" },
  { id: "procurement", name: "Procurement", icon: DollarSign, count: 34, color: "text-yellow-500" },
  { id: "finance", name: "Finance", icon: DollarSign, count: 28, color: "text-purple-500" },
]

const knowledgeItems = [
  {
    id: 1,
    title: "Emergency Evacuation Procedures - Platform Level",
    category: "Safety",
    type: "Procedure",
    summary: "Comprehensive guide for passenger evacuation during emergencies at platform level",
    dateAdded: "2024-01-10",
    lastUpdated: "2024-01-12",
    views: 156,
    rating: 4.8,
    tags: ["emergency", "evacuation", "platform", "safety"],
    author: "Arun Menon",
    department: "Safety",
    featured: true,
  },
  {
    id: 2,
    title: "Signaling System Maintenance Best Practices",
    category: "Engineering",
    type: "Best Practice",
    summary: "Proven methodologies for maintaining and troubleshooting metro signaling systems",
    dateAdded: "2024-01-08",
    lastUpdated: "2024-01-10",
    views: 89,
    rating: 4.6,
    tags: ["signaling", "maintenance", "troubleshooting", "engineering"],
    author: "Suresh Kumar",
    department: "Engineering",
    featured: false,
  },
  {
    id: 3,
    title: "Vendor Evaluation Framework",
    category: "Procurement",
    type: "Framework",
    summary: "Standardized framework for evaluating and selecting vendors for metro operations",
    dateAdded: "2024-01-05",
    lastUpdated: "2024-01-07",
    views: 67,
    rating: 4.5,
    tags: ["vendor", "evaluation", "procurement", "framework"],
    author: "Priya Nair",
    department: "Procurement",
    featured: true,
  },
  {
    id: 4,
    title: "Employee Onboarding Checklist",
    category: "HR",
    type: "Checklist",
    summary: "Complete checklist for onboarding new employees in metro operations",
    dateAdded: "2024-01-03",
    lastUpdated: "2024-01-05",
    views: 134,
    rating: 4.7,
    tags: ["onboarding", "hr", "checklist", "employees"],
    author: "Rajesh Kumar",
    department: "HR",
    featured: false,
  },
  {
    id: 5,
    title: "Budget Planning Methodology",
    category: "Finance",
    type: "Methodology",
    summary: "Systematic approach to annual budget planning for metro operations",
    dateAdded: "2023-12-28",
    lastUpdated: "2024-01-02",
    views: 78,
    rating: 4.4,
    tags: ["budget", "planning", "finance", "methodology"],
    author: "Meera Pillai",
    department: "Finance",
    featured: false,
  },
  {
    id: 6,
    title: "Incident Response Playbook",
    category: "Safety",
    type: "Playbook",
    summary: "Step-by-step response procedures for various types of safety incidents",
    dateAdded: "2023-12-25",
    lastUpdated: "2024-01-01",
    views: 203,
    rating: 4.9,
    tags: ["incident", "response", "safety", "playbook"],
    author: "Arun Menon",
    department: "Safety",
    featured: true,
  },
]

const trendingTopics = [
  { topic: "AI-powered maintenance", searches: 45, trend: "up" },
  { topic: "Emergency protocols", searches: 38, trend: "up" },
  { topic: "Vendor management", searches: 32, trend: "stable" },
  { topic: "Safety compliance", searches: 28, trend: "up" },
  { topic: "Budget optimization", searches: 24, trend: "down" },
]

const recentLearnings = [
  {
    id: 1,
    title: "Platform Door Malfunction - Line 2",
    type: "Incident Learning",
    date: "2024-01-12",
    summary: "Key learnings from platform door malfunction and resolution process",
    impact: "High",
  },
  {
    id: 2,
    title: "Vendor Performance Analysis Q4 2023",
    type: "Analysis",
    date: "2024-01-08",
    summary: "Quarterly analysis of vendor performance and improvement recommendations",
    impact: "Medium",
  },
  {
    id: 3,
    title: "Energy Efficiency Optimization",
    type: "Best Practice",
    date: "2024-01-05",
    summary: "Successful implementation of energy-saving measures across stations",
    impact: "High",
  },
]

export default function KnowledgeVaultPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedItem, setSelectedItem] = useState<(typeof knowledgeItems)[0] | null>(null)

  const filteredItems = knowledgeItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesType = typeFilter === "all" || item.type === typeFilter

    return matchesSearch && matchesCategory && matchesType
  })

  const featuredItems = knowledgeItems.filter((item) => item.featured)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Knowledge Vault</h1>
            <p className="text-muted-foreground">
              Centralized repository of institutional knowledge, best practices, and organizational wisdom
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Add Knowledge
            </Button>
          </div>
        </div>

        {/* Categories Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {knowledgeCategories.map((category) => (
            <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-muted ${category.color}`}>
                    <category.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{category.name}</p>
                    <p className="text-sm text-muted-foreground">{category.count} items</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search knowledge base..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {knowledgeCategories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Procedure">Procedure</SelectItem>
                      <SelectItem value="Best Practice">Best Practice</SelectItem>
                      <SelectItem value="Framework">Framework</SelectItem>
                      <SelectItem value="Checklist">Checklist</SelectItem>
                      <SelectItem value="Methodology">Methodology</SelectItem>
                      <SelectItem value="Playbook">Playbook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Featured Content */}
            {searchTerm === "" && categoryFilter === "all" && typeFilter === "all" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Featured Knowledge
                  </CardTitle>
                  <CardDescription>Most valuable and frequently accessed knowledge items</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {featuredItems.slice(0, 4).map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.summary}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{item.category}</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs">{item.rating}</span>
                            </div>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedItem(item)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Knowledge Items */}
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Repository</CardTitle>
                <CardDescription>
                  {filteredItems.length} items found
                  {searchTerm && ` for "${searchTerm}"`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{item.title}</h3>
                            {item.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{item.summary}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {item.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>By {item.author}</span>
                            <span>Updated {item.lastUpdated}</span>
                            <span>{item.views} views</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span>{item.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{item.type}</Badge>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedItem(item)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{item.title}</DialogTitle>
                                <DialogDescription>
                                  {item.category} • {item.type} • By {item.author}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Department</label>
                                    <p className="text-sm text-muted-foreground">{item.department}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Last Updated</label>
                                    <p className="text-sm text-muted-foreground">{item.lastUpdated}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Views</label>
                                    <p className="text-sm text-muted-foreground">{item.views}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Rating</label>
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                      <span className="text-sm">{item.rating}</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Summary</label>
                                  <p className="text-sm text-muted-foreground">{item.summary}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Tags</label>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {item.tags.map((tag) => (
                                      <Badge key={tag} variant="secondary" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex gap-2 pt-4">
                                  <Button className="flex-1">View Full Content</Button>
                                  <Button variant="outline" className="flex-1 bg-transparent">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{topic.topic}</p>
                        <p className="text-xs text-muted-foreground">{topic.searches} searches</p>
                      </div>
                      <div
                        className={`text-xs ${topic.trend === "up" ? "text-green-500" : topic.trend === "down" ? "text-red-500" : "text-gray-500"}`}
                      >
                        {topic.trend === "up" ? "↗" : topic.trend === "down" ? "↘" : "→"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Learnings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Recent Learnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentLearnings.map((learning) => (
                    <div key={learning.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {learning.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{learning.date}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{learning.title}</p>
                        <p className="text-xs text-muted-foreground">{learning.summary}</p>
                      </div>
                      <Badge
                        variant={
                          learning.impact === "High"
                            ? "destructive"
                            : learning.impact === "Medium"
                              ? "default"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {learning.impact} Impact
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
