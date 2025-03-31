<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AgentController;
use GuzzleHttp\Middleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/docs', function () {
    return Inertia::render('docs/page');
})->name('DocumentationPage');

Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])
    ->name('admin.dashboard')
    ->middleware(['auth', 'verified', 'role:admin']);
Route::get('/agent/dashboard', [AgentController::class, 'dashboard'])
    ->name('agent.dashboard')
    ->middleware(['auth', 'verified', 'role:agent']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [UserController::class, 'dashboard'])->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
