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
Route::post('/teams', [TeamController::class, 'store'])->name('teams.store');
Route::get('/teams/{team}', [TeamController::class, 'show'])->name('teams.show');

// project routs
Route::get('/teams/{team}/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');
Route::post('/teams/{team}/projects', [ProjectController::class, 'store'])->name('projects.store');

// card routes
Route::post('cards/move', function (\Illuminate\Http\Request $request) {
    $request->validate([
        'card_id' => 'required|exists:cards,id',
        'new_board_id' => 'required|exists:boards,id',
    ]);

    $card = \App\Models\Card::find($request->card_id);
    $card->board_id = $request->new_board_id;
    $card->save();
})->name('cards.move');

// invite routes
// Route::get('invite/accept/{token}', [\App\Http\Controllers\TeamInvitationController::class, 'accept'])->name('invite.accept');
// Route::post('teams/{team}/invite', [\App\Http\Controllers\TeamInvitationController::class, 'invite'])->name('teams.invite')->middleware('auth');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
