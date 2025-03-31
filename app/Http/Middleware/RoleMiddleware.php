<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role): Response
    {
        // Check if the user is authenticated
        if (! Auth::check()) {
            return redirect('/');
        }

        // Check if the user has the correct role
        if (Auth::user()->role !== $role) {
            return redirect('/');
        }

        return $next($request);
    }
}
