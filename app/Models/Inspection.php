<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inspection extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function template()
    {
        return $this->belongsTo(InspectionTemplate::class, 'inspection_template_id');
    }

    public function results()
    {
        return $this->hasMany(InspectionResult::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
