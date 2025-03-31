'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, TooltipProps } from 'recharts';

const data = [
    {
        name: 'Jan',
        total: 1800,
    },
    {
        name: 'Feb',
        total: 2200,
    },
    {
        name: 'Mar',
        total: 2800,
    },
    {
        name: 'Apr',
        total: 2400,
    },
    {
        name: 'May',
        total: 2900,
    },
    {
        name: 'Jun',
        total: 3200,
    },
    {
        name: 'Jul',
        total: 3800,
    },
    {
        name: 'Aug',
        total: 4200,
    },
    {
        name: 'Sep',
        total: 4600,
    },
    {
        name: 'Oct',
        total: 4200,
    },
    {
        name: 'Nov',
        total: 4800,
    },
    {
        name: 'Dec',
        total: 5200,
    },
];

export function Overview() {
    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="bg-card rounded-lg border p-3">
                    <div className="text-muted-foreground text-sm font-medium">New Customers</div>
                    <div className="text-2xl font-bold">+573</div>
                </div>
                <div className="bg-card rounded-lg border p-3">
                    <div className="text-muted-foreground text-sm font-medium">Sales</div>
                    <div className="text-2xl font-bold">+985</div>
                </div>
                <div className="bg-card rounded-lg border p-3">
                    <div className="text-muted-foreground text-sm font-medium">Active Sessions</div>
                    <div className="text-2xl font-bold">+2,432</div>
                </div>
                <div className="bg-card rounded-lg border p-3">
                    <div className="text-muted-foreground text-sm font-medium">Conversion Rate</div>
                    <div className="text-2xl font-bold">3.2%</div>
                </div>
            </div>
            <div className="bg-card rounded-lg border">
                <div className="p-4">
                    <div className="text-sm font-medium">Revenue Overview</div>
                </div>
                <div className="p-4 pt-0">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="name" className="text-muted-foreground text-xs" tickLine={false} axisLine={false} />
                            <YAxis
                                className="text-muted-foreground text-xs"
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                content={({ active, payload }: TooltipProps<number, string>) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-background rounded-lg border p-2 shadow-sm">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-muted-foreground text-[0.70rem] uppercase">Month</span>
                                                        <span className="text-muted-foreground font-bold">{payload[0]?.payload?.name}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-muted-foreground text-[0.70rem] uppercase">Revenue</span>
                                                        <span className="font-bold">${payload[0]?.value}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar dataKey="total" radius={[4, 4, 0, 0]} className="fill-primary" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
