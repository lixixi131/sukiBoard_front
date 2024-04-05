


const initialState = {
    userId : null,
    nickName : null,
    logInState : false
}

const userReducer = (state = initialState , action ) => {
    switch(action.type){
        case "LOGIN":
            return{
                ...state,
                userId : action.userId,
                nickName : action.nickName
            };
        case "LOGOUT":
            return{
                ...state,
                userId : null,
                nickName : null
            }
        default:
            return {
                state
            };
    }
}

export default userReducer;