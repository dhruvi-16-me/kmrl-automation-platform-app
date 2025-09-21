"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Search,
  Calendar,
  FileText,
  ExternalLink,
  Bell,
} from "lucide-react"

const complianceData = [
  {
    id: 1,
    title: "MoHUA Safety Standards Compliance",
    category: "Safety",
    status: "Compliant",
    lastReview: "2024-01-10",
    nextReview: "2024-04-10",
    progress: 100,
    priority: "High",
    description: "Compliance with Ministry of Housing and Urban Affairs safety standards for metro operations",
    requirements: 15,
    completed: 15,
  },
  {
    id: 2,
    title: "Fire Safety Regulations",
    category: "Safety",
    status: "Pending",
    lastReview: "2024-01-05",
    nextReview: "2024-01-20",
    progress: 85,
    priority: "Critical",
    description: "Fire safety equipment inspection and compliance verification",
    requirements: 12,
    completed: 10,
  },
  {
    id: 3,
    title: "Environmental Impact Assessment",
    category: "Environmental",
    status: "Overdue",
    lastReview: "2023-12-15",
    nextReview: "2024-01-15",
    progress: 60,
    priority: "High",
    description: "Annual environmental impact assessment and mitigation measures",
    requirements: 8,
    completed: 5,
  },
  {
    id: 4,
    title: "Data Protection & Privacy",
    category: "Data Security",
    status: "Compliant",
    lastReview: "2024-01-08",
    nextReview: "2024-07-08",
    progress: 100,
    priority: "Medium",
    description: "GDPR and local data protection law compliance",
    requirements: 10,
    completed: 10,
  },
  {
    id: 5,
    title: "Financial Audit Requirements",
    category: "Financial",
    status: "Pending",
    lastReview: "2024-01-01",
    nextReview: "2024-01-25",
    progress: 75,
    priority: "Medium",
    description: "Annual financial audit and regulatory reporting requirements",
    requirements: 20,
    completed: 15,
  },
]

const regulatoryUpdates = [
  {
    id: 1,
    title: "Updated Metro Safety Guidelines 2024",
    source: "MoHUA",
    date: "2024-01-12",
    type: "Guideline",
    impact: "High",
    summary: "New safety protocols for passenger evacuation and emergency response procedures",
    actionRequired: true,
  },
  {
    id: 2,
    title: "Environmental Compliance Framework",
    source: "Ministry of Environment",
    date: "2024-01-08",
    type: "Framework",
    impact: "Medium",
    summary: "Updated environmental monitoring requirements for urban transport systems",
    actionRequired: false,
  },
  {
    id: 3,
    title: "Digital Security Standards for Public Transport",
    source: "CERT-In",
    date: "2024-01-05",
    type: "Standard",
    impact: "High",
    summary: "Enhanced cybersecurity requirements for digital infrastructure",
    actionRequired: true,
  },
  {
    id: 4,
    title: "Financial Reporting Guidelines Update",
    source: "CAG",
    date: "2023-12-28",
    type: "Guideline",
    impact: "Low",
    summary: "Minor updates to quarterly financial reporting formats",
    actionRequired: false,
  },
]

export default function CompliancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedCompliance, setSelectedCompliance] = useState<(typeof complianceData)[0] | null>(null)

  const filteredData = complianceData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Compliant":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "destructive"
      case "High":
        return "default"
      case "Medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "outline"
    }
  }

  const compliantCount = complianceData.filter((item) => item.status === "Compliant").length
  const pendingCount = complianceData.filter((item) => item.status === "Pending").length
  const overdueCount = complianceData.filter((item) => item.status === "Overdue").length
  const actionRequiredCount = regulatoryUpdates.filter((item) => item.actionRequired).length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Compliance Management</h1>
            <p className="text-muted-foreground">
              Monitor regulatory compliance and track adherence to safety and operational standards
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Compliance Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{compliantCount}</p>
                  <p className="text-sm text-muted-foreground">Compliant</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{overdueCount}</p>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{actionRequiredCount}</p>
                  <p className="text-sm text-muted-foreground">Action Required</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regulatory Updates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Regulatory Updates
            </CardTitle>
            <CardDescription>Latest updates from MoHUA, Metro Rail Safety, and other regulatory bodies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regulatoryUpdates.map((update) => (
                <div key={update.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{update.title}</h3>
                        {update.actionRequired && <Badge variant="destructive">Action Required</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{update.summary}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Source: {update.source}</span>
                        <span>Date: {update.date}</span>
                        <span>Type: {update.type}</span>
                        <Badge variant={getImpactColor(update.impact) as any} className="text-xs">
                          {update.impact} Impact
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search compliance requirements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Compliant">Compliant</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Safety">Safety</SelectItem>
                  <SelectItem value="Environmental">Environmental</SelectItem>
                  <SelectItem value="Data Security">Data Security</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Status Tracker */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Status Tracker</CardTitle>
            <CardDescription>Track progress and deadlines for all compliance requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Requirement</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Next Review</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.completed}/{item.requirements} requirements completed
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Progress value={item.progress} className="h-2" />
                        <span className="text-xs text-muted-foreground">{item.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{item.nextReview}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(item.priority) as any}>{item.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setSelectedCompliance(item)}>
                              <FileText className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{item.title}</DialogTitle>
                              <DialogDescription>
                                Compliance requirement details and progress tracking
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Category</label>
                                  <p className="text-sm text-muted-foreground">{item.category}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Priority</label>
                                  <Badge variant={getPriorityColor(item.priority) as any}>{item.priority}</Badge>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Last Review</label>
                                  <p className="text-sm text-muted-foreground">{item.lastReview}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Next Review</label>
                                  <p className="text-sm text-muted-foreground">{item.nextReview}</p>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Description</label>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Progress</label>
                                <div className="space-y-2">
                                  <Progress value={item.progress} className="h-3" />
                                  <p className="text-sm text-muted-foreground">
                                    {item.completed} of {item.requirements} requirements completed ({item.progress}%)
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2 pt-4">
                                <Button className="flex-1">Update Progress</Button>
                                <Button variant="outline" className="flex-1 bg-transparent">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Report
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
