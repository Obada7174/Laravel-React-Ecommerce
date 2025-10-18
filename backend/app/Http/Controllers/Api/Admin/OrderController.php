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
     */
    public function index()
    {
        $orders = Order::with(['orderItems.product'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return OrderResource::collection($orders);
    }
}
