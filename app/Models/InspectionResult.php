<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionResult extends Model
{
    use HasFactory;

    public function inspection()
    {
        return $this->belongsTo(Inspection::class);
    }

    public function item()
    {
        return $this->belongsTo(InspectionItem::class);
    }

    public function media()
    {
        return $this->hasMany(Media::class);
    }
}
