export default function user(state=null,action){
    switch(action.type){
        case "LOGIN":
            localStorage.setItem('amazon-clone-profile', JSON.stringify({...action.data}));
            state=JSON.stringify({...action.data});
            return state;
        case "LOGOUT":

            localStorage.setItem('amazon-clone-profile',null)
            state=null
            return state;
        default : 
            return state;
    }
};