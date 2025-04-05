<?php

namespace App\Http\Controllers;

use App\Models\InspectionTemplate;
use App\Models\InspectionItem;
use Illuminate\Http\Request;

class InspectionTemplateController extends Controller
{
    public function index()
    {
        $templates = InspectionTemplate::with('items')->get();
        return view('templates.index', compact('templates'));
    }

    public function create()
    {
        return view('templates.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
        ]);

        $template = InspectionTemplate::create([
            'title' => $request->title,
            'description' => $request->description,
            'created_by' => auth()->id(),
        ]);

        foreach ($request->items as $item) {
            InspectionItem::create([
                'template_id' => $template->id,
                'item_name' => $item['name'],
                'is_required' => $item['required'] ?? true,
                'order' => $item['order'] ?? 0,
            ]);
        }

        return redirect()->route('templates.index')->with('success', 'Template created.');
    }

    public function show(InspectionTemplate $template)
    {
        return view('templates.show', compact('template'));
    }

    public function destroy(InspectionTemplate $template)
    {
        $template->delete();
        return back()->with('success', 'Template deleted.');
    }
}

