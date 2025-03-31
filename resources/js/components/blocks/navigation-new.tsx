'use client';

import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import AppLogoIcon from '../app-logo-icon';
import { ModeToggle } from './mode-toggle';

interface NavItem {
    title: string;
    href: string;
    description?: string;
    children?: {
        title: string;
        href: string;
        description: string;
    }[];
}

const navItems: NavItem[] = [
    {
        title: 'Features',
        href: '/features',
        children: [
            {
                title: 'Analytics',
                href: '/features/analytics',
                description: 'Get detailed insights into your performance',
            },
            {
                title: 'Automation',
                href: '/features/automation',
                description: 'Automate your workflow with powerful tools',
            },
            {
                title: 'Integrations',
                href: '/features/integrations',
                description: 'Connect with your favorite apps and services',
            },
        ],
    },
    {
        title: 'Solutions',
        href: '/solutions',
        children: [
            {
                title: 'For Teams',
                href: '/solutions/teams',
                description: 'Collaborate effectively with your team',
            },
            {
                title: 'For Enterprises',
                href: '/solutions/enterprise',
                description: 'Scale your business with enterprise-grade solutions',
            },
            {
                title: 'For Startups',
                href: '/solutions/startups',
                description: 'Get started quickly with affordable plans',
            },
        ],
    },
    {
        title: 'Pricing',
        href: '/pricing',
    },
    {
        title: 'Resources',
        href: '/resources',
        children: [
            {
                title: 'Documentation',
                href: '/resources/docs',
                description: 'Learn how to use our platform',
            },
            {
                title: 'Blog',
                href: '/resources/blog',
                description: 'Read our latest articles and updates',
            },
            {
                title: 'Community',
                href: '/resources/community',
                description: 'Join our growing community',
            },
        ],
    },
];

export function DynamicIslandNavbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const { auth } = usePage<SharedData>().props;
    // Prevent scrolling when mobile menu is open
    React.useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    return (
        <>
            <header className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex justify-center p-4">
                <motion.div
                    className={cn(
                        'pointer-events-auto w-full max-w-6xl rounded-full backdrop-blur-md',
                        'border shadow-lg',
                        'bg-white/90 dark:bg-black/80',
                        'transition-all duration-300',
                    )}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                    }}
                >
                    <div className="container flex h-14 items-center justify-between px-4">
                        {/* Logo */}
                        <a href="/" className="flex items-center gap-2 transition-colors">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full">
                                &nbsp; &nbsp; <AppLogoIcon className="size-8 fill-current text-black dark:text-white" />
                            </div>
                            <span className="text-lg font-bold">Island</span>
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    {navItems.map((item) => (
                                        <NavigationMenuItem key={item.title}>
                                            {item.children ? (
                                                <>
                                                    <NavigationMenuTrigger className="h-9 rounded-full px-3">{item.title}</NavigationMenuTrigger>
                                                    <NavigationMenuContent>
                                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                                                            {item.children.map((child) => (
                                                                <li key={child.title} className="row-span-1">
                                                                    <NavigationMenuLink asChild>
                                                                        <a
                                                                            href={child.href}
                                                                            className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-4 no-underline outline-none select-none focus:shadow-md"
                                                                        >
                                                                            <div className="mt-4 mb-2 text-sm font-medium">{child.title}</div>
                                                                            <p className="text-muted-foreground text-sm leading-tight">
                                                                                {child.description}
                                                                            </p>
                                                                        </a>
                                                                    </NavigationMenuLink>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </NavigationMenuContent>
                                                </>
                                            ) : (
                                                <a href={item.href}>
                                                    <NavigationMenuLink className="flex h-9 items-center justify-center rounded-full px-3">
                                                        {item.title}
                                                    </NavigationMenuLink>
                                                </a>
                                            )}
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>

                        {/* Right Side - Auth Buttons & Mobile Menu */}
                        <div className="flex items-center gap-2">
                            <ModeToggle />
                            <div className="hidden items-center gap-2 md:flex">
                                {auth.user ? (
                                    <Button
                                        size="sm"
                                        className="rounded-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                                        asChild
                                    >
                                        <a href={route('dashboard')}>Dashboard</a>
                                    </Button>
                                ) : (
                                    <>
                                        <Button variant="ghost" size="sm" className="rounded-full" asChild>
                                            <a href="/login">Login</a>
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="rounded-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                                            asChild
                                        >
                                            <a href="/register">Get Started</a>
                                        </Button>
                                    </>
                                )}
                                {/* <Button variant="ghost" size="sm" className="rounded-full" asChild>
                                    <a href="/login">Login</a>
                                </Button>

                                <Button
                                    size="sm"
                                    className="rounded-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                                    asChild
                                >
                                    <a href="/get-started">Get Started</a>
                                </Button> */}
                            </div>

                            {/* Mobile Menu Button */}
                            <Button variant="ghost" size="icon" className="rounded-full md:hidden" onClick={() => setMobileMenuOpen(true)}>
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </header>

            {/* Mobile Menu Modal */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-black/20 backdrop-blur-md dark:bg-black/50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            className="bg-background absolute inset-x-4 top-4 rounded-3xl border shadow-xl"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <div className="flex items-center justify-between border-b p-4">
                                <a href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full">
                                        &nbsp; &nbsp; <AppLogoIcon className="size-8 fill-current text-black dark:text-white" />
                                    </div>
                                    <span className="text-lg font-bold">Island</span>
                                </a>
                                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setMobileMenuOpen(false)}>
                                    <X className="h-5 w-5" />
                                    <span className="sr-only">Close menu</span>
                                </Button>
                            </div>

                            <div className="max-h-[calc(100vh-8rem)] overflow-y-auto p-4">
                                <nav className="flex flex-col gap-4">
                                    {navItems.map((item) => (
                                        <div key={item.title} className="border-b pb-4">
                                            {item.children ? (
                                                <details className="group">
                                                    <summary className="flex cursor-pointer items-center justify-between font-medium">
                                                        {item.title}
                                                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                                                    </summary>
                                                    <ul className="mt-3 space-y-3 pl-4">
                                                        {item.children.map((child) => (
                                                            <li key={child.title}>
                                                                <a href={child.href} className="block" onClick={() => setMobileMenuOpen(false)}>
                                                                    <div className="font-medium">{child.title}</div>
                                                                    <div className="text-muted-foreground text-sm">{child.description}</div>
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </details>
                                            ) : (
                                                <a href={item.href} className="block font-medium" onClick={() => setMobileMenuOpen(false)}>
                                                    {item.title}
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </nav>
                            </div>

                            <div className="border-t p-4">
                                {auth.user ? (
                                    <div className="grid">
                                        <Button
                                            size="lg"
                                            className="w-full rounded-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                                            asChild
                                        >
                                            <a href={route('dashboard')} onClick={() => setMobileMenuOpen(false)}>
                                                Dashboard
                                            </a>
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button variant="outline" className="rounded-full" asChild>
                                            <a href="/login" onClick={() => setMobileMenuOpen(false)}>
                                                Login
                                            </a>
                                        </Button>
                                        <Button
                                            className="rounded-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                                            asChild
                                        >
                                            <a href="/register" onClick={() => setMobileMenuOpen(false)}>
                                                Get Started
                                            </a>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
