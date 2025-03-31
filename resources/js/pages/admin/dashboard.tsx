import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CreditCard, DollarSign, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecentActivity } from "@/components/demo/recent"
import { Overview } from '@/components/demo/overview';

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
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                            <CreditCard className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+2,350</div>
                            <p className="text-muted-foreground text-xs">+180.1% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                            <Users className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+12,234</div>
                            <p className="text-muted-foreground text-xs">+19% from last month</p>
                        </CardContent>
                    </Card>
                </div>
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Dashboard</CardTitle>
                        <CardDescription>View your analytics and recent activity.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Tabs defaultValue="overview" className="h-full">
                            <div className="flex items-center px-4">
                                <TabsList>
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="activity">Activity</TabsTrigger>
                                </TabsList>
                            </div>
                            <TabsContent value="overview" className="p-4 pt-2">
                                <Overview />
                            </TabsContent>
                            <TabsContent value="activity" className="p-4 pt-2">
                                <RecentActivity />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
