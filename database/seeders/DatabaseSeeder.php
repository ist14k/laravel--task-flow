<?php

namespace Database\Seeders;

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
        // create 10 users
        $users = User::factory(10)->create();

        // create 5 teams with 2-5 random users and 3-7 projects each
        $teams = Team::factory(5)->create()->each(function ($team) use ($users) {
            // attach 2-5 random users to each team
            $team->members()->attach(
                $users->random(rand(2, 5))->pluck('id')->toArray(),
                ['role' => 'member']
            );

            // update the owner's role in the pivot table
            $team->members()->attach($team->owner_id, ['role' => 'owner']);

            // create 3-7 projects for each team
            Project::factory(rand(3, 7))->create(['team_id' => $team->id]);
        });

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
    }
}
