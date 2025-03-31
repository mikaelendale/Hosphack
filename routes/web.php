<?php

use App\Http\Middleware\RedirectBasedOnRole;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/docs', function () {
    return Inertia::render('docs/page');
})->name('DocumentationPage');

Route::get('/dashboard', function () {
    // This route is just a placeholder; the middleware will handle redirection.
})->middleware([RedirectBasedOnRole::class])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('admin/dashboard');
    })->name('admin.dashboard');

    Route::get('/user', function () {
        return Inertia::render('user/dashboard');
    })->name('user.dashboard');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
