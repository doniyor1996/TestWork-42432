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

Route::middleware('auth:sanctum')
    ->group(function () {
        Route::get('/logout','App\Http\Controllers\UserController@logout')
            ->name('logout.api');
        Route::get('/user','App\Http\Controllers\UserController@userdata')
            ->name('user.api');
    });

Route::post('/register','App\Http\Controllers\Auth\RegisterController@register')
    ->name('register.api');
Route::post('/login','App\Http\Controllers\Auth\LoginController@login')
    ->name('login.api');
