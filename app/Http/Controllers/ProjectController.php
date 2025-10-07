<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Team $team)
    {
        $request->validate([
            'name' => 'required|string|max:255|min:3',
            'description' => 'nullable|string|max:1000',
            'is_private' => 'boolean',
        ]);

        $team->projects()->create([
            'name' => $request->name,
            'description' => $request->description,
            'is_private' => $request->is_private ?? false,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team, Project $project)
    {
        $project->load('boards', 'boards.cards');

        // dd($project->toArray());

        return Inertia::render('projects/show', [
            'project' => $project,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
