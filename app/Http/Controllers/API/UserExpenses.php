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
        /*            filterData: {
                startDate: new Date(),
                startDateUsed: 0,
                endDate: new Date(),
                endDateUsed: 0,
                rangeValue: [],
                rangeUsed: 0,
                expenseValue: '',
                expenseUsed: 0,
                catValue: -1,
                catUsed: 0,
                filter: 0
            } */
            $catFilter=[0,0];
            $startDateFilter=[0,''];
            $endDateFilter=[0,''];
            $rangeFilter=[0,[]];
            $expenseFilter=[0,0];   
        if (request('filter')) {
            $expenses = $user->withCategories();
            if(request('catUsed'))
            {
                $catFilter=[1,request('catValue')];
                //$expenses = $user->Filter(request('catValue'));
            }
            if(request('startDateUsed'))
            {
                $startDateFilter=[1,request('startDate')];
                //$expenses = $user->Filter(request('catValue'));
            }
            if(request('endDateUsed'))
            {
                $endDateFilter=[1,request('endDate')];
                //$expenses = $user->Filter(request('catValue'));
            }
            if(request('rangeUsed'))
            {
                $rangeFilter=[1,request('rangeValueStart'),request('rangeValueEnd')];
                //$expenses = $user->Filter(request('catValue'));
            }

            if(request('expenseUsed'))
            {
                $expenseFilter=[1,request('expenseValue')];
                //$expenses = $user->Filter(request('catValue'));
            }
            if (request('column')) {
                $column = request('column');
                $type = request('upOrDown');
                $sort=[1,$column,$type];
            }
            else{
                $sort=[0,0,0];
            }
            $expenses = $user->Filter($catFilter, $startDateFilter,$endDateFilter,$rangeFilter,$expenseFilter,$sort);
            

        } else {
            if (request('column')) {
                $column = request('column');
                $type = request('upOrDown');
                $expenses = $user->withCategoriesAndSort($column, $type);
            } 
            else {
                $expenses = $user->withCategories();
            }
        }
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
            'created_at' => 'required',
        ]);
        $expense = new Expenses([
            'amount' => $request->amount,
            'user_id' => $request->user_id,
            'categories_id' => $request->categories_id,
            'expenseType' => $request->expenseType,
            'created_at' => $request->created_at,

        ]);
        $expense->save();
        $user = User::find($request->user_id);
        $expenses = $user->withCategories();
        return response()->json(['expenses' => $expenses,
            'message' => 'Successfully created user!', 'success' => '1',
        ], 201);
    }

    public function editTransaction(Request $request)
    {
        $request->validate([
            'amount' => 'required',
            'user_id' => 'required',
            'categories_id' => 'required',
            'expenseType' => 'required',
            'created_at' => 'required',
        ]);
        $expense = Expenses::find($request->id);
        $expense->update([
            'amount' => $request->amount,
            'user_id' => $request->user_id,
            'categories_id' => $request->categories_id,
            'expenseType' => $request->expenseType,
            'created_at' => $request->created_at,

        ]);
        //$expense->update();
        $user = User::find($request->user_id);
        $expenses = $user->withCategories();
        return response()->json(['expenses' => $expenses,
            'message' => 'Successfully created user!', 'success' => '1',
        ], 201);
    }

    public function deleteTransaction(Request $request)
    {
        $expense = Expenses::find($request->id);
        $user = User::find($expense->user_id);
        $expense->delete();
        $expenses = $user->withCategories();
        return response()->json(['expenses' => $expenses,
            'message' => 'Successfully created user!', 'success' => '1',
        ], 201);

    }
}
