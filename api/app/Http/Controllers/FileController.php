<?php

namespace App\Http\Controllers;

use App\CloudFile;
use Illuminate\Contracts\Filesystem\Cloud;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{

    /**
     * Make a directory for a user with the username
     * @param $name | name of the directory
     * @param null $username | username of the account name
     * @return bool
     */
    public function makeFolder($name, $username= null){
        $disk = Storage::disk('gcs');
        $path = $username ? $name.'/'.$username : $name;
        return $disk->makeDirectory($path);
    }

    /**
     * Upload User files to google cloud bucket
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadFile(Request $request){
        //filename is required
        $user = auth()->user();
        $disk = Storage::disk('gcs');
        if ($request->hasFile('file0')){
            $files = $request->all();
            $dir = 'kibb/bezop/'.$user->username;
            $results = [];
            foreach ($files as $item){
                $name = $item->getClientOriginalName();
                $put =$disk->put($dir.'/'.$name,file_get_contents($item->getRealPath()),'public');
                if ($put){
                    $c_file = new CloudFile();
                    $c_file->name = $name;
                    $c_file->user_id = $user->id;
                    $c_file->active = true;
                    $c_file->file_path = $disk->url($dir.'/'.$name);
                    $c_file->save();
                }
            }
            return $this->respondWithSuccess('File Uploaded');
        }
        return $this->respondWithError('No file Uploaded');
    }


    /**
     * @param null $id
     * @return array
     */
    public function getFile($id = null){
        $disk = Storage::disk('gcs');
        return $disk->allDirectories();
    }

    /**
     * get the count of files for a user
     * @return \Illuminate\Http\JsonResponse
     */
    public function getFileCount(){
        $user = auth()->user();
        $cloud = CloudFile::where('user_id', $user->id);
        $active = $cloud->where('active',true)->count();
        $trash = $cloud->where('active',true)->onlyTrashed()->count();

        return $this->respondWithSuccess('Files details',[
            'active'=>$active,'trash'=>$trash]);
    }

    /**
     * get user uploaded files
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllFiles(){
        $user = auth()->user();
        $cloud = CloudFile::where('user_id', $user->id);
        $active = $cloud->where('active',true)->get();
        $trash = $cloud->where('active',true)->onlyTrashed()->get();

        return $this->respondWithSuccess('Files details',[
            'active'=>$active,'trash'=>$trash]);
    }

    /**
     * delete user file(s)
     * id is int|array
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteFile(Request $request){
        $this->validate($request,[
            'id' => 'required'
        ]);
        $id = $request->id;
        if (is_array($id)){
            return $this->respondWithSuccess('Files Deleted',CloudFile::destroy($id));
        }else{
            return $this->respondWithSuccess('file delete', CloudFile::find($id)->delete());
        }
    }

    /**
     * drop a directory from bucket
     * @param null $dir
     */
    public function dropDir($dir = null){
        $user = auth()->user();

       return dd($this->makeFolder('archived',$user->username));
    }
    public function restoreFile(Request $request){
        $this->validate($request,[
            'id' => 'required'
        ]);
        $id  = $request->id;

        if (is_array($id)){
            foreach ($id as $item){
                $file =CloudFile::where('id',$item);
                 $file->exists() && $file->first()->trashed() ? : $file->restore() ;
            }
        }else{
            $file = CloudFile::where('id',$id);
            $file->exists() && $file->first()->trashed()? : $file->restore();
        }

        return $this->respondWithSuccess('File(s) Restore successfully');
    }
}
