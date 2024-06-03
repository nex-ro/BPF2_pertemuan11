<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\Task; // Added import for the Task model
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Uncomment the line below if you want to seed users
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Deri',
            'email' => 'Deri@pcr.com',
            'password' => bcrypt('123.321A'),
            'email_verified_at' => now(),
        ]);

        // Now, let's seed projects with tasks
        Project::factory()
            ->count(30)
            ->has(Task::factory()->count(30))
            ->create();
    }
}
