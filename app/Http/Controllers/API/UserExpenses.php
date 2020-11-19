<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use App\Models\Expenses;
use App\Models\User;
use Illuminate\Http\Request;

class UserExpenses extends Controller
{
    public function userExpenses(Request $request)
    {
        $user = User::find(request('user_id'));
        //$expenses=$user->expenses()->with('categories')->get();
        $expenses = $user->withCategories();
        return response()->json(['success' => '1', 'expenses' => $expenses], 200);

    }

    public function getCategories(Request $request)
    {
        $categories = Categories::all();

        return response()->json(['success' => '1', 'categories' => $categories], 200);

    }

    public function addTransaction(Request $request)
    {
        $request->validate([
            'amount' => 'required',
            'user_id' => 'required',
            'categories_id' => 'required',
            'expenseType' => 'required',
        ]);
        $expense = new Expenses([
            'amount' => $request->amount,
            'user_id' => $request->user_id,
            'categories_id' => $request->categories_id,
            'expenseType' => $request->expenseType,

        ]);
        $expense->save();
        return response()->json([
            'message' => 'Successfully created user!', 'success' => '1',
        ], 201);
    }

    public function deleteTransaction(Request $request)
    {
        $expense = Expenses::find($request->id);
        $expense->delete();
        return response()->json([
            'message' => 'Successfully created user!', 'success' => '1',
        ], 201);

    }
}
