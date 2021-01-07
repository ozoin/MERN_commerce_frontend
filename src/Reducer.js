import { returnTrue } from "react-currency-format/lib/utils";

export const initialState = {
    basket:[],
    shipping:[],
    products:[],
    user:null,
    validation:false,
    category:'',
    messages : [],
};

export const getBasketTotal = (basket) => {
    return basket?.reduce((amount,item) => item.price + amount, 0);
}

const reducer = (state,action) => {
    console.log(action);
    switch(action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket:[...state.basket, action.item],
            }
        case 'ADD_MESSAGE': 
            return {
                ...state,
                messages: [...state.messages,action.item]
            }
        case 'EMPTY_BASKET': 
            return {
                ...state,
                basket:[]
            }
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);
            let newBasket = [...state.basket];
            if(index>=0) {
                newBasket.splice(index,1)
            } else {
                console.warn('Cant remove product')
            }
            return {...state, basket: newBasket}
        case 'SET_USER':
            return {
                ...state,
                user:action.user
            }
        case 'SET_SHIPPING':
            return {
                ...state,
                shipping:[action.adress],
            }
        case 'VALID_CHECK':
            return {
                ...state,
                valid:action.validation
            }
        case 'SET_CATEGORY':
            return {
                category:action.category
            }
        default:
            return state;
    }
}
export default reducer;