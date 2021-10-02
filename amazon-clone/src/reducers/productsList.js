export default function productsList(state=null,action){
    switch(action.type){
        case "ADD_DATA":
            if(state===null){
                state=action.data;
            }
            return state;
        default : 
            return state;
    }
};