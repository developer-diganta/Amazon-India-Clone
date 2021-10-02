export default function location(state=null,action){
    switch(action.type){
        case "ADD_LOCATION":
            state=action.data;
            return state;
        case "REMOVE_LOCATION":
            state="";
            return state;
        default : 
            return state;
    }
};