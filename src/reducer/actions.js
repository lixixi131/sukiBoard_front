const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";


// 액션 생성자 함수 정의
export const increment = () => ({
  type: INCREMENT
});

export const decrement = () => ({
  type: DECREMENT
});

export const logIn = () => ({
    type : LOGIN
})

export const logOut = () => ({
    type : LOGOUT
})