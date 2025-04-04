<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RedirectIfAuthenticated
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (! $request->user()) {
            return redirect('/login');
        }

        $userRole = $request->user()->role;

        // Redirect to the dashboard if the user's role matches the allowed roles
        if (in_array($userRole, $roles)) {
            $dashboardUrl = match ($userRole) {
                'admin' => '/admin/dashboard',
                'agent' => '/agent/dashboard',
                'user' => '/user/dashboard',
                default => '/login'
            };

            return redirect($dashboardUrl);
        }

        return $next($request);
    }
}
