<?php

use Illuminate\Support\Facades\Auth;

if (! function_exists('rolePrefix')) {
    function rolePrefix()
    {
        $user = Auth::user();
        if (! $user) {
            abort(403);
        }

        return $user->role; // 'admin', 'agent', or 'user'
    }
}

if (! function_exists('requireRole')) {
    function requireRole(string $role)
    {
        if (Auth::user()->role !== $role) {
            abort(403);
        }

    }
}
