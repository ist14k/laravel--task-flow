<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamInvitation extends Model
{
    protected $fillable = [
        'team_id',
        'email',
        'role',
        'token',
        'expires_at',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
