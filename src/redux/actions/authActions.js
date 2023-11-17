export const login = (email, password) => {
    // Thực hiện xử lý đăng nhập, gọi API, kiểm tra thông tin, v.v.
    // Trả về một action có type và payload tương ứng
    return (dispatch) => {
        fetch("https://wind-be.onrender.com/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch({
                    type: "LOGIN",
                    payload: {
                        message: "Login success!",
                        status: data.status,
                        token: data.token,
                        message: data.message,
                    },
                });
            })
            .catch((err) => { console.log(err) });
    }
};

export const loginWithEmail = (email) => {
    // Thực hiện xử lý đăng nhập, gọi API, kiểm tra thông tin, v.v.
    // Trả về một action có type và payload tương ứng
    // Thực hiện xử lý đăng nhập, gọi API, kiểm tra thông tin, v.v.
    // Trả về một action có type và payload tương ứng
    return (dispatch) => {
        fetch("https://wind-be.onrender.com/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch({
                    type: "LOGIN",
                    payload: {
                        message: "Login success!",
                        status: data.status,
                        token: data.token,
                        message: data.message,
                        data: data
                    },
                });
            })
            .catch((err) => { console.log(err) });
    }
};

export const register = (firstname, lastname, email, password) => {
    // Thực hiện xử lý đăng nhập, gọi API, kiểm tra thông tin, v.v.
    // Trả về một action có type và payload tương ứng
    return (dispatch) => {
        fetch("https://wind-be.onrender.com/auth/register", {
            method: "POST",
            body: JSON.stringify({
                firstName: firstname,
                lastname: lastname,
                email: email,
                password: password,
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch({
                    type: "ADD",
                    payload: {
                        message: "Add room success!",
                    },
                });
            })
            .catch((err) => { });
    }
};