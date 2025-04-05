<?php

namespace App\Http\Controllers;

use App\Models\Inspection;
use App\Models\InspectionTemplate;
use App\Models\InspectionResult;
use Illuminate\Http\Request;

class InspectionController extends Controller
{
    public function index()
    {
        $inspections = Inspection::with('template', 'user')->latest()->paginate(10);
        return view('inspections.index', compact('inspections'));
    }

    public function create()
    {
        $templates = InspectionTemplate::with('items')->get();
        return view('inspections.create', compact('templates'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'template_id' => 'required|exists:inspection_templates,id',
            'area' => 'required|string',
            'items' => 'required|array',
        ]);

        $inspection = Inspection::create([
            'user_id' => auth()->id(),
            'inspection_template_id' => $request->template_id,
            'area' => $request->area,
            'status' => 'pending',
            'comments' => $request->comments,
        ]);

        foreach ($request->items as $itemId => $result) {
            InspectionResult::create([
                'inspection_id' => $inspection->id,
                'item_id' => $itemId,
                'result' => $result['status'],
                'notes' => $result['notes'] ?? null,
            ]);
        }

        return redirect()->route('inspections.index')->with('success', 'Inspection submitted.');
    }

    public function show(Inspection $inspection)
    {
        $inspection->load('results.item', 'template', 'user');
        return view('inspections.show', compact('inspection'));
    }
}
