<?php
namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Gate::define('admin-access', function ($user) {
            return $user->role === 'admin';
        });

        Gate::define('agent-access', function ($user) {
            return $user->role === 'agent';
        });

        Gate::define('user-access', function ($user) {
            return $user->role === 'user';
        });
    }
}
