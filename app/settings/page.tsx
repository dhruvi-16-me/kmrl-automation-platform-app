"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
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
  Settings,
  Users,
  Bell,
  Globe,
  Shield,
  Database,
  Smartphone,
  Cloud,
  Key,
  Plus,
  Edit,
  Trash2,
} from "lucide-react"

const userRoles = [
  {
    id: 1,
    name: "Admin",
    description: "Full system access and user management",
    users: 3,
    permissions: ["All Permissions"],
    color: "destructive",
  },
  {
    id: 2,
    name: "Engineer",
    description: "Engineering documents and maintenance access",
    users: 12,
    permissions: ["Documents", "Analytics", "Knowledge Vault"],
    color: "default",
  },
  {
    id: 3,
    name: "HR",
    description: "Human resources and policy management",
    users: 5,
    permissions: ["Documents", "Approvals", "Knowledge Vault"],
    color: "secondary",
  },
  {
    id: 4,
    name: "Finance",
    description: "Financial documents and approval workflows",
    users: 8,
    permissions: ["Documents", "Approvals", "Analytics"],
    color: "outline",
  },
  {
    id: 5,
    name: "Controller",
    description: "Oversight and compliance monitoring",
    users: 2,
    permissions: ["Analytics", "Compliance", "Approvals"],
    color: "default",
  },
]

