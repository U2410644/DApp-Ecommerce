import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/action';


const ProductsCard = (props) => {

    const { img, rating, title, price } = props;

    const dispatch = useDispatch();

    return (
        <>
            <div className="container bg-white">
                <figure>
                    <img src={img} alt="item-img" />
                </figure>
                
                <h4 className="title text-dark">{title}</h4>
                <h3 className="price text-dark">₹ {price.toLocaleString()}</h3>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => dispatch(addToCart({ ...props }))}
                >
                    Add to cart
                </button>
            </div>
        </>
    );
};

export default ProductsCard;