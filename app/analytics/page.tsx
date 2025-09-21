import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DocumentTrendsChart } from "@/components/charts/document-trends-chart"
import { DocumentTypesChart } from "@/components/charts/document-types-chart"
import { ProcessingTimeChart } from "@/components/charts/processing-time-chart"
import {
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Filter,
  Bell,
  Info,
  AlertCircle,
} from "lucide-react"

export default function AnalyticsPage() {
  const kpiData = [
    {
      title: "Ingestion Volume",
      value: "1,247",
      change: "+18%",
      changeType: "positive" as const,
      icon: FileText,
      description: "Documents processed this month",
    },
    {
      title: "SLA Compliance",
      value: "94.2%",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: CheckCircle,
      description: "Documents processed within SLA",
    },
    {
      title: "Error Rate",
      value: "1.3%",
      change: "-0.4%",
      changeType: "positive" as const,
      icon: XCircle,
      description: "Processing errors this month",
    },
    {
      title: "Avg Processing Time",
      value: "4.2 min",
      change: "-1.8 min",
      changeType: "positive" as const,
      icon: Clock,
      description: "Average time per document",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      action: "Batch processing completed",
      details: "247 documents processed successfully",
      time: "5 minutes ago",
      type: "success",
    },
    {
      id: 2,
      action: "OCR accuracy threshold exceeded",
      details: "Engineering documents showing 99.1% accuracy",
      time: "12 minutes ago",
      type: "info",
    },
    {
      id: 3,
      action: "Processing delay detected",
      details: "Finance department backlog increased by 15%",
      time: "25 minutes ago",
      type: "warning",
    },
    {
      id: 4,
      action: "New compliance rule activated",
      details: "MoHUA safety standards now enforced",
      time: "1 hour ago",
      type: "info",
    },
    {
      id: 5,
      action: "System optimization completed",
      details: "Processing speed improved by 23%",
      time: "2 hours ago",
      type: "success",
    },
  ]

  const notifications = [
    {
      id: 1,
      type: "High Priority",
      title: "SLA Breach Alert",
      message: "3 documents exceeded processing time limits",
      time: "10 minutes ago",
      priority: "high",
    },
    {
      id: 2,
      type: "Info",
      title: "Weekly Report Ready",
      message: "Analytics report for Week 3 is available for download",
      time: "2 hours ago",
      priority: "info",
    },
    {
      id: 3,
      type: "Error",
      title: "OCR Processing Failed",
      message: "2 documents require manual review due to poor image quality",
      time: "4 hours ago",
      priority: "error",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "error":
        return "destructive"
      case "info":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive insights into document processing performance and trends
            </p>
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
                  {kpi.change} from last month
                </p>
                <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Document Processing Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Document Processing Trends</CardTitle>
              <CardDescription>Daily processing volume and success rates over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentTrendsChart />
            </CardContent>
          </Card>

          {/* Document Types Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Document Types Distribution</CardTitle>
              <CardDescription>Breakdown of processed documents by type this month</CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentTypesChart />
            </CardContent>
          </Card>
        </div>

        {/* Processing Time Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Processing Time Analysis</CardTitle>
            <CardDescription>Average processing time by document type and department</CardDescription>
          </CardHeader>
          <CardContent>
            <ProcessingTimeChart />
          </CardContent>
        </Card>

        {/* Activity and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system events and processing updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.details}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notifications Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>System alerts and important updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant={getPriorityColor(notification.priority) as any}>{notification.type}</Badge>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