const apiIntegrations = [
  {
    id: 1,
    name: "Maximo",
    description: "Asset management and maintenance system",
    status: "Connected",
    lastSync: "2024-01-15 10:30 AM",
    type: "ERP",
  },
  {
    id: 2,
    name: "SharePoint",
    description: "Document management and collaboration",
    status: "Connected",
    lastSync: "2024-01-15 09:45 AM",
    type: "Document Store",
  },
  {
    id: 3,
    name: "WhatsApp Business",
    description: "PDF document processing via WhatsApp",
    status: "Pending",
    lastSync: "Never",
    type: "Communication",
  },
  {
    id: 4,
    name: "Cloud Storage",
    description: "Backup and archival storage",
    status: "Connected",
    lastSync: "2024-01-15 11:15 AM",
    type: "Storage",
  },
]

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    documentProcessed: true,
    approvalRequired: true,
    complianceAlert: true,
    systemMaintenance: false,
  })

  const [language, setLanguage] = useState("english")
  const [theme, setTheme] = useState("light")
  const [selectedRole, setSelectedRole] = useState<(typeof userRoles)[0] | null>(null)

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage system configuration, user roles, and integration preferences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="space-y-2">
            <Card>
              <CardContent className="pt-6">
                <nav className="space-y-2">
                  <a
                    href="#user-roles"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground"
                  >
                    <Users className="h-4 w-4" />
                    User Roles
                  </a>
                  <a
                    href="#notifications"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted"
                  >
                    <Bell className="h-4 w-4" />
                    Notifications
                  </a>
                  <a
                    href="#preferences"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted"
                  >
                    <Globe className="h-4 w-4" />
                    Preferences
                  </a>
                  <a
                    href="#security"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted"
                  >
                    <Shield className="h-4 w-4" />
                    Security
                  </a>
                  <a
                    href="#integrations"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted"
                  >
                    <Database className="h-4 w-4" />
                    Integrations
                  </a>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Settings Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* User Roles Management */}
            <Card id="user-roles">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      User Roles Management
                    </CardTitle>
                    <CardDescription>Configure user roles and permissions for different departments</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Role
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userRoles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{role.name}</p>
                              <Badge variant={role.color as any}>{role.name}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{role.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{role.users}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.slice(0, 2).map((permission) => (
                              <Badge key={permission} variant="outline" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                            {role.permissions.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{role.permissions.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" onClick={() => setSelectedRole(role)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Role: {role.name}</DialogTitle>
                                  <DialogDescription>Modify role permissions and settings</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="role-name">Role Name</Label>
                                    <Input id="role-name" defaultValue={role.name} />
                                  </div>
                                  <div>
                                    <Label htmlFor="role-description">Description</Label>
                                    <Input id="role-description" defaultValue={role.description} />
                                  </div>
                                  <div>
                                    <Label>Permissions</Label>
                                    <div className="space-y-2 mt-2">
                                      {[
                                        "Documents",
                                        "Analytics",
                                        "Approvals",
                                        "Compliance",
                                        "Knowledge Vault",
                                        "Settings",
                                      ].map((permission) => (
                                        <div key={permission} className="flex items-center space-x-2">
                                          <Switch
                                            id={permission}
                                            defaultChecked={role.permissions.includes(permission)}
                                          />
                                          <Label htmlFor={permission}>{permission}</Label>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="flex gap-2 pt-4">
                                    <Button className="flex-1">Save Changes</Button>
                                    <Button variant="outline" className="flex-1 bg-transparent">
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card id="notifications">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Configure how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Delivery Methods</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={notifications.email}
                        onCheckedChange={(value) => handleNotificationChange("email", value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Browser push notifications</p>
                        </div>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={notifications.push}
                        onCheckedChange={(value) => handleNotificationChange("push", value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <Label htmlFor="sms-notifications">SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Critical alerts via SMS</p>
                        </div>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={notifications.sms}
                        onCheckedChange={(value) => handleNotificationChange("sms", value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="document-processed">Document Processed</Label>
                        <p className="text-sm text-muted-foreground">When documents are successfully processed</p>
                      </div>
                      <Switch
                        id="document-processed"
                        checked={notifications.documentProcessed}
                        onCheckedChange={(value) => handleNotificationChange("documentProcessed", value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="approval-required">Approval Required</Label>
                        <p className="text-sm text-muted-foreground">When documents need your approval</p>
                      </div>
                      <Switch
                        id="approval-required"
                        checked={notifications.approvalRequired}
                        onCheckedChange={(value) => handleNotificationChange("approvalRequired", value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="compliance-alert">Compliance Alerts</Label>
                        <p className="text-sm text-muted-foreground">Regulatory compliance notifications</p>
                      </div>
                      <Switch
                        id="compliance-alert"
                        checked={notifications.complianceAlert}
                        onCheckedChange={(value) => handleNotificationChange("complianceAlert", value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="system-maintenance">System Maintenance</Label>
                        <p className="text-sm text-muted-foreground">Scheduled maintenance notifications</p>
                      </div>
                      <Switch
                        id="system-maintenance"
                        checked={notifications.systemMaintenance}
                        onCheckedChange={(value) => handleNotificationChange("systemMaintenance", value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Language and Theme Preferences */}
            <Card id="preferences">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Language & Theme Preferences
                </CardTitle>
                <CardDescription>Customize your interface language and appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="language-select">Interface Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language-select" className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="malayalam">മലയാളം (Malayalam)</SelectItem>
                        <SelectItem value="hindi">हिन्दी (Hindi)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground mt-1">
                      Choose your preferred language for the interface
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="theme-select">Theme</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger id="theme-select" className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground mt-1">Choose your preferred color theme</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Integrations */}
            <Card id="integrations">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  API Integrations
                </CardTitle>
                <CardDescription>
                  Manage connections to external systems like Maximo, SharePoint, and cloud services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiIntegrations.map((integration) => (
                    <div key={integration.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-muted">
                            {integration.type === "ERP" && <Database className="h-5 w-5" />}
                            {integration.type === "Document Store" && <Cloud className="h-5 w-5" />}
                            {integration.type === "Communication" && <Smartphone className="h-5 w-5" />}
                            {integration.type === "Storage" && <Cloud className="h-5 w-5" />}
                          </div>
                          <div>
                            <h3 className="font-semibold">{integration.name}</h3>
                            <p className="text-sm text-muted-foreground">{integration.description}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(integration.status)}`}>
                                {integration.status}
                              </span>
                              <span className="text-xs text-muted-foreground">Last sync: {integration.lastSync}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {integration.status === "Connected" ? (
                            <Button size="sm" variant="outline">
                              <Settings className="h-4 w-4 mr-2" />
                              Configure
                            </Button>
                          ) : (
                            <Button size="sm">
                              <Key className="h-4 w-4 mr-2" />
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card id="security">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage security preferences and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Session Timeout</Label>
                      <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Password Policy</Label>
                      <p className="text-sm text-muted-foreground">Enforce strong password requirements</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
