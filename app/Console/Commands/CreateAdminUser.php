<?php
namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CreateAdminUser extends Command
{
    protected $signature = 'admin:create';

    protected $description = 'Interactively create a new admin user';

    public function handle()
    {
        $this->showWelcomeMessage();

        $name = $this->askValid('➜ Enter the admin\'s full name', 'name', ['required', 'string', 'max:255']);
        $email = $this->askValid('➜ Enter the admin\'s email address', 'email', ['required', 'email', 'unique:users']);
        $password = $this->askPasswordValid();

        if ($this->confirmCreation($name, $email, 'admin')) {
            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make($password),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]);
            
            $this->showSuccessMessage($user);
            return 0;
        }

        $this->error('Admin creation cancelled.');
        return 1;
    }

    protected function showWelcomeMessage()
    {
        $this->line('<fg=blue>    ADMIN USER CREATION WIZARD         </>');
        $this->newLine();
    }

    protected function askValid($question, $field, $rules)
    {
        $value = $this->ask($question);

        $validator = Validator::make(
            [$field => $value],
            [$field => $rules]
        );

        if ($validator->fails()) {
            $this->error($validator->errors()->first($field));
            return $this->askValid($question, $field, $rules);
        }

        return $value;
    }

    protected function askPasswordValid()
    {
        $password = $this->secret('<fg=cyan>➜</> Enter a password (min 8 characters)');
        $confirm  = $this->secret('<fg=cyan>➜</> Confirm the password');

        if ($password !== $confirm) {
            $this->error('Passwords do not match!');
            return $this->askPasswordValid();
        }

        if (strlen($password) < 8) {
            $this->error('Password must be at least 8 characters');
            return $this->askPasswordValid();
        }

        return $password;
    }

    protected function confirmCreation($name, $email, $role)
    {
        $this->table(
            ['Field', 'Value'],
            [
                ['Name', $name],
                ['Email', $email],
                ['Role', $role],
            ]
        );

        return $this->confirm('<fg=yellow>➜</> Do you want to create this admin user?');
    }

    protected function createUser($name, $email, $password, $role)
    {
        return User::create([
            'name'              => $name,
            'email'             => $email,
            'password'          => Hash::make($password),
            'role'              => $role,
            'email_verified_at' => now(),
        ]);
    }

    protected function showSuccessMessage($user)
    {
        $this->newLine();
        $this->line('<fg=green>✔</> <fg=green;options=bold>Admin user created successfully!</>');
        $this->newLine();

        $this->table(
            ['Field', 'Value'],
            [
                ['ID', $user->id],
                ['Name', $user->name],
                ['Email', $user->email],
                ['Role', $user->role],
                ['Created', $user->created_at->diffForHumans()],
            ]
        );

        $this->newLine();
        $this->line('<fg=blue>=============================================</>');
    }
}
