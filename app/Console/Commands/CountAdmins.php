<?php
namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CountAdmins extends Command
{
    protected $signature = 'admin:count';

    protected $description = 'Count and display all admin users in the system';

    public function handle()
    {
        $admins = User::where('role', 'admin')->get();
 

        $this->line("<fg=green>➜ Total Admin Users:</> <fg=yellow>{$admins->count()}</>");
        $this->newLine();

        if ($admins->count() > 0) {
            $this->line('<fg=cyan>➜ Admin User List:</>');

            $this->table(
                ['ID', 'Name', 'Email', 'Created At'],
                $admins->map(function ($admin) {
                    return [
                        $admin->id,
                        $admin->name,
                        $admin->email,
                        $admin->created_at->format('Y-m-d H:i:s'),
                    ];
                })->toArray()
            );
        }
 
        return 0;
    }
}
