import axios from "axios";
import React, { useState } from "react";
import { getCookie, setCookie } from "../Cookie/Cookie";
import Test from "../Test";
import { useDispatch } from "react-redux";
import { logIn } from "../reducer/actions";
const Login = () => {

    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')

    const url = process.env.REACT_APP_HOST_URL;
    //const url = process.env.REACT_APP_TEST_URL;

    const config = { "Content-Type": 'application/json' };

    const dispatch = useDispatch();

    const onLogIn = (data) => {
        dispatch(data, { type: 'LOGIN' });
    }
    const loginEvent = (e) => {

        e.preventDefault();

        const loginForm = document.getElementById("loginForm");

        setUserId(loginForm.elements[0].value);
        setPassword(loginForm.elements[1].value);




        let user = {
            'id': userId,
            'password': password
        };

        console.log(JSON.stringify(user))

        axios.post(`${url}/logIn`, user)
            .then((res) => {
                console.log(res.data);

                if (res.data.response === "로그인 성공") {
                    console.log(res.data.tokenDto);
                    setCookie("accessToken", `${res.data.tokenDto.accessToken}`, {
                        path: '/',
                        expires: new Date(Date.now() + 3600 * 1000)
                    })

                    setCookie("refreshToken", `${res.data.tokenDto.refreshToken}`, {
                        path: '/',
                        expires: new Date(Date.now() + 3600 * 1000)
                    })

                    setCookie("key", `${res.data.tokenDto.key}`, {
                        path: '/',
                        expires: new Date(Date.now() + 3600 * 1000)
                    })


                    setCookie("nickName", `${res.data.nickName}`, {
                        path: '/',
                        expires: new Date(Date.now() + 3600 * 1000)
                    })



                    window.location.replace('/')




                }


            })
            .catch((err) => {
                console.log(err.data);
            })
    }

    const onChangeEvent = (e) => {


        if (e.target.id === "idInput") {
            setUserId(e.target.value);
        }
        else if (e.target.id === "passwordInput") {
            setPassword(e.target.value);
        }



    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">LogIn to your account</h2>
            </div>
            <div className="border-2 border-gray-100 p-5 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <form className="space-y-6" id="loginForm" onSubmit={loginEvent}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">아이디</label>
                        <div className="mt-2">
                            <input class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                id="idInput" onChange={onChangeEvent}></input>
                        </div>
                    </div>


                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">비밀번호</label>
                            <div class="text-sm">
                                <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div>
                        </div>
                        <div class="mt-2">
                            <input onChange = {onChangeEvent} id="passwordInput" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                    </div>

                    <div>
                        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;