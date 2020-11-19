<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('/login', [App\Http\Controllers\API\AuthController::class, 'login']);
    Route::post('/signup', [App\Http\Controllers\API\AuthController::class, 'signup']);
    
    
    //Route::post('login', 'AuthController@login');
    //Route::post('signup', 'AuthController@signup');
  
    Route::group([
      'middleware' => 'auth:api'
    ], function() {

        Route::get('/logout', [App\Http\Controllers\API\AuthController::class, 'logout']);
        Route::get('/user', [App\Http\Controllers\API\AuthController::class, 'user']);
        Route::get('/userExpenses', [App\Http\Controllers\API\UserExpenses::class, 'UserExpenses']);
        Route::get('/GetCategories', [App\Http\Controllers\API\UserExpenses::class, 'getCategories']);
        Route::post('/addTransaction', [App\Http\Controllers\API\UserExpenses::class, 'addTransaction']);  
        Route::delete('/deleteTransaction', [App\Http\Controllers\API\UserExpenses::class, 'deleteTransaction']);  
        //Route::get('logout', 'AuthController@logout');
        //Route::get('user', 'AuthController@user');
    });
});