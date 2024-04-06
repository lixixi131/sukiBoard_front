import React from "react";
import { useState, useEffect } from "react";
import axios
    from "axios";
const SignUp = () => {

    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [nickName, setNickName] = useState('')
    const [isDuplicate, setIsDuplicate] = useState(false) //중복검사 완료 유무 완료되면 true 안되면 false
    const [isNickNameDuplicate, setIsNickNameDuplicate] = useState(false)
    const config = { "Content-Type": 'application/json' };

    const url = process.env.REACT_APP_HOST_URL;
    //const url = process.env.REACT_APP_TEST_URL;

    //중복검사 함수
    const duplicateCheck = (e) => {

        e.preventDefault();

        const SignUpForm = document.getElementById("SignUpForm");

        if (SignUpForm.elements[0].value === ""){
            alert("아이디를 입력해주세요")
            return
        }

        setUserId(SignUpForm.elements[0].value);
        let user = {
            'id': userId
        };

        axios.post(`${url}/signUp/duplicateCheck`, user, config)
            .then((res) => {



                if (res.data) {
                    alert('사용 가능한 아이디')
                }
                else {
                    alert("중복된 아이디")
                }

                setIsDuplicate(res.data);
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const nickNameDuplicateCheck = (e) => {
        e.preventDefault();

        const SignUpForm = document.getElementById("SignUpForm");


        if (SignUpForm.elements[1].value === ""){
            alert("닉네임을 입력해주세요")
            return
        }

        //setUserId(SignUpForm.elements[2].value);
        let user = {
            'nickName': nickName
        };

        axios.post(`${url}/signUp/nickNameDuplicateCheck`, user, config)
            .then((res) => {


                if (res.data) {
                    alert('사용 가능한 닉네임')
                }
                else {
                    alert("중복된 닉네임")
                }

                setIsNickNameDuplicate(res.data);
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const SignUpEvent = (e) => {

        e.preventDefault();
        console.log("회원가입 이벤트발생");

        if (isDuplicate === false) {
            alert("아이디 중복 검사를 해주세요")
            return
        }

        if (isNickNameDuplicate === false) {
            alert("닉네임 중복 검사를 해주세요")
            return
        }

        if (password === "" || userId === "" || nickName === "") {
            alert("모든 정보를 입력해주세요")
            return
        }

        console.log(duplicateCheck);

        const SignUpForm = document.getElementById("SignUpForm");

        setUserId(SignUpForm.elements[0].value);
        setPassword(SignUpForm.elements[1].value);
        setNickName(SignUpForm.elements[2].value);

        let user = {
            'id': userId,
            'password': password,
            'nickName': nickName
        };

        console.log(JSON.stringify(user))

        axios.post(`/signUp`, user, config)
            .then((res) => {
                console.log(res.data);
                window.location.href = "/"
            })
            .catch((err) => {
                console.log(err.data);
            })
    }

    const onChangeEvent = (e) => {

    

        if (e.target.id === "idInput") {
            setUserId(e.target.value);
            setIsDuplicate(false);
        }
        else if (e.target.id === "passwordInput") {
            setPassword(e.target.value);
        }
        else if (e.target.id === "nickNameInput") {
            setNickName(e.target.value);
            setIsNickNameDuplicate(false);
        }


    }
    // return (
    //     <div>
    //         <form id="SignUpForm" onSubmit={SignUpEvent}>

    //             <label>아이디</label>
    //             <input id="idInput" onChange={onChangeEvent}></input>
    //             <button onClick={duplicateCheck}>아이디 중복 확인</button>
    //             <label>비밀번호</label>
    //             <input id="passwordInput" onChange={onChangeEvent}></input>
    //             <label>닉네임</label>
    //             <button onClick={nickNameDuplicateCheck}>닉네임 중복 확인</button>
    //             <input id="nickNameInput" onChange={onChangeEvent}></input>

    //             <button type="onSubmit">회원가입</button>
    //         </form>
    //     </div>
    // )

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up to your account</h2>
            </div>
            <div className="border-2 border-gray-100 p-5 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <form className="space-y-6" id="SignUpForm" onSubmit={SignUpEvent}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">아이디</label>
                        <div className="mt-2">
                            <input class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                id="idInput" onChange={onChangeEvent}></input>

                            {
                                isDuplicate?
                                <p className="font-bold text-gray-900 mt-2">닉네임 중복 체크 완료</p>:
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2"
                                onClick={duplicateCheck}>아이디중복체크</button>
                            }

                        </div>
                        
                    </div>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">닉네임</label>
                        <div className="mt-2">
                            <input class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                id="nickNameInput" onChange={onChangeEvent}></input>
                            {
                                isNickNameDuplicate?
                                <p className="font-bold text-gray-900 mt-2">닉네임 중복 체크 완료</p>:
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2"
                                onClick={nickNameDuplicateCheck}>닉네임 중복 체크</button>
                            }

                        
                        </div>
                    </div>


                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">비밀번호</label>

                        </div>
                        <div class="mt-2">
                            <input onChange={onChangeEvent} id="passwordInput" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>

                    </div>

                    <div>
                        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;