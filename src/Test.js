import axios from "axios"
import { getCookie } from "./Cookie/Cookie"
const Test = () =>{
    const url = "http://localhost:8080"

    let user = {
        'id' : "zxzx8724",
        'password' : "zxzx1235"
    };

    const test = () => {
        axios.post(`${url}/test`, user , {
            headers : {
                'Authorization' : "Bearer " +  getCookie("accessToken"),
                'Content-Type': 'application/json' 
            },
        })
        .then((res) =>{
            
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const getTest = () => {

        console.log( `Bearer ${getCookie("accessToken")}` )
        let token = getCookie('accessToken');
        axios.get(`${url}/getTest` , {
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    return(
        <div>
            <button onClick={test}>test</button>
            <button onClick={getTest}>gettest</button>
        </div>


    )
}

export default Test;