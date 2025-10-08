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

// board routes
Route::post('/projects/{project}/boards', function (\Illuminate\Http\Request $request, \App\Models\Project $project) {
    $request->validate([
        'name' => 'required|string|max:255|min:3',
        'description' => 'nullable|string|max:1000',
        'position' => 'nullable|integer',
    ]);

    $board = \App\Models\Board::create([
        'name' => $request->name,
        'project_id' => $project->id,
    ]);
})->name('boards.store');

// card routes
Route::post('/cards/new', function (\Illuminate\Http\Request $request) {
    $request->validate([
        'title' => 'required|string|max:255|min:3',
        'description' => 'nullable|string|max:1000',
        'board_id' => 'required|exists:boards,id',
    ]);

    $card = \App\Models\Card::create([
        'title' => $request->title,
        'description' => $request->description,
        'board_id' => $request->board_id,
    ]);

    return $card->toArray();

})->name('cards.store');

Route::post('/cards/move', function (\Illuminate\Http\Request $request) {
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
