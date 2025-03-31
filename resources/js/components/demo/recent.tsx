
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Activity } from 'lucide-react';

export function RecentActivity() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <div className="text-sm font-medium">Today</div>
                <div className="grid gap-4">
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <p className="text-sm leading-none font-medium">John Doe</p>
                            <p className="text-muted-foreground text-sm">Purchased Pro Plan ($24.99)</p>
                        </div>
                        <div className="text-muted-foreground text-sm">2 hours ago</div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                        <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-full">
                            <Activity className="text-primary h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                            <p className="text-sm leading-none font-medium">System Update</p>
                            <p className="text-muted-foreground text-sm">New version deployed successfully</p>
                        </div>
                        <div className="text-muted-foreground text-sm">5 hours ago</div>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <div className="text-sm font-medium">Yesterday</div>
                <div className="grid gap-4">
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                            <AvatarFallback>SD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <p className="text-sm leading-none font-medium">Sarah Davis</p>
                            <p className="text-muted-foreground text-sm">Created a new account</p>
                        </div>
                        <div className="text-muted-foreground text-sm">Yesterday, 16:32</div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                            <AvatarFallback>MJ</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <p className="text-sm leading-none font-medium">Michael Johnson</p>
                            <p className="text-muted-foreground text-sm">Submitted a support ticket</p>
                        </div>
                        <div className="text-muted-foreground text-sm">Yesterday, 09:14</div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                            <AvatarFallback>EW</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <p className="text-sm leading-none font-medium">Emily Wilson</p>
                            <p className="text-muted-foreground text-sm">Upgraded to Business Plan ($49.99/mo)</p>
                        </div>
                        <div className="text-muted-foreground text-sm">Yesterday, 08:45</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

