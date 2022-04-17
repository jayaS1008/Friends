import {AUTH ,LOGOUT} from '../constants/actionTypes'

 const authReducer =(state={authData:null} ,action)=>{
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile',JSON.stringify({...action?.data}));
             return{...state ,authData: action?.data};
            break;
        case LOGOUT:
            localStorage.clear();
            return{...state ,authData:null};
            break;
        default:
            return(state);
            break;
    }
}
export default authReducer;