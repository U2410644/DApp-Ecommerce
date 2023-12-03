import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrItem, decrItem, removeItem, toggleCart } from '../redux/action';
import Bill from './Bill'
import { Link } from "react-router-dom";


const Cart = ({cartTotal}) => {

    const { isCartOpen, cart } = useSelector(state => state.cartReducer);

      const dispatch = useDispatch();


   


    if (isCartOpen) {
        return (
            <>
                <div id="cart">
                    <div className="cart_content">
                        <div className="cart_head">
                            <h2>Cart <small>({cart.length})</small></h2>
                            <div
                                title="Close"
                                className="close_btn"
                                onClick={() => dispatch(toggleCart(false))}
                            >
                                <span>&times;</span>
                            </div>
                        </div>

                        <div className="cart_body">
                            {

                                cart.map(item => {
                                    const { id, img, title, price, quantity } = item;

                                    return (
                                        <div className="cart_items" key={id}>
                                            <figure className="cart_items_img">
                                                <img src={img} alt="product-img" />
                                            </figure>

                                            <div className="cart_items_info">
                                                <h4>{title}</h4>
                                                <h3 className="price">₹ {price.toLocaleString()}</h3>
                                            </div>

                                        

                                            <div
                                                title="Remove Item"
                                                className="cart_items_delete"
                                                onClick={() => dispatch(removeItem(id))}
                                            >
                                                <span>&times;</span>
                                            </div>
                                        </div>

                                    );
                                })
                            }
                        </div>

                        <div className="cart_foot">
                            <h3>
                                <small>Total:</small>
                                <b>₹ {cartTotal}</b>
                            </h3>
                            <Link to="/bill">
                            <button
                                type="button"
                                className="checkout_btn btn btn-primary bg-primary"
                                disabled={!cartTotal}
                                
                                
                            >
                                Buy
                            </button>
                            </Link>

                        </div>
                    </div>
                </div>
            </>
        );
    }


};

export default Cart;