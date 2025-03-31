<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleRedirectMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $user = Auth::user();

            // Redirect based on role
            return match ($user->role) {
                'admin' => redirect()->route('admin.dashboard'),
                'user' => redirect()->route('user.dashboard'),
                default => redirect('/'),
            };
        }

        return $next($request);
    }
}
