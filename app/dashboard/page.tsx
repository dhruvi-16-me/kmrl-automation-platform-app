import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DocumentProcessingChart } from "@/components/charts/document-processing-chart"
import { FileText, AlertTriangle, CheckCircle, Clock, Users, Settings, Download, Filter } from "lucide-react"

export default function DashboardPage() {
  const kpiData = [
    {
      title: "Documents Processed Today",
      value: "247",
      change: "+12%",
      changeType: "positive" as const,
      icon: FileText,
    },
    {
      title: "OCR Accuracy",
      value: "98.7%",
      change: "+0.3%",
      changeType: "positive" as const,
      icon: CheckCircle,
    },
    {
      title: "Pending Backlog",
      value: "23",
      change: "-8",
      changeType: "positive" as const,
      icon: Clock,
    },
    {
      title: "Critical Escalations",
      value: "3",
      change: "+1",
      changeType: "negative" as const,
      icon: AlertTriangle,
    },
  ]

  const recentActivity = [
    {
      id: 1,
      action: "Safety Manual v2.1 processed",
      user: "AI System",
      time: "2 minutes ago",
      status: "completed",
      department: "Safety",
    },
    {
      id: 2,
      action: "Invoice INV-2024-001 uploaded",
      user: "Priya Nair",
      time: "15 minutes ago",
      status: "pending",
      department: "Finance",
    },
    {
      id: 3,
      action: "Maintenance Report analyzed",
      user: "AI System",
      time: "32 minutes ago",
      status: "completed",
      department: "Engineering",
    },
    {
      id: 4,
      action: "HR Policy updated",
      user: "Rajesh Kumar",
      time: "1 hour ago",
      status: "completed",
      department: "HR",
    },
    {
      id: 5,
      action: "Compliance alert generated",
      user: "AI System",
      time: "2 hours ago",
      status: "urgent",
      department: "Compliance",
    },
  ]

  const pendingApprovals = [
    {
      id: 1,
      document: "Vendor Payment Invoice",
      type: "Financial",
      submittedBy: "Priya Nair",
      priority: "High",
      dueDate: "Today",
      department: "Finance",
    },
    {
      id: 2,
      document: "Safety Incident Report",
      type: "Safety",
      submittedBy: "Arun Menon",
      priority: "Critical",
      dueDate: "Today",
      department: "Safety",
    },
    {
      id: 3,
      document: "Equipment Purchase Order",
      type: "Procurement",
      submittedBy: "Suresh Kumar",
      priority: "Medium",
      dueDate: "Tomorrow",
      department: "Engineering",
    },
  ]

  const teamPerformance = [
    { department: "Engineering", processed: 89, accuracy: 97.2, efficiency: 94 },
    { department: "Finance", processed: 67, accuracy: 99.1, efficiency: 91 },
    { department: "HR", processed: 34, accuracy: 98.8, efficiency: 96 },
    { department: "Safety", processed: 45, accuracy: 96.9, efficiency: 89 },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Operations Dashboard</h1>
            <p className="text-muted-foreground">Real-time overview of document processing and system performance</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <kpi.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className={`text-xs ${kpi.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                  {kpi.change} from yesterday
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Document Processing Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Document Processing Volume</CardTitle>
              <CardDescription>Daily processing trends over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentProcessingChart />
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest document processing and user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.status === "completed"
                          ? "bg-green-500"
                          : activity.status === "urgent"
                            ? "bg-red-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.department}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Department-wise processing statistics and efficiency metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {teamPerformance.map((team) => (
                <div key={team.department} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{team.department}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{team.processed} documents processed</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Accuracy</span>
                        <span>{team.accuracy}%</span>
                      </div>
                      <Progress value={team.accuracy} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Efficiency</span>
                        <span>{team.efficiency}%</span>
                      </div>
                      <Progress value={team.efficiency} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
                <Settings className="h-6 w-6" />
                <span>Create Automation Rule</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
                <AlertTriangle className="h-6 w-6" />
                <span>Review Alerts</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
                <Download className="h-6 w-6" />
                <span>Export Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Documents requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingApprovals.map((approval) => (
                  <TableRow key={approval.id}>
                    <TableCell className="font-medium">{approval.document}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{approval.type}</Badge>
                    </TableCell>
                    <TableCell>{approval.submittedBy}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          approval.priority === "Critical"
                            ? "destructive"
                            : approval.priority === "High"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {approval.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{approval.dueDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="default">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          Reject
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
