'use client';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

import { Card } from '@/components/ui/card'; 
import { Headset, User } from 'lucide-react';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: 'user' | 'agent'; // Add role to the form type
};
export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'user', // Default role
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

     const options = [
         {
             id: 'user',
             title: 'User',
             description: 'Allow users to access the system',
             icon: <User className="h-6 w-6" />,
         },
         {
             id: 'agent',
             title: 'Agent',
             description: 'Allow agents to handle customer requests',
             icon: <Headset className="h-6 w-6" />,
         },
     ];

     const selectOption = (id: 'user' | 'agent') => {
         setData('role', id);
     };

    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {options.map((option) => {
                        const isSelected = data.role === option.id;

                        return (
                            <Card
                                key={option.id}
                                className={`relative cursor-pointer p-6 transition-all ${
                                    isSelected ? 'ring-primary border-primary ring-2' : 'ring-border hover:ring-primary/50 ring-1 hover:ring-2'
                                }`}
                                onClick={() => selectOption(option.id as 'user' | 'agent')}
                            >
                                <div className="absolute top-4 right-4">
                                    <div
                                        className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                                            isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                                        }`}
                                    >
                                        {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className={`${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>{option.icon}</div>
                                    <div>
                                        <h3 className={`text-base font-medium ${isSelected ? 'text-primary' : ''}`}>{option.title}</h3>
                                        <p className="text-muted-foreground mt-1 text-sm">{option.description}</p>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create account
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Already have an account?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
