<?php

use GuzzleHttp\Middleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\{
    RoleController,
    InspectionTemplateController,
    InspectionController,
    TaskController,
    MediaController
};

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::resource('roles', RoleController::class)->except(['show']);
    Route::resource('templates', InspectionTemplateController::class);
    Route::resource('inspections', InspectionController::class);
    Route::resource('tasks', TaskController::class)->except(['create', 'store', 'destroy']);
    Route::post('/media', [MediaController::class, 'store'])->name('media.store');
    Route::delete('/media/{media}', [MediaController::class, 'destroy'])->name('media.destroy');
});

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

