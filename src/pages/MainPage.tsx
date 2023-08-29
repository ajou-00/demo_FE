import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import storeItems from '../data/items.json';
import { useShoppingCart } from '../context/ShoppingCartContext';

type StoreItemProps = {
    productNum: number;
    name: string;
    price: number;
    imgUrl: string;
    trueOrfalse: boolean,
};

export function MainPage({ productNum, trueOrfalse }: StoreItemProps) {
    let check = false;
    const {
        getItemQuantity,
        increaseCartQuantity,
        cartItems,
    } = useShoppingCart();
    const quantity = getItemQuantity(productNum);

    const navigate = useNavigate();

    const navigateToPurchase = () => {
        navigate("/store");
    };
    const navigateToResult = () => {
        navigate("/result");
    };

    const addResult = () => {
        console.log("cartItems: ", cartItems);
        if (cartItems.length === 0) {
            for (let i = 0; i < storeItems.length; i++) {
                if (storeItems[i].trueOrfalse) {
                    increaseCartQuantity(storeItems[i].productNum);
                }
            }

        }
    }

    useEffect(() => {
        if (!check) {
            addResult();
            check = true;
        }
    }, []);

    return (
        <Carousel>
            <Carousel.Item>
                <img src="./car.jpg" className='carousel-img' />
                <Carousel.Caption>
                    <button onClick={navigateToPurchase}>바로가기</button>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="./car.jpg" className='carousel-img' />
                <Carousel.Caption>
                    <button onClick={navigateToResult}>바로가기</button>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="./car.jpg" className='carousel-img' />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}