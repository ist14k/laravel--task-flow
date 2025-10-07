<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    use HasFactory;

    protected $fillable = ['project_id', 'name', 'description', 'position'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function cards()
    {
        return $this->hasMany(Card::class);
    }
}
