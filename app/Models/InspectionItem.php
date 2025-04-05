<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionItem extends Model
{
    use HasFactory;

    public function template()
    {
        return $this->belongsTo(InspectionTemplate::class);
    }
}
