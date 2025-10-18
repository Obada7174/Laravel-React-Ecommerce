<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of all products.
     */
    public function index()
    {
        $products = Product::with('category')->paginate(15);
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
            'image' => 'required|string',
            'stock' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $product = Product::create([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
            'price' => $request->price,
            'image' => $request->image,
            'stock' => $request->stock,
        ]);

        $product->load('category');

        return response()->json([
            'message' => 'Product created successfully',
            'product' => new ProductResource($product)
        ], 201);
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
            'image' => 'sometimes|required|string',
            'stock' => 'sometimes|required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $updateData = $request->only(['category_id', 'name', 'description', 'price', 'image', 'stock']);

        // Update slug if name is changed
        if (isset($updateData['name'])) {
            $updateData['slug'] = Str::slug($updateData['name']);
        }

        $product->update($updateData);
        $product->load('category');

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => new ProductResource($product)
        ], 200);
    }

    /**
     * Remove the specified product.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ], 200);
    }
}
