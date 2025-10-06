<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// teams route
Route::get('/teams', [TeamController::class, 'index'])->name('teams.index');
Route::get('/teams/{team}', [TeamController::class, 'show'])->name('teams.show');

// project routs
Route::get('/teams/{team}/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');

// invite routes
// Route::get('invite/accept/{token}', [\App\Http\Controllers\TeamInvitationController::class, 'accept'])->name('invite.accept');
// Route::post('teams/{team}/invite', [\App\Http\Controllers\TeamInvitationController::class, 'invite'])->name('teams.invite')->middleware('auth');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
