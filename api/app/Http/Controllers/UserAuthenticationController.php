<?php
/**
 * Created by PhpStorm.
 * User: kibb
 * Date: 5/23/18
 * Time: 9:58 AM
 */
namespace App\Http\Controllers;
use Auth;
use App\User;
use Illuminate\Http\Request;

class UserAuthenticationController extends Controller{

    /**
     * User Login | Authentication
     * Access token expires in 15days
     * access_token and user details
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     *
     */
    public function userLogin(Request $request){
        if (Auth::attempt(['email'=>$request->email,'password'=>$request->password])){
            $user = Auth::user();
            $access_token = $user->createToken('kibb-bezop')->accessToken;
            $this->setStatusCode(200);
            return $this->respondWithSuccess('Access Granted', ['access_token'=>$access_token,'user'=>$user]);
        }else{
            return $this->respondWithError('Access Denied');
        }
    }

    /**
     * Register a new user
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function userRegister(Request $request){
        $this->validate($request,[
            'name' =>'required',
            'email' => 'required|unique:users',
            'password' => 'required',
            'username' => 'required|unique:users'
        ]);
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->username = $request->username;
        $user->password = bcrypt($request->password);
        if ($user->save()){
            if( auth()->attempt(['email'=>$request->email,'password'=>$request->password])) {
                $access_token = auth()->user()->createToken('kibb-bezop')->accessToken;
                $this->setStatusCode(200);
                return $this->respondWithSuccess('Account Created', ['user' => $user, 'access_token' => $access_token]);
            }
            return $this->respondWithError('Account Created but could not login',$user);
        }

        return $this->respondWithError('Account could not be created ');

    }

    /**
     * Refresh user access token
     *
     */
    public function refreshUserToken(){
        $user = auth()->user();


    }

    /**
     * Logout authenticated user
     * revoke user access token
     */
    public function logoutUser(){
        $user = auth()->user();
        $access_token = $user->token();
        if ($access_token->revoke()){
            return $this->respondWithSuccess('User Logged Successfully ');
        }else{
            return $this->respondWithError('Could not Log user');
        }
    }

    /**
     * User Account Details
     * @return \Illuminate\Http\JsonResponse
     */
    public function userDetails(){
        return $this->respondWithSuccess('User Account Details',auth()->user());
    }
}