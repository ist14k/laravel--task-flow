<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\Project;
use App\Models\Team;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory(50)->create([
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
            'two_factor_confirmed_at' => null,
        ]);

        Team::factory(5)->create()->each(function ($team) use ($users) {
            $team->members()->attach(
                $users->random(rand(2, 5))->pluck('id')->toArray(),
                ['role' => 'member']
            );

            $team->members()->attach($team->owner_id, ['role' => 'owner']);

            Project::factory(rand(3, 7))->create(['team_id' => $team->id])->each(function ($project) {
                Board::factory(rand(2, 10))->create(['project_id' => $project->id])->each(function ($board) {
                    \App\Models\Card::factory(rand(5, 10))->create([
                        'board_id' => $board->id,
                    ]);
                });
            });
        });

        $testUser = User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        Team::factory(3)->create(['owner_id' => $testUser->id])->each(function ($team) use ($testUser, $users) {
            $team->members()->attach($testUser->id, ['role' => 'owner']);

            $team->members()->attach(
                $users->random(rand(2, 5))->pluck('id')->toArray(),
                ['role' => 'member']
            );

            Project::factory(rand(3, 7))->create(['team_id' => $team->id])->each(function ($project) {
                Board::factory(3)->create(['project_id' => $project->id])->each(function ($board) {
                    // create 5-15 cards for each board
                    \App\Models\Card::factory(rand(2, 5))->create([
                        'board_id' => $board->id,
                    ]);
                });
            });
        });
    }
}
