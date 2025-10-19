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
     * Supports filters: ?category=id&min_price=&max_price=&search=term
     */
    public function index(Request $request)
    {
        $query = Product::with('category');

        // Filter by category ID (accepts both 'category' as ID or slug for backward compatibility)
        if ($request->filled('category')) {
            $categoryValue = $request->category;

            // Check if it's numeric (ID) or string (slug)
            if (is_numeric($categoryValue)) {
                $query->where('category_id', $categoryValue);
            } else {
                $category = Category::where('slug', $categoryValue)->first();
                if ($category) {
                    $query->where('category_id', $category->id);
                }
            }
        }

        // Filter by minimum price (supports both min_price and minPrice)
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        } elseif ($request->filled('minPrice')) {
            $query->where('price', '>=', $request->minPrice);
        }

        // Filter by maximum price (supports both max_price and maxPrice)
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        } elseif ($request->filled('maxPrice')) {
            $query->where('price', '<=', $request->maxPrice);
        }

        // Search by name or description (supports both 'search' and 'q')
        $searchTerm = $request->input('search') ?? $request->input('q');
        if ($searchTerm) {
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
