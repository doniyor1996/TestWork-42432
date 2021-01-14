<?php

namespace App\Http\Controllers;

use App\Models\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RouteController extends Controller
{
    public function index(Request $request)
    {
        $start = $request->query('start');
        $end = $request->query('limit');

        return response()->json([
            'status_code' => 200,
            'limit' => "$start, $end",
            'routes' => Route::where('userID', $request->user()->id)
                ->skip($start)
                ->take($end)
                ->get(),
            'totalItems' => Route::where('userID', $request->user()->id)->count(),
            'message' => 'Маршруты',
        ]);
    }

    public function add(Request $request)
    {
        try {
            $this->validateRoute($request);

            $name = request('name');

            Route::create([
                'userID' => $request->user()->id,
                'name' => $name
            ]);

            return response()->json([
                'status_code' => 200,
                'message' => 'Маршрут создан',
            ]);
        } catch (\Exception $error) {
            return response()->json([
                'status_code' => 500,
                'message' => 'Ошибка при выполнении',
                'error' => $error->getMessage(),
            ]);
        }
    }

    public function delete(Request $request)
    {
        try {
            Route::destroy($request->id);

            return response()->json([
                'status_code' => 200,
                'id' => $request->id,
                'message' => 'Маршрут удалён',
            ]);

        } catch (\Exception $error) {
            return response()->json([
                'status_code' => 500,
                'message' => 'Ошибка при выполнении',
                'error' => $error->getMessage(),
            ]);
        }
    }

    public function update(Request $request)
    {
        try {

            $this->validateRoute($request);

            $route = Route::find($request->id);

            if (!$route) {
                return response()->json([
                    'status_code' => 404,
                    'error' => 'Маршрут не найден',
                ]);
            } elseif ($route->userID !== $request->user()->id) {
                return response()->json([
                    'status_code' => 403,
                    'error' => 'Не достаточно прав',
                ]);
            }

            $route->name = request('name');

            $route->save();

            return response()->json([
                'status_code' => 200,
                'id' => $request->id,
                'message' => 'Маршрут сохранён',
            ]);

        } catch (\Exception $error) {
            return response()->json([
                'status_code' => 500,
                'message' => 'Ошибка при выполнении',
                'error' => $error->getMessage(),
            ]);
        }
    }

    private function validateRoute($request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ], [
            'required' => 'Имя маршрута обязательно для заполнения'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->all()
            ]);
        }
    }
}
