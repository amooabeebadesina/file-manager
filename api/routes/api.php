<?php

use Illuminate\Http\Request;

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
Route::group(['middleware'=>'auth:api'], function (){
    Route::post('name-upload','FileController@uploadFile')->name('t-upload');
    Route::get('get-files-count','FileController@getFileCount');
    Route::post('delete-files','FileController@deleteFile');
    Route::get('get-files','FileController@getAllFiles');
    Route::post('logout','UserAuthenticationController@logoutUser');
    Route::get('user-details','UserAuthenticationController@userDetails');
    Route::post('restore-files','FileController@restoreFile');
});
Route::post('login','UserAuthenticationController@userLogin');
Route::post('register','UserAuthenticationController@userRegister');
//Route::post('logout','UserAuthenticationController@userLogout');
Route::post('refresh','UserAuthenticationController@refresh');


