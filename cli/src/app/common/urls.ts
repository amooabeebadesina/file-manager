let BASE_URL = 'http://localhost:8000/api';

export const URLS = {
    REGISTER: BASE_URL + '/register',
    LOGIN: BASE_URL + '/login',
    FILE_COUNT: BASE_URL + '/get-files-count',
    FILE_UPLOAD: BASE_URL + '/name-upload',
    GET_FILES: BASE_URL + '/get-files',
    MOVE_TO_TRASH: BASE_URL + '/delete-files',
    RESTORE_FILES: BASE_URL + '/restore-files'
};
