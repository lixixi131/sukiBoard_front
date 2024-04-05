import React from "react";

import { Route , Routes } from "react-router";
import Login from "./Login/Login";
import { BrowserRouter } from "react-router-dom";
import Main from "./Main/Main";


import Write from "./Write/Write";
import SignUp from "./SignUp/SignUp";
import Post from "./Post/Post";
import "./index.css"

export const App = () =>{

    return(
        
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path='' element={<Main />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/signUp' element={<SignUp />}></Route>
                    <Route path='/Write' element={<Write />}></Route>
                    <Route path='/post' element={<Post />}></Route>

                </Routes>
            </BrowserRouter>

      </React.StrictMode>
    )
}

