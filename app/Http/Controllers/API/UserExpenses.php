<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserExpenses extends Controller
{
    public function userExpenses(Request $request)
    {
        $user=User::find(request('user_id'));
        //$expenses=$user->expenses()->with('categories')->get();
        $expenses=$user->withCategories();
        return response()->json(['success'=> '1', 'expenses'=>$expenses], 200);
       
    } 
}
