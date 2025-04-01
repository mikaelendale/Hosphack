'use client';

import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Box, Rainbow, Ruler, Ghost, TimerIcon, Type } from 'lucide-react';
import { useState } from 'react';

// Define the customization options
const customizationOptions = [
    {
        id: 'colors',
        title: 'Colors',
        icon: <TimerIcon />,
    },
    {
        id: 'shadows',
        title: 'Shadows and Blurs',
        icon: <Box />,
    }, 
];

export default function Checkbox5() {
    // Initialize with colors and emojis selected as shown in the image
    const [selectedOptions, setSelectedOptions] = useState({
        colors: true,
        shadows: false,
        typography: false,
        spacing: false,
        emojis: true,
        theming: false,
    });

    // Toggle selection for an option
    const toggleOption = (id: string) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [id]: !prev[id as keyof typeof prev],
        }));
    };

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            {customizationOptions.map((option) => {
                const isSelected = selectedOptions[option.id as keyof typeof selectedOptions];

                return (
                    <Card
                        key={option.id}
                        className={`relative cursor-pointer gap-3 p-4 ring-1 transition-all ${
                            isSelected ? 'border-primary ring-primary' : 'ring-transparent'
                        }`}
                        onClick={() => toggleOption(option.id)}
                    >
                        <div className="absolute top-3 right-3">
                            <Checkbox
                                id={`checkbox-${option.id}`}
                                checked={isSelected}
                                onCheckedChange={() => toggleOption(option.id)}
                                className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground rounded-full"
                            />
                        </div>
                        <div className={`${isSelected ? 'text-primary' : ''}`}>{option.icon}</div>
                        <h3 className={`text-sm font-medium ${isSelected ? 'text-primary' : ''}`}>{option.title}</h3>
                    </Card>
                );
            })}
        </div>
    );
}
