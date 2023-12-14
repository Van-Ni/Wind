const initialState = {
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            // Xử lý đăng nhập thành công, cập nhật trạng thái loggedIn và user
            return {
                ...state,
                status: action.payload.status,
                token: action.payload.token,
                message: action.payload.message,
                userId: action.payload.userId
            };
        case 'REGISTER':
            // Xử lý đăng ký thành công, cập nhật trạng thái loggedIn và user
            return {
                ...state,
                user: action.payload,
                message: action.payload.message,
            };
        case 'LOGOUT':
            return {
                ...state,
                loggedIn: action.payload.loggedIn,
            }
        default:
            return state;
    }
};

export default authReducer;