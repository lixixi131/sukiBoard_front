import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

let currentPath = "";

const PostTable = (props) => {

    //const url = "http://localhost:8080"

    const [postList, setPostList] = useState([]);
    const urlParams = new URLSearchParams(window.location.search)
    let location = useLocation();


    const [page, setPage] = useState(1); // 현재 페이지 수
    const pageRange = 5; // 페이지당 보여줄 게시물 수
    const [btnRange, setBtnRange] = useState(5); // 보여질 페이지 버튼의 개수

    //const startPage = (currentSet - 1) * btnRange + 1; // 현재 보여질 버튼의 첫번째 수
    const [startPage, setStartPage] = useState(1);
    const [totalSet, setTotalSet] = useState(0);
    const startPost = (page - 1) * pageRange + 1; // 시작 게시물 번호
    const endPost = startPost + pageRange - 1; // 끝 게시물 번호

    useEffect(() => {

        let params;

        if (props.keyWord.length === 0) {

            //params = `${url}/post/list`
            params ='/post/list'

        }
        else {
            //params = `${url}/post/search?keyWord=${urlParams.get("keyWord")}`
            params = `/post/search?keyWord=${urlParams.get("keyWord")}`
        
        }

        axios.get(params)
            .then((res) => {
                setPostList(res.data);
                setTotalSet(Math.ceil(postList.length / pageRange))
                
            })
            .catch((err) => {
                console.log(err)
            })


    }, [location])

    useEffect(() => {
        setTotalSet(Math.ceil(postList.length / pageRange))
        
    }, [postList , page])

    const trClickEvent = (no) => {

        window.location.href = `/post?no=${no}`;

    }

    const prevPage = (page) => {
        setPage(page)

        if (page % 5 === 0) {
            setStartPage(page - 4)
        }
    }

    const nextPage = (page) => {

        setPage(page)

        if (page % 5 === 1 && page / 5 > 0) {
            setStartPage(page)
        }
    }


    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table
                            className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                            <thead
                                className="border-b border-neutral-200 font-medium dark:border-white/10">
                                <tr>
                                    <th scope="col" className="px-6 py-4">번호</th>
                                    <th scope="col" className="px-6 py-4">제목</th>
                                    <th scope="col" className="px-6 py-4">작성자</th>
                                </tr>
                            </thead>
                            <tbody>


                                {
                                    postList.slice(startPost - 1, endPost).map((value, index) => {
                                        let nickName = value.userDto.nickName;
                                        return (
                                            <tr className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600"

                                                key={index} onClick={() => { trClickEvent(value.no) }}>
                                                <td className="whitespace-nowrap px-6 py-4 font-medium" >{value.no}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{value.title}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{nickName}</td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <ul className="flex justify-center mt-3 font-white-100 ">

                {
                    page > 1 && (
                        <li>
                            <a
                                key={0}
                                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-300 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none focus:ring-0 active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
                                onClick={() => prevPage(page - 1)} $active={false}>
                                prev
                            </a>
                        </li>

                    )}

                {
                    Array(btnRange).fill()
                        .map((value, i) => {
                            return (
                                <li>
                                    {
                                        startPage + i <= totalSet ?
                                            <a
                                                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-300 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none focus:ring-0 active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
                                                id={startPage + i}
                                                key={i}
                                                onClick={() => { setPage(startPage + i) }}
                                            >
                                                {startPage + i}
                                            </a> :
                                            <></>

                                    }

                                </li>
                            );
                        })
                }

                {
                    totalSet > page &&
                    (
                        <li>
                            <a
                                key={7}
                                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-300 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
                                onClick={() => nextPage(page + 1)} $active={false}>
                                next

                            </a>
                        </li>

                    )}
            </ul>


        </div>
    )
}

export default PostTable;