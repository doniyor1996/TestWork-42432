<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class RegisterController extends Controller
{
    public function register(Request $request){

        try {

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6|confirmed',
            ], [
                'confirmed' => 'Пароль и подтверждение не совпадают',
                'unique' => 'Пользователь с такой почтой уже зарегистрирован'
            ]);

            if($validator->fails()){
                return response()->json([
                    'error' => $validator->errors()->all()
                ]);
            }

            $request['password'] = Hash::make($request['password']);
            $request['remember_token'] = Str::random(10);
            User::create($request->toArray());

            return response()->json([
                'status_code' => 200,
                'message' => 'Вы успешно зарегистрировались',
            ]);


        }catch(Exception $error){
            return response()->json([
                'status_code' => 500,
                'message' => 'Ошибка при регистрации',
                'error' => $error,
            ]);
        }
    }
}
