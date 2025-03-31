<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // Create an admin user
        DB::table('users')->insert([
            // Admin
            ['name'             => 'Admin User',
                'email'             => 'admin@example.com',
                'password'          => bcrypt('password'),
                'role'              => 'admin',
                'email_verified_at' => now(),
            ],
            // User

            ['name'             => 'Regular User',
                'email'             => 'user@example.com',
                'password'          => bcrypt('password'),
                'role'              => 'user',
                'email_verified_at' => now(),
            ],
            // Agent
            ['name'             => 'agent',
                'email'             => 'agent@example.com',
                'password'          => bcrypt('password'),
                'role'              => 'agent',
                'email_verified_at' => now(),
            ],
        ]);
    }
}
