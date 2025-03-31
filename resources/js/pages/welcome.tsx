 
import ContentSection from '@/components/blocks/content';
import CallToAction from '@/components/blocks/cta';
import StatsSection from '@/components/blocks/facts';
import Features from '@/components/blocks/features';
import FooterSection from '@/components/blocks/footer';
import LogoCloud from '@/components/blocks/logo-cloud'; 
import { DynamicIslandNavbar } from '@/components/blocks/navigation-new';
import HeroGeometric from '@/components/kokonutui/hero-geometric';
import { ThemeProvider } from '@/components/theme-provider';
 
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() { 
    return (
        <>
            <ThemeProvider>
                <DynamicIslandNavbar/>
                <HeroGeometric />  
                <StatsSection/>
                <Features />
                <ContentSection/> 
                <CallToAction/>
                <FooterSection/>
            </ThemeProvider>
        </>
    );
}
