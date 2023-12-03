import { ADD_TO_CART, DECREMENT, INCREMENT, REMOVE_ITEM, TOGGLE_CART } from "../action/actionTypes";

const initialState = {
    isCartOpen: false,
    cart: []
};


const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_CART:
            return {
                ...state,
                isCartOpen: action.payload
            };

        case ADD_TO_CART:

            const itemExist = state.cart.some(item => item.id === action.payload.id);

            if (!itemExist) {
                return {
                    ...state,
                    cart: [...state.cart, action.payload]
                };
            } else {
                return {
                    ...state,
                    cart: state.cart.map(item => {
                        if (item.id === action.payload.id) {
                            return {
                                ...item,
                                quantity: item.quantity + 1
                            };
                        } else {
                            return item;
                        }
                    })
                };
            }


        case REMOVE_ITEM:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload)
            };


        case INCREMENT:
            return {
                ...state,
                cart: state.cart.map(item => {
                    if (item.id === action.payload) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        };
                    } else {
                        return item;
                    }
                })
            };


        case DECREMENT:
            return {
                ...state,
                cart: state.cart.map(item => {
                    if (item.id === action.payload) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        };
                    } else {
                        return item;
                    }
                }).filter(item => item.quantity !== 0)
            };


        default:
            return state;
    }
};

export default cartReducer;