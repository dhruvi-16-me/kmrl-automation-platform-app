"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Upload, Search, FileText, Calendar, User, Eye, Download, Globe } from "lucide-react"

const documents = [
  {
    id: 1,
    title: "Safety Manual v2.1",
    summary:
      "Updated safety protocols for metro operations including emergency procedures and risk assessment guidelines.",
    department: "Safety",
    urgency: "High",
    uploadedBy: "Arun Menon",
    uploadedDate: "2024-01-15",
    type: "Manual",
    status: "Processed",
    fileSize: "2.4 MB",
  },
  {
    id: 2,
    title: "Vendor Payment Invoice INV-2024-001",
    summary: "Payment invoice for electrical equipment maintenance services provided by TechCorp Solutions.",
    department: "Finance",
    urgency: "Critical",
    uploadedBy: "Priya Nair",
    uploadedDate: "2024-01-14",
    type: "Invoice",
    status: "Pending Approval",
    fileSize: "1.2 MB",
  },
  {
    id: 3,
    title: "Monthly Maintenance Report - December 2023",
    summary:
      "Comprehensive maintenance report covering all metro systems, equipment status, and preventive maintenance activities.",
    department: "Engineering",
    urgency: "Medium",
    uploadedBy: "Suresh Kumar",
    uploadedDate: "2024-01-10",
    type: "Report",
    status: "Processed",
    fileSize: "5.8 MB",
  },
  {
    id: 4,
    title: "HR Policy Update - Remote Work Guidelines",
    summary: "Updated human resources policy document outlining new remote work procedures and employee guidelines.",
    department: "HR",
    urgency: "Low",
    uploadedBy: "Rajesh Kumar",
    uploadedDate: "2024-01-08",
    type: "Policy",
    status: "Processed",
    fileSize: "0.9 MB",
  },
  {
    id: 5,
    title: "MoHUA Compliance Circular - Safety Standards",
    summary:
      "Official circular from Ministry of Housing and Urban Affairs regarding updated safety standards for metro operations.",
    department: "Compliance",
    urgency: "Critical",
    uploadedBy: "AI System",
    uploadedDate: "2024-01-12",
    type: "Circular",
    status: "Action Required",
    fileSize: "1.5 MB",
  },
]

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedUrgency, setSelectedUrgency] = useState("all")
  const [selectedDocument, setSelectedDocument] = useState<(typeof documents)[0] | null>(null)
  const [language, setLanguage] = useState("english")

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || doc.department === selectedDepartment
    const matchesUrgency = selectedUrgency === "all" || doc.urgency === selectedUrgency

    return matchesSearch && matchesDepartment && matchesUrgency
  })

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical":
        return "destructive"
      case "High":
        return "default"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processed":
        return "bg-green-100 text-green-800"
      case "Pending Approval":
        return "bg-yellow-100 text-yellow-800"
      case "Action Required":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Documents</h1>
            <p className="text-muted-foreground">
              Manage and process organizational documents with AI-powered insights
            </p>
          </div>
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents by title, content, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Safety">Safety</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Document Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{document.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{document.department}</Badge>
                      <Badge variant={getUrgencyColor(document.urgency) as any}>{document.urgency}</Badge>
                    </div>
                  </div>
                  <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">{document.summary}</p>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3" />
                    <span>{document.uploadedBy}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>{document.uploadedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-3 w-3" />
                    <span>
                      {document.type} • {document.fileSize}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(document.status)}`}>
                    {document.status}
                  </span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedDocument(document)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Full Document
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{document.title}</DialogTitle>
                        <DialogDescription>
                          {document.department} • {document.type} • Uploaded by {document.uploadedBy}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid md:grid-cols-2 gap-6 mt-4">
                        {/* Summary Section */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">AI Summary</h3>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setLanguage(language === "english" ? "malayalam" : "english")}
                              >
                                <Globe className="h-4 w-4 mr-2" />
                                {language === "english" ? "മലയാളം" : "English"}
                              </Button>
                            </div>
                          </div>
                          <div className="prose prose-sm max-w-none">
                            <p>{document.summary}</p>
                            <h4>Key Points:</h4>
                            <ul>
                              <li>Document processed with 98.7% accuracy</li>
                              <li>Contains {Math.floor(Math.random() * 50) + 10} actionable items</li>
                              <li>Compliance status: {document.status}</li>
                              <li>Estimated reading time: {Math.floor(Math.random() * 15) + 5} minutes</li>
                            </ul>
                            <h4>AI Insights:</h4>
                            <p>
                              This document contains important information regarding {document.department.toLowerCase()}{" "}
                              operations and requires attention from relevant stakeholders.
                            </p>
                          </div>
                        </div>

                        {/* PDF Viewer Section */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Original Document</h3>
                          <div className="border rounded-lg p-4 bg-muted/50 min-h-[400px] flex items-center justify-center">
                            <div className="text-center space-y-4">
                              <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
                              <div>
                                <p className="font-medium">{document.title}</p>
                                <p className="text-sm text-muted-foreground">{document.fileSize}</p>
                              </div>
                              <Button variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No documents found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or upload a new document.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
