<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Store a newly created order from checkout.
     * Validates items, user info, calculates total, creates order and order items.
     */
    public function store(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'user_name' => 'required|string|max:255',
            'user_email' => 'required|email|max:255',
            'address' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            // Calculate total from products
            $total = 0;
            $orderItemsData = [];

            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);

                // Check stock availability
                if ($product->stock < $item['quantity']) {
                    return response()->json([
                        'message' => "Insufficient stock for product: {$product->name}",
                    ], 400);
                }

                $itemTotal = $product->price * $item['quantity'];
                $total += $itemTotal;

                $orderItemsData[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                ];

                // Update product stock
                $product->decrement('stock', $item['quantity']);
            }

            // Create the order
            $order = Order::create([
                'user_name' => $request->user_name,
                'user_email' => $request->user_email,
                'address' => $request->address,
                'total' => $total,
            ]);

            // Create order items
            foreach ($orderItemsData as $itemData) {
                $order->orderItems()->create($itemData);
            }

            DB::commit();

            // Load relationships and return
            $order->load('orderItems.product');

            return response()->json([
                'message' => 'Order created successfully',
                'order' => new OrderResource($order)
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to create order',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
