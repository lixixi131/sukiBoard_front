import axios from "axios";
import { useState, useEffect } from "react";
import { getCookie } from "../../Cookie/Cookie";

const Comment = () => {

    const [commentList, setCommentList] = useState([]);
    const no = new URLSearchParams(window.location.search).get("no")


    const [page, setPage] = useState(1); // 현재 페이지 수
    const pageRange = 5; // 페이지당 보여줄 게시물 수
    const [btnRange, setBtnRange] = useState(5); // 보여질 페이지 버튼의 개수


    //const startPage = (currentSet - 1) * btnRange + 1; // 현재 보여질 버튼의 첫번째 수
    const [startPage, setStartPage] = useState(1);
    const [totalSet, setTotalSet] = useState(0);
    const startPost = (page - 1) * pageRange + 1; // 시작 게시물 번호
    const endPost = startPost + pageRange - 1; // 끝 게시물 번호

    const url = process.env.REACTAPP_HOST_URL;
    //const url = process.env.REACTAPP_TEST_URL;

    useEffect(() => {

        getCommentList()
        setTotalSet(Math.ceil(commentList.length / pageRange))
    }, [])

    useEffect(() => {
        setTotalSet(Math.ceil(commentList.length / pageRange))

    }, [commentList, page])

    const getCommentList = () => {
        axios.get(`${url}/comment/list?no=${no}`)
            .then((res) => {
                setCommentList(res.data);
                setTotalSet(Math.ceil(commentList.length / pageRange))
            })
            .catch(err => {
                console.log(err);
            })
    }

    const deleteComment = (no) => {
        const checkDelete = window.confirm("댓글을 삭제하시겠습니까?");

        if (checkDelete === true) {

            axios.delete(`${url}/comment/delete?no=${no}`, {
                headers: {
                    'Authorization': "Bearer " + getCookie("accessToken")
                }
            })
                .then((res) => {
                    getCommentList()
                })
                .catch(err => {
                    console.log(err);
                })
        }

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
        <div class="flex flex-col p-5">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <h3 class="p-1 text-2xl font-extrabold dark:text-white">댓글</h3>

                    <div class="overflow-hidden">
                        <table
                            class="min-w-full text-left text-sm font-light text-surface dark:text-white">
                            <thead
                                class="border-b border-neutral-200 font-medium dark:border-white/10">
                                <tr>
                                    <th scope="col" class="px-6 py-4">작성자</th>
                                    <th scope="col" class="px-6 py-4">내용</th>
                                </tr>
                            </thead>
                            <tbody>


                                {
                                    commentList.slice(startPost - 1, endPost).map((value, index) => {
                                        return (

                                            <tr class="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600"

                                                key={index}>

                                                <td class="whitespace-nowrap px-6 py-4" >{value.userDto?.nickName}</td>
                                                <td class="whitespace-nowrap px-6 py-4">{value.comment}</td>

                                                {

                                                    value.userDto.id === getCookie("key") ?
                                                        <td>
                                                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
                                                                onClick={() => deleteComment(value.no)}>
                                                                삭제
                                                            </button>
                                                        </td> :
                                                        <></>


                                                }

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

                    )
                }

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

export default Comment;