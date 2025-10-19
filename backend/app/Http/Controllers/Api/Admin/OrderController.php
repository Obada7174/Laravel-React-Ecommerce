<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of all orders with their items.
     * Supports: ?search=term&sort=created_at&order=desc&per_page=15
     */
    public function index(Request $request)
    {
        $query = Order::with(['orderItems.product']);

        // Search by customer name or email
        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('user_name', 'like', "%{$searchTerm}%")
                  ->orWhere('user_email', 'like', "%{$searchTerm}%");
            });
        }

        // Sorting
        $sortField = $request->input('sort', 'created_at');
        $sortOrder = $request->input('order', 'desc');

        // Validate sort fields
        $allowedSortFields = ['created_at', 'total', 'user_name'];
        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortOrder);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $perPage = $request->input('per_page', 15);
        $orders = $query->paginate($perPage);

        return OrderResource::collection($orders);
    }
}
