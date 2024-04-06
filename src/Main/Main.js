import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import PostTable from "./PostTable";
import { getCookie } from "../Cookie/Cookie";
import { Link, useLocation } from "react-router-dom";

const Main = () => {
    const url = process.env.REACT_APP_HOST_URL;
    //const url = process.env.REACT_APP_TEST_URL;
    const dispatch = useDispatch();
    // const number = useSelector((state) => state.counter.number);
    // const nickName = useSelector((state) => state.nickName);
    // const state = useSelector((state) => state)
    const [keyWord, setKeyWord] = useState('');
    const location = useLocation();

    //pagination

    const writeButtonEvent = () => {

        if (getCookie("accessToken") === undefined) {
            alert("글쓰기는 로그인 상태에서만 가능합니다.")
            return
        }

        window.location.href = "/write"
    }

    const changekeyWord = (e) => {
        setKeyWord(e.target.value);


    }



    return (
        <div class="p-7">
            {/* <h1>{number}</h1>
            <h2>{nickName}</h2>
            <button onClick={increment}>증가</button>
            <button onClick={decrement}>감소</button>
            <button onClick={test}>테스트</button> */}

            <h1 class="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  dark:text-gray-200">
                게시글</h1>

            <PostTable keyWord={keyWord}></PostTable>

            <div className="flex space-x-3 justify-end">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={writeButtonEvent}>
                    글쓰기
                </button>
            </div>



            <div class="flex items-center max-w-sm mx-auto pt-5">
                <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="제목 검색" onChange={changekeyWord}></input>
                <Link to={`?keyWord=${keyWord}`} state={{ keyWord: keyWord }}>
                    <button class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>

                    </button>

                </Link>
            </div>




        </div>


    )




}




export default Main;