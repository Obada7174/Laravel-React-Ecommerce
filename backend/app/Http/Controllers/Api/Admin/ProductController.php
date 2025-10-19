<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of all products with search and filters.
     * Supports: ?search=term&category_id=1&sort=name&order=asc
     */
    public function index(Request $request)
    {
        $query = Product::with('category');

        // Search by name or description
        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        // Filter by category ID
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Sorting
        $sortField = $request->input('sort', 'created_at');
        $sortOrder = $request->input('order', 'desc');

        // Validate sort fields
        $allowedSortFields = ['name', 'price', 'stock', 'created_at'];
        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortOrder);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $perPage = $request->input('per_page', 15);
        $products = $query->paginate($perPage);

        return ProductResource::collection($products);
    }

    /**
     * Store a newly created product.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image' => 'required|image|mimes:jpeg,jpg,png,gif,webp|max:5120', // 5MB max
            'stock' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Handle image upload
        $imagePath = $this->handleImageUpload($request->file('image'));

        $product = Product::create([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
            'price' => $request->price,
            'image' => $imagePath,
            'stock' => $request->stock,
        ]);

        $product->load('category');

        return response()->json([
            'message' => 'Product created successfully',
            'product' => new ProductResource($product)
        ], 201, [], JSON_UNESCAPED_SLASHES);
    }

    /**
     * Display the specified product.
     */
    public function show(string $id)
    {
        $product = Product::with('category')->findOrFail($id);
        return new ProductResource($product);
    }

    /**
     * Update the specified product.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'category_id' => 'sometimes|required|exists:categories,id',
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric|min:0',
            'image' => 'sometimes|nullable|image|mimes:jpeg,jpg,png,gif,webp|max:5120',
            'stock' => 'sometimes|required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $updateData = $request->only(['category_id', 'name', 'description', 'price', 'stock']);

        // Handle image upload if provided
        if ($request->hasFile('image')) {
            // Delete old image
            $this->deleteImage($product->image);
            // Upload new image
            $updateData['image'] = $this->handleImageUpload($request->file('image'));
        }

        // Update slug if name is changed
        if (isset($updateData['name'])) {
            $updateData['slug'] = Str::slug($updateData['name']);
        }

        $product->update($updateData);
        $product->load('category');

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => new ProductResource($product)
        ], 200, [], JSON_UNESCAPED_SLASHES);
    }

    /**
     * Remove the specified product.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);

        // Delete product image
        $this->deleteImage($product->image);

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ], 200);
    }

    /**
     * Handle image upload and return the storage path.
     */
    private function handleImageUpload($image)
    {
        if (!$image) {
            return null;
        }

        // Generate unique filename
        $filename = time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();

        // Store in public/products directory
        $path = $image->storeAs('products', $filename, 'public');

        // Return the storage path
        return '/storage/' . $path;
    }

    /**
     * Delete image from storage.
     */
    private function deleteImage($imagePath)
    {
        if (!$imagePath) {
            return;
        }

        // Extract path from /storage/ URL
        $path = str_replace('/storage/', '', $imagePath);

        // Delete file if it exists
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}
