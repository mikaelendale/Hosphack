import { NavFooter } from '@/components/blocks/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, Headset, LayoutGrid, Settings, User2 } from 'lucide-react';
import AppLogo from './app-logo';

type NavItem = {
    title: string;
    href: string;
    icon: React.ComponentType;
    roles?: ('admin' | 'agent' | 'user')[];
};

const useNavItems = () => {
    const { user } = usePage().props.auth;

    const allNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: `/${user.role}/dashboard`,
            icon: LayoutGrid,
        },
        {
            title: 'Users',
            href: '/admin/users',
            icon: User2,
            roles: ['admin'],
        },
        {
            title: 'Tickets',
            href: '/agent/tickets',
            icon: Headset,
            roles: ['agent'],
        },
        // {
        //     title: 'Settings',
        //     href: '/settings',
        //     icon: Settings,
        // },
    ];

    return allNavItems.filter((item) => !item.roles || item.roles.includes(user.role));
};

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const mainNavItems = useNavItems();

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
