"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle, XCircle, Clock, Search, Download, Eye, User, Calendar, AlertTriangle } from "lucide-react"

const approvalData = [
  {
    id: 1,
    documentName: "Vendor Payment Invoice - TechCorp",
    type: "Financial",
    submittedBy: "Priya Nair",
    submittedDate: "2024-01-15",
    priority: "Critical",
    dueDate: "2024-01-16",
    status: "Pending",
    department: "Finance",
    amount: "₹2,45,000",
    description: "Payment for electrical equipment maintenance services",
  },
  {
    id: 2,
    documentName: "Safety Incident Report - Platform 3",
    type: "Safety",
    submittedBy: "Arun Menon",
    submittedDate: "2024-01-14",
    priority: "Critical",
    dueDate: "2024-01-15",
    status: "Pending",
    department: "Safety",
    amount: null,
    description: "Minor incident report requiring immediate review",
  },
  {
    id: 3,
    documentName: "Equipment Purchase Order - Signaling System",
    type: "Procurement",
    submittedBy: "Suresh Kumar",
    submittedDate: "2024-01-13",
    priority: "High",
    dueDate: "2024-01-17",
    status: "Pending",
    department: "Engineering",
    amount: "₹15,75,000",
    description: "New signaling equipment for Line 2 extension",
  },
  {
    id: 4,
    documentName: "HR Policy Amendment - Leave Structure",
    type: "Policy",
    submittedBy: "Rajesh Kumar",
    submittedDate: "2024-01-12",
    priority: "Medium",
    dueDate: "2024-01-20",
    status: "Approved",
    department: "HR",
    amount: null,
    description: "Updated leave policy for metro operations staff",
  },
  {
    id: 5,
    documentName: "Maintenance Contract Renewal",
    type: "Contract",
    submittedBy: "Deepak Nair",
    submittedDate: "2024-01-10",
    priority: "High",
    dueDate: "2024-01-18",
    status: "Rejected",
    department: "Engineering",
    amount: "₹8,50,000",
    description: "Annual maintenance contract for escalators",
  },
  {
    id: 6,
    documentName: "Training Program Budget Allocation",
    type: "Budget",
    submittedBy: "Meera Pillai",
    submittedDate: "2024-01-11",
    priority: "Medium",
    dueDate: "2024-01-19",
    status: "Pending",
    department: "HR",
    amount: "₹3,25,000",
    description: "Budget for quarterly safety training programs",
  },
]

export default function ApprovalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [selectedDocument, setSelectedDocument] = useState<(typeof approvalData)[0] | null>(null)

  const filteredData = approvalData.filter((item) => {
    const matchesSearch =
      item.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesPriority = priorityFilter === "all" || item.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    const pendingItems = filteredData.filter((item) => item.status === "Pending").map((item) => item.id)
    setSelectedItems((prev) => (prev.length === pendingItems.length ? [] : pendingItems))
  }

  const handleBulkApprove = () => {
    console.log("Bulk approving items:", selectedItems)
    setSelectedItems([])
  }

  const handleBulkReject = () => {
    console.log("Bulk rejecting items:", selectedItems)
    setSelectedItems([])
  }

  const pendingCount = filteredData.filter((item) => item.status === "Pending").length
  const criticalCount = filteredData.filter((item) => item.priority === "Critical" && item.status === "Pending").length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Approvals</h1>
            <p className="text-muted-foreground">Review and approve documents requiring authorization</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                  <p className="text-sm text-muted-foreground">Pending Approvals</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{criticalCount}</p>
                  <p className="text-sm text-muted-foreground">Critical Priority</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {approvalData.filter((item) => item.status === "Approved").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Approved Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {approvalData.filter((item) => item.status === "Rejected").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by document name, submitter, or type..."
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
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{selectedItems.length} item(s) selected</p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleBulkApprove}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Bulk Approve
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleBulkReject}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Bulk Reject
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Approvals Table */}
        <Card>
          <CardHeader>
            <CardTitle>Approval Queue</CardTitle>
            <CardDescription>Documents requiring review and approval</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedItems.length === filteredData.filter((item) => item.status === "Pending").length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.status === "Pending" && (
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => handleSelectItem(item.id)}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.documentName}</p>
                        {item.amount && <p className="text-sm text-muted-foreground">{item.amount}</p>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {item.submittedBy}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(item.priority) as any}>{item.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {item.dueDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setSelectedDocument(item)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{item.documentName}</DialogTitle>
                              <DialogDescription>Review document details and make approval decision</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Submitted By</label>
                                  <p className="text-sm text-muted-foreground">{item.submittedBy}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Department</label>
                                  <p className="text-sm text-muted-foreground">{item.department}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Type</label>
                                  <p className="text-sm text-muted-foreground">{item.type}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Priority</label>
                                  <Badge variant={getPriorityColor(item.priority) as any}>{item.priority}</Badge>
                                </div>
                                {item.amount && (
                                  <div>
                                    <label className="text-sm font-medium">Amount</label>
                                    <p className="text-sm text-muted-foreground">{item.amount}</p>
                                  </div>
                                )}
                                <div>
                                  <label className="text-sm font-medium">Due Date</label>
                                  <p className="text-sm text-muted-foreground">{item.dueDate}</p>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Description</label>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                              {item.status === "Pending" && (
                                <div className="flex gap-2 pt-4">
                                  <Button className="flex-1">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </Button>
                                  <Button variant="outline" className="flex-1 bg-transparent">
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        {item.status === "Pending" && (
                          <>
                            <Button size="sm">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
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
