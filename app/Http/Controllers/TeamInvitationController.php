<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

class TeamInvitationController extends Controller
{
    public function invite(Request $request, Team $team)
    {
        $request->validate([
            'email' => 'required|email',
            'role' => 'required|in:admin,member',
        ]);

        $invite = $team->invitations()->create([
            'email' => $request->email,
            'role' => $request->role,
            'token' => \Illuminate\Support\Str::uuid(),
            'expires_at' => now()->addDays(7),
        ]);

        // Send the invitation email
        \Illuminate\Support\Facades\Mail::to($request->email)->send(new \App\Mail\TeamInviteMail($invite));

        return response()->json(['message' => 'Invitation sent successfully.']);
    }

    public function accept($token)
    {
        // TODO: if no user exists, redirect to registration with token for creating new account and accepting invite after registration
        $invitation = \App\Models\TeamInvitation::where('token', $token)
            ->whereNull('accepted_at')
            ->where('expires_at', '>', now())
            ->firstOrFail();

        $user = request()->user();

        if ($user->email !== $invitation->email) {
            return response()->json(['message' => 'This invitation is not for your email address.'], 403);
        }

        $invitation->team->members()->attach($user->id, ['role' => $invitation->role]);
        $invitation->update(['accepted_at' => now()]);

        return response()->json(['message' => 'You have successfully joined the team.']);
    }
}
