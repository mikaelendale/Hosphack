<?php

use GuzzleHttp\Middleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/docs', function () {
    return Inertia::render('docs/page');
})->name('DocumentationPage');

// Auto-redirect
Route::get('/dashboard', function () {
    return redirect('/' . rolePrefix() . '/dashboard');
})
    ->name('dashboard')
    ->middleware(['auth', 'verified']);

// Protected routes (all roles)
Route::prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        requireRole('admin');
        return Inertia::render('admin/dashboard');
    });
});

Route::prefix('agent')->group(function () {
    Route::get('/dashboard', function () {
        requireRole('agent');
        return Inertia::render('agent/dashboard');
    });
});

Route::prefix('user')->group(function () {
    Route::get('/dashboard', function () {
        requireRole('user');
        return Inertia::render('user/dashboard');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
