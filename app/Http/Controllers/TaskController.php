<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskUpdate;
use App\Models\Inspection;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::with('assignedTo', 'inspection')->latest()->paginate(10);
        return view('tasks.index', compact('tasks'));
    }

    public function show(Task $task)
    {
        $task->load('updates.user');
        return view('tasks.show', compact('task'));
    }

    public function edit(Task $task)
    {
        return view('tasks.edit', compact('task'));
    }

    public function update(Request $request, Task $task)
    {
        $request->validate([
            'status' => 'required|in:open,in-progress,resolved',
            'notes' => 'nullable|string',
        ]);

        $task->update(['status' => $request->status]);

        TaskUpdate::create([
            'task_id' => $task->id,
            'updated_by' => auth()->id(),
            'status' => $request->status,
            'notes' => $request->notes,
        ]);

        return redirect()->route('tasks.show', $task)->with('success', 'Task updated.');
    }
}

