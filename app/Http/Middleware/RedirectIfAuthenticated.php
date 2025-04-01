<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RedirectIfAuthenticated
{
    public function handle(Request $request, Closure $next)
    {
        if (! $request->user()) {
            return redirect('/login');
        }

        // Determine dashboard URL based on user role
        $dashboardUrl = match ($request->user()->role) {
            'admin' => '/admin/dashboard',
            'agent' => '/agent/dashboard',
            'user' => '/user/dashboard',
            default => '/login'
        };

        return collect(['admin', 'agent', 'user'])->contains(fn($prefix) => str_starts_with($request->path(), $prefix))
        ? redirect($dashboardUrl)
        : $next($request);
    }
}
