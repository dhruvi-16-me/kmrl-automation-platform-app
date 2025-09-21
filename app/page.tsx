import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, FileText, Bot, BarChart3, Shield, Zap, CheckCircle, Clock, Users } from "lucide-react"

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-display text-balance leading-none tracking-tight">
            Empowering KMRL with Smart Document Intelligence
          </h1>
          <p className="text-xl md:text-2xl font-body text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Transform your document workflows with AI-powered processing, compliance monitoring, and intelligent
            insights for the Kochi Metro Rail system.
          </p>
        </div>

        {/* Key Highlights */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 icon-primary" />
              </div>
              <CardTitle className="font-heading text-2xl font-semibold">Faster Decisions</CardTitle>
              <CardDescription className="font-body text-base">
                AI-powered document processing reduces review time by 80%
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 icon-secondary" />
              </div>
              <CardTitle className="font-heading text-2xl font-semibold">Compliance Assurance</CardTitle>
              <CardDescription className="font-body text-base">
                Automated monitoring of MoHUA and safety regulations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-8 w-8 icon-primary" />
              </div>
              <CardTitle className="font-heading text-2xl font-semibold">Institutional Knowledge</CardTitle>
              <CardDescription className="font-body text-base">
                Centralized repository of organizational wisdom and insights
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-3xl font-semibold">Quick Actions</CardTitle>
            <CardDescription className="font-body text-lg">Get started with the most common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/dashboard">
                <Button className="w-full h-auto p-6 flex flex-col gap-3 bg-transparent" variant="outline">
                  <BarChart3 className="h-8 w-8 icon-primary" />
                  <div className="text-center">
                    <div className="font-body-medium text-base">Go to Dashboard</div>
                    <div className="text-sm font-body text-muted-foreground">View operations overview</div>
                  </div>
                  <ArrowRight className="h-4 w-4 icon-secondary" />
                </Button>
              </Link>

              <Link href="/documents">
                <Button className="w-full h-auto p-6 flex flex-col gap-3 bg-transparent" variant="outline">
                  <FileText className="h-8 w-8 icon-primary" />
                  <div className="text-center">
                    <div className="font-body-medium text-base">Upload Document</div>
                    <div className="text-sm font-body text-muted-foreground">Process new files</div>
                  </div>
                  <ArrowRight className="h-4 w-4 icon-secondary" />
                </Button>
              </Link>

              <Link href="/ai-assistant">
                <Button className="w-full h-auto p-6 flex flex-col gap-3 bg-transparent" variant="outline">
                  <Bot className="h-8 w-8 icon-primary" />
                  <div className="text-center">
                    <div className="font-body-medium text-base">Open AI Assistant</div>
                    <div className="text-sm font-body text-muted-foreground">Ask questions & get insights</div>
                  </div>
                  <ArrowRight className="h-4 w-4 icon-secondary" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-3xl font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-body-medium">Safety Manual v2.1 processed</p>
                  <p className="text-xs font-body text-muted-foreground">2 minutes ago</p>
                </div>
                <Badge variant="secondary">Completed</Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-body-medium">Invoice INV-2024-001 awaiting approval</p>
                  <p className="text-xs font-body text-muted-foreground">15 minutes ago</p>
                </div>
                <Badge variant="outline">Pending</Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-body-medium">Compliance alert: MoHUA circular</p>
                  <p className="text-xs font-body text-muted-foreground">1 hour ago</p>
                </div>
                <Badge variant="destructive">Action Required</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-3xl font-semibold">System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-body">Document Processing</span>
                </div>
                <Badge variant="secondary">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-body">AI Assistant</span>
                </div>
                <Badge variant="secondary">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-body">Compliance Monitor</span>
                </div>
                <Badge variant="outline">Updating</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="border-t pt-8 mt-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading text-2xl font-semibold mb-3">KMRL Mission</h3>
              <p className="text-base font-body text-muted-foreground leading-relaxed">
                To provide safe, reliable, and efficient metro rail services while maintaining the highest standards of
                operational excellence.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-2xl font-semibold mb-3">Contact Information</h3>
              <div className="text-base font-body text-muted-foreground space-y-1">
                <p>Email: info@kmrl.co.in</p>
                <p>Phone: +91 484 2346000</p>
                <p>Address: Kochi Metro Rail Limited, Kochi</p>
              </div>
            </div>
            <div>
              <h3 className="font-heading text-2xl font-semibold mb-3">Quick Links</h3>
              <div className="text-base font-body text-muted-foreground space-y-1">
                <p>
                  <Link href="/compliance" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </p>
                <p>
                  <Link href="/compliance" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </p>
                <p>
                  <Link href="/compliance" className="hover:text-foreground">
                    Data Protection
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-4 text-center text-base font-body text-muted-foreground">
            <p>&copy; 2024 Kochi Metro Rail Limited. Smart India Hackathon Project.</p>
          </div>
        </footer>
      </div>
    </DashboardLayout>
  )
}
