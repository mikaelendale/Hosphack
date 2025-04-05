<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionTemplate extends Model
{
    use HasFactory;

    public function items()
    {
        return $this->hasMany(InspectionItem::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
