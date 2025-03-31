<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AgentController extends Controller
{
    public function dashboard()
    {
        return inertia('agent/dashboard');
    }
}
