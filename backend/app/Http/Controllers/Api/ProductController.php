<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a paginated listing of products with filters.
     * Supports filters: ?category=slug&minPrice=&maxPrice=&q=search
     */
    public function index(Request $request)
    {
        $query = Product::with('category');

        // Filter by category slug
        if ($request->has('category')) {
            $category = Category::where('slug', $request->category)->first();
            if ($category) {
                $query->where('category_id', $category->id);
            }
        }

        // Filter by minimum price
        if ($request->has('minPrice')) {
            $query->where('price', '>=', $request->minPrice);
        }

        // Filter by maximum price
        if ($request->has('maxPrice')) {
            $query->where('price', '<=', $request->maxPrice);
        }

        // Search by name or description
        if ($request->has('q')) {
            $searchTerm = $request->q;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        $products = $query->paginate(12);
        return ProductResource::collection($products);
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
