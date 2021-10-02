export default function basket(state=JSON.parse(localStorage.getItem('amazon-clone-cart'))?JSON.parse(localStorage.getItem('amazon-clone-cart')):[],action){
    switch(action.type){
        case "ADD_ITEM":
            if(state.length===0){
                action.data.qty===0?action.data.qty=1:console.log("OK");//error occurs if this check doesnot happen...Trying to figure out why...
                state.push(action.data);
                localStorage.setItem('amazon-clone-cart', JSON.stringify(state));
            return state;
            }
            else{
                for(let i=0;i<state.length;i++){
                    if(state[i].id===action.data.id){
                        const pdt=[...state]
                        pdt[i].qty=pdt[i].qty+action.data.qty;
                        localStorage.setItem('amazon-clone-cart', JSON.stringify(pdt));
                        return pdt;
                    }
                }
                state.push(action.data);
                localStorage.setItem('amazon-clone-cart', JSON.stringify(state));
                return state
            }
            
        case "REMOVE_ITEM":
            let newState=[];
            for(let i=0;i<state.length;i++){
                if(state[i].id===action.data){
                    state[i].qty-=1;
                    if(state[i].qty!==0){
                        newState.push(state[i]);
                    }
                }
                else{
                    newState.push(state[i]);
                }
            }
            state=newState;
            localStorage.setItem('amazon-clone-cart', JSON.stringify(state));
            return state;
        default : 
            return state;
    }
};