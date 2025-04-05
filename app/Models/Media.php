<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;

    public function inspectionResult()
    {
        return $this->belongsTo(InspectionResult::class);
    }
}
