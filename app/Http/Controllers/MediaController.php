<?php

namespace App\Http\Controllers;

use App\Models\Media;
use App\Models\InspectionResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'inspection_result_id' => 'required|exists:inspection_results,id',
            'media' => 'required|file|mimes:jpg,jpeg,png,mp4,mov|max:10240',
        ]);

        $file = $request->file('media');
        $path = $file->store('media', 'public');

        Media::create([
            'inspection_result_id' => $request->inspection_result_id,
            'file_path' => $path,
            'file_type' => $file->getMimeType() === 'video/mp4' ? 'video' : 'image',
        ]);

        return back()->with('success', 'Media uploaded.');
    }

    public function destroy(Media $media)
    {
        Storage::disk('public')->delete($media->file_path);
        $media->delete();

        return back()->with('success', 'Media deleted.');
    }
}
