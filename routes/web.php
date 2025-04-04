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


    Route::get('/users', function () {
        return Inertia::render('users/index');
    })->name('UsersIndex');
  
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
