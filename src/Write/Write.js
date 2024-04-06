import axios from "axios";
import { getCookie } from "../Cookie/Cookie";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const Write = () => {

    const [title , setTitle] = useState('');
    const [content , setContent] = useState('');
    const [no , setNo] = useState(-1);
    const location = useLocation();
    const navigate = useNavigate();

    const url = process.env.REACT_APP_HOST_URL;
    //const url = process.env.REACT_APP_TEST_URL;

    useEffect( () => {
        
        if(location.state !== null){
            setTitle(location.state.title);
            setContent(location.state.content);
            setNo(location.state.postNo);
        }

    },[]) 


    const checkEvent = (e) => {
        e.preventDefault();
        
        //새로운글 작성시
        if(no === -1){
            writingRegisterEvent(e);
        }

        else{
            editPost(e);
        }
    } 

    //수정 이벤트
    const editPost = (e) => {
        const title = e.target["title"].value;
        const content = e.target['content'].value;

        const data = {
            'title' : title,
            'content' : content,
            'no' : no
        }

        
        axios.put(`${url}/post/edit` , data , {
            headers : {
                'Authorization' : "Bearer " +  getCookie("accessToken"),
                'Content-Type': 'application/json'
            }
        })
        .then((res)=>{
            console.log(res.data)
            //window.location.href = "/";
            navigate(-1)
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    //새글 작성 이벤트
    const writingRegisterEvent = (e) =>{


        console.log("writingRegisterEvent Activated");

        const title = e.target["title"].value;

        if(title === ""){
            alert("제목을 입력해주세요")
            return;
        }

        const content = e.target['content'].value;
        console.log(title, content)
        
        const data = {
            'title' : title,
            'content' : content,

            'userDto' : null
        }

        axios.post(`${url}/post/write` , data , {
            headers : {
                'Authorization' : "Bearer " +  getCookie("accessToken"),
                'Content-Type': 'application/json'
            }
        })
        .then((res)=>{
            console.log(res.data)
            window.location.href = "/";
        })
        .catch((err) =>{
            console.log(err)
        })

    } 

    const cancleButton = (e) => {
        e.preventDefault();

        window.location.href = "/"
    }

    return(
        <form  class="m-5 editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl" 
                onSubmit={checkEvent}>
            <input class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" placeholder="Title" name = "title" defaultValue={title}></input>

            <textarea class="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" placeholder="내용" name = "content" defaultValue={content}></textarea>
            <div class="buttons flex p-3">
                <button onClick = {cancleButton}class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">취소</button>
                <button class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">등록</button>
            </div>
        </form>
    )

    
}

export default Write;