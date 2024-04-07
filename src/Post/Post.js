import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCookie } from "../Cookie/Cookie";
import Comment from "./Comment/Comment";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const Post = () => {

    const [no, setNo] = useState(0);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [writerId, setWriterId] = useState('');
    const [nickName, setNickName] = useState('');
    const id = useSelector((state) => state);
    const urlParams = new URLSearchParams(window.location.search)

    const url = process.env.REACT_APP_HOST_URL;
    //const url = process.env.REACT_APP_TEST_URL;

    useEffect(() => {
        //axios.get("url"+"/post" + "?" + "no=" + urlParams.get("no"))
        axios.get(`${url}/post?no=${urlParams.get("no")}`)
        .then((res) => {
                setTitle(res.data.title);
                setContent(res.data.content);
                setNickName(res.data.userDto.nickName);
                setWriterId(res.data.userDto.id);
                console.log(res.data)
                //게시글의 번호 post.no
                setNo(urlParams.get("no"));
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

    const commentSubmit = (e) => {
        e.preventDefault();


        if (getCookie("accessToken") === undefined) {
            alert("댓글 기능은 로그인시 사용가능합니다")
            return;
        }

        //let id = useSelector((state) => state);
        //console.log(getCookie("nickName"));

        const data = {
            "comment": e.target["comment"].value,
            "userDto": null,
            "postDto": {
                "no": no
            }
        };

        axios.post(`${url}/comment/write`, data, {
            headers: {
                'Authorization': "Bearer " + getCookie("accessToken"),
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log(res.data);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const deletePost = () => {
        const checkDelete = window.confirm("진짜로 삭제하시겠습니까?");

        const data = {
            "no": no
        };
        if (checkDelete === true) {
            axios.delete(`${url}/post/delete?no=${no}`, {
                headers: {
                    'Authorization': "Bearer " + getCookie("accessToken"),
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    console.log(res.data);
                    window.location.href ="/"

                })
                .catch((err) => {
                    console.log(err);
                })
        }

    }


    return (
        <div>




            <fieldset className="border p-3 m-5">
                <legend class="text-sm font-bold text-lg font-bold">제목</legend>

                <p className="font-bold text-2xl">{title}</p>
                <p className="p-2 pl-1">글쓴이 : {nickName}</p>
            </fieldset>
            <fieldset className="border p-3 m-5">
                <legend class="text-sm font-bold text-lg font-bold">내용</legend>
                <p>{content}</p>

            </fieldset>

            {

                getCookie("key") == writerId ?
                    <div className="flex mt-3 justify-end p-3">
                        <Link to="/write" state={{ title: title, content: content, postNo: no }}>
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold mr-2 py-2 px-4">
                                수정
                            </button>
                        </Link>
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4" 
                            onClick={deletePost}>
                            삭제
                        </button>
                    </div>

                    : <></>
            }

            <form class="p-5" onSubmit={commentSubmit}>
                {/* <textarea name = "comment" placeholder="댓글 작성"></textarea>
                <button type = "submit">댓글 등록</button> */}

                <textarea name="comment" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="댓글 작성"></textarea>
                {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"/></button> */}
                <div className="flex space-x-3 justify-end">
                    <button class="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" type="submit">댓글 등록</button>

                </div>
            </form>


            <Comment no={no}></Comment>
        </div>
    )

}


export default Post;