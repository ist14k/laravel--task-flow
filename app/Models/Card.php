<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    protected $fillable = ['board_id', 'title', 'description', 'position', 'assigned_to'];

    public function board()
    {
        return $this->belongsTo(Board::class);
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
