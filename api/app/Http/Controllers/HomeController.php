<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }
    public function test(){
        $dist = Storage::disk('gcs');
        //$dist->put('kibb/img/kinn.txt',file_get_contents(public_path('kibb.txt')));
        /*$put =$dist->put(
            'kibb/img/picture.png',
            File::get(public_path('img/picturs.png'),false));*/
        $get = $dist->url('kibb/img/picture.png');

        return '<img src="'.$get.'"/>';

    }
}
