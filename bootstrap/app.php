<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance']);

        // Register middleware aliases correctly
       $middleware->alias(['auth.role' => \App\Http\Middleware\RedirectIfAuthenticated::class]);


        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withCommands([
        __DIR__ . '/../app/Console/Commands',
        \App\Console\Commands\CreateAdminUser::class,
        \App\Console\Commands\CountAdmins::class,
    ])
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
