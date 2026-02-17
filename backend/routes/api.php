<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskController;

Route::prefix('v1')->group(function () {
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::put('/tasks/{id}', action: [TaskController::class, 'update']);
    Route::delete('/tasks/{id}', action: [TaskController::class, 'destroy']);
});
