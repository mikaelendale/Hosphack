import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Activity, CreditCard, DollarSign, Download, PieChart, Users } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$45,231.89</div>
                            <p className="text-muted-foreground text-xs">+20.1% from last month</p>
                            <div className="mt-4 h-[60px]">
                                <LineChartComponent />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                            <Users className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+2,350</div>
                            <p className="text-muted-foreground text-xs">+180.1% from last month</p>
                            <div className="mt-4">
                                <Progress value={78} className="h-2" />
                                <div className="text-muted-foreground mt-1 flex text-xs">
                                    <span className="flex-1">Last 7 days</span>
                                    <span>78%</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sales</CardTitle>
                            <CreditCard className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+12,234</div>
                            <p className="text-muted-foreground text-xs">+19% from last month</p>
                            <div className="mt-4 h-[60px]">
                                <BarChartComponent />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Tabs defaultValue="overview" className="flex-1">
                    <div className="flex items-center justify-between">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="analytics">Analytics</TabsTrigger>
                            <TabsTrigger value="reports">Reports</TabsTrigger>
                            <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        </TabsList>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                            </Button>
                        </div>
                    </div>
                    <TabsContent value="overview" className="mt-4 flex-1">
                        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                            <Card className="col-span-2 row-span-2">
                                <CardHeader>
                                    <CardTitle>Performance Overview</CardTitle>
                                    <CardDescription>Monthly revenue and user acquisition metrics</CardDescription>
                                </CardHeader>
                                <CardContent className="px-2">
                                    <div className="h-[300px]">
                                        <AreaChartComponent />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Sales</CardTitle>
                                    <CardDescription>You made 265 sales this month</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentSales.map((sale) => (
                                            <div key={sale.name} className="flex items-center">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarImage src={sale.avatar} alt="Avatar" />
                                                    <AvatarFallback>{sale.initials}</AvatarFallback>
                                                </Avatar>
                                                <div className="ml-4 space-y-1">
                                                    <p className="text-sm leading-none font-medium">{sale.name}</p>
                                                    <p className="text-muted-foreground text-sm">{sale.email}</p>
                                                </div>
                                                <div className="ml-auto font-medium">{sale.amount}</div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Traffic Sources</CardTitle>
                                    <CardDescription>Top referrers for this month</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[160px]">
                                        <PieChartComponent />
                                    </div>
                                    <div className="mt-4 space-y-2 text-sm">
                                        <div className="flex items-center">
                                            <div className="bg-primary mr-2 h-2 w-2 rounded-full"></div>
                                            <span className="flex-1">Direct</span>
                                            <span>45%</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
                                            <span className="flex-1">Social</span>
                                            <span>30%</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="mr-2 h-2 w-2 rounded-full bg-amber-500"></div>
                                            <span className="flex-1">Email</span>
                                            <span>25%</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="col-span-2">
                                <CardHeader>
                                    <CardTitle>Recent Orders</CardTitle>
                                    <CardDescription>You have 12 pending orders to process</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Order ID</TableHead>
                                                <TableHead>Customer</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Amount</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {recentOrders.map((order) => (
                                                <TableRow key={order.id}>
                                                    <TableCell className="font-medium">{order.id}</TableCell>
                                                    <TableCell>{order.customer}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                order.status === 'Completed'
                                                                    ? 'default'
                                                                    : order.status === 'Processing'
                                                                      ? 'secondary'
                                                                      : 'outline'
                                                            }
                                                        >
                                                            {order.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">{order.amount}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline">Previous</Button>
                                    <Button>Next</Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Activity</CardTitle>
                                    <CardDescription>Recent system activity</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {activities.map((activity, index) => (
                                            <div key={index} className="flex items-start gap-4">
                                                <div className="relative mt-0.5">
                                                    <Activity className="text-muted-foreground h-5 w-5" />
                                                    {index !== activities.length - 1 && (
                                                        <div className="bg-border absolute top-6 bottom-0 left-2.5 w-px" />
                                                    )}
                                                </div>
                                                <div className="grid gap-1">
                                                    <p className="text-sm leading-none font-medium">{activity.title}</p>
                                                    <p className="text-muted-foreground text-sm">{activity.description}</p>
                                                    <p className="text-muted-foreground text-xs">{activity.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="analytics" className="h-full flex-1">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>Analytics</CardTitle>
                                <CardDescription>Detailed metrics and performance analytics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm">Analytics content will appear here</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="reports" className="h-full flex-1">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>Reports</CardTitle>
                                <CardDescription>View and download system reports</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm">Reports content will appear here</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="notifications" className="h-full flex-1">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>Notifications</CardTitle>
                                <CardDescription>System notifications and alerts</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm">Notifications content will appear here</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}

// Sample data
const recentSales = [
    {
        name: 'Cameron Williamson',
        email: 'cameron.wil@example.com',
        amount: '+$1,999.00',
        avatar: '/placeholder.svg?height=32&width=32',
        initials: 'CW',
    },
    {
        name: 'Shirley Cosgrove',
        email: 'shirley.cos@example.com',
        amount: '+$1,599.00',
        avatar: '/placeholder.svg?height=32&width=32',
        initials: 'SC',
    },
    {
        name: 'Olivia Martin',
        email: 'olivia.martin@example.com',
        amount: '+$1,299.00',
        avatar: '/placeholder.svg?height=32&width=32',
        initials: 'OM',
    },
    {
        name: 'Jackson Lee',
        email: 'jackson.lee@example.com',
        amount: '+$399.00',
        avatar: '/placeholder.svg?height=32&width=32',
        initials: 'JL',
    },
];

const recentOrders = [
    {
        id: 'ORD-7352',
        customer: 'Olivia Martin',
        status: 'Completed',
        amount: '$1,999.00',
    },
    {
        id: 'ORD-7353',
        customer: 'Ava Johnson',
        status: 'Processing',
        amount: '$399.00',
    },
    {
        id: 'ORD-7354',
        customer: 'Michael Williams',
        status: 'Pending',
        amount: '$99.00',
    },
    {
        id: 'ORD-7355',
        customer: 'Emma Smith',
        status: 'Completed',
        amount: '$2,999.00',
    },
    {
        id: 'ORD-7356',
        customer: 'Liam Wilson',
        status: 'Processing',
        amount: '$699.00',
    },
];

const activities = [
    {
        title: 'New user registered',
        description: 'User John Doe created a new account',
        time: '2 hours ago',
    },
    {
        title: 'Payment processed',
        description: 'Payment of $1,999.00 was processed successfully',
        time: '5 hours ago',
    },
    {
        title: 'New order placed',
        description: 'Order #ORD-7352 was placed by Olivia Martin',
        time: '1 day ago',
    },
    {
        title: 'System update',
        description: 'System was updated to version 2.1.0',
        time: '2 days ago',
    },
];

// Chart components (simplified for this example)
function LineChartComponent() {
    return (
        <div className="flex h-full w-full items-end justify-between gap-2">
            {[40, 30, 70, 50, 60, 80, 65].map((height, i) => (
                <div key={i} className="h-full w-full" style={{ height: `${height}%` }}>
                    <div className="bg-primary/20 h-full w-full rounded-sm">
                        <div className="bg-primary h-full w-full rounded-sm" style={{ height: `${height}%` }}></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function BarChartComponent() {
    return (
        <div className="flex h-full w-full items-end justify-between gap-2">
            {[40, 30, 70, 50, 60, 80, 65].map((height, i) => (
                <div key={i} className="h-full w-full" style={{ height: `${height}%` }}>
                    <div className="bg-primary h-full w-full rounded-sm"></div>
                </div>
            ))}
        </div>
    );
}

function AreaChartComponent() {
    return (
        <div className="flex h-full w-full flex-col justify-end">
            <div className="flex h-full w-full items-end justify-between gap-2">
                {[40, 30, 70, 50, 60, 80, 65, 75, 50, 70, 60, 75].map((height, i) => (
                    <div key={i} className="h-full w-full" style={{ height: `${height}%` }}>
                        <div className="bg-primary/20 h-full w-full rounded-sm">
                            <div className="bg-primary h-full w-full rounded-sm" style={{ height: `${height}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-muted-foreground mt-2 flex justify-between text-xs">
                <div>Jan</div>
                <div>Feb</div>
                <div>Mar</div>
                <div>Apr</div>
                <div>May</div>
                <div>Jun</div>
                <div>Jul</div>
                <div>Aug</div>
                <div>Sep</div>
                <div>Oct</div>
                <div>Nov</div>
                <div>Dec</div>
            </div>
        </div>
    );
}

function PieChartComponent() {
    return (
        <div className="flex h-full items-center justify-center">
            <PieChart className="text-muted-foreground h-32 w-32" />
        </div>
    );
}
