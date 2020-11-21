export const CONSTANTS = {
    BASE_URL: 'http://localhost:8000',
    LOGIN_URL: 'http://localhost:8000/login',
    LOGOUT_URL: 'http://localhost:8000/logout',
    GROUP: {
        BASE_URL: 'http://localhost:8000/group',
        CREATE: 'http://localhost:8000/group/create',
        INPUT: 'Test Group for sample',
        INPUT2: 'Test Group for sample with permission',
        EDIT_INPUT: 'Updated Group',
    },
    ARTIST: {
        BASE_URL: 'http://localhost:8000/artist',
        CREATE: 'http://localhost:8000/artist/create',
        INPUT: 'Test artist for sample',
        INPUT2: 'Test artist for sample with permission',
        EDIT_INPUT: 'Updated artist',
    },
    SONGS: {
        BASE_URL: 'http://localhost:8000/song',
        CREATE: 'http://localhost:8000/song/create',
        INPUT: 'Test song for sample',
        INPUT2: 'Test song for sample 2',
        INPUT_DURATION: 180,
        EDIT_INPUT: 'Updated Song',
    },
    SONGRATING: {
        BASE_URL: 'http://localhost:8000/songrating',
        CREATE: 'http://localhost:8000/songrating/create',
        INPUT: '2',
        INPUT2: '3',
        EDIT_INPUT: '5',
    },
    USER: {
        BASE_URL: 'http://localhost:8000/user',
        CREATE: 'http://localhost:8000/user/create',
        INVALID_USER: 'test @123',
        EXISTING_USER: 'dev',
        INPUT_USER: 'test@123',
        INPUT_EMAIL: 'test@123.com',
        INPUT2: 'Test User for sample with groups',
        EDIT_INPUT: 'Updated@123',
        EDIT_EMAIL: 'updated@123.com',
        
    },
    POST: {
        BASE_URL: 'http://localhost:8000/post',
        CREATE: 'http://localhost:8000/post/create',
        INPUT_TITLE: 'Test Post',
        INPUT_TITLE2: 'Test Post 2',
        EDIT_INPUT: 'Update post'
    },
    WAIT_FOR_ELEMENT_VISIBLE_TIMEOUT: 15000,
    PAUSE_TIMEOUT: 10000,
    USER_CREDENTIALS: {
        RIGHT: {
            USERNAME: 'dev',
            PASSWORD: 'dev'
        },
        WRONG: {
            USERNAME: 'dev1',
            PASSWORD: 'dev1'
        }
    },
}
