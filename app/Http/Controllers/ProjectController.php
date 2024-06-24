<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource; // Import TaskResource
use Illuminate\Support\Facades\Auth; // Import Auth
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("status")) {
            $query->where("status", request("status"));
        }

        $projects = $query->orderBy($sortField, $sortDirection)->paginate(10);

        return inertia("project/index", [
            "projects" => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            'Success' => session('Success')
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("project/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();

        // Extract image from data
        $image = $data['image'] ?? null;
        print_r($data['image']) ;
        // Set created_by and updated_by
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        // Process image if present
        if ($image) {
            $data['image_path'] = $image->store('projects/'.Str::random(), 'public');
        }

        // Create project
        Project::create($data);

        // Redirect with success message
        return redirect()->route('project.index')->with('Success', 'Project was created');
    }


    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10);


        return inertia("project/show", [
            "project" => new ProjectResource($project),
            "tasks"=>TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editiAng the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('project/edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $name = $project->name;
        $data = $request->validated();
        $image =$data['image']??null;
        // Set updated_by field
        $data['updated_by'] = Auth::id();

        if ($image) {
            if ($project->image_path) {
                Storage::disk('public')->delete($project->image_path);
            }
            // Store new image
            $data['image_path'] = $image->store('project/'. Str::random(), 'public');
        }

        $project->update($data);

        return redirect()->route('project.index')
            ->with('Success', "Project \"$name\" was updated");
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
    $name = $project->name;
    $project->delete();
    return redirect()->route('project.index')
        ->with('Success', "Project \"$name\" was deleted");
    }
}
