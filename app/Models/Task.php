<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    public function inspection()
    {
        return $this->belongsTo(Inspection::class);
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function updates()
    {
        return $this->hasMany(TaskUpdate::class);
    }
}
