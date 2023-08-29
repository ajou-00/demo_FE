import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import storeItems from '../data/items.json';
import { formatCurrency } from '../utilities/formatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';

const Result = () => {

    const [show, setShow] = useState(false);
    const [TOF, setTOF] = useState<boolean>();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { openCart } = useShoppingCart();

    const changeState = (value: number) => {
        handleShow();
        setTOF(storeItems[value - 1].trueOrfalse);
    }

    const handleCart = () => {
        handleClose();
        openCart();
    }

    return (
        <div className="back">
            <h1 className='font'>블랙프라이데이 추첨 이벤트</h1>
            <div className="content">
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {storeItems
                        .filter((items) => items.many === true)
                        .map((items) => {
                            return (
                                <div className="col" key={items.productNum}>
                                    <div className="card">
                                        <img src={items.imgUrl} className="card-img-top" alt="" />
                                        <div className="card-body">
                                            <div className="card-content">
                                                <span className="name">{items.name}</span>
                                                <span className="ms-2 text-muted">{formatCurrency(items.price)}</span>
                                            </div>
                                            <div className="modal-button">
                                                <Button onClick={() => changeState(items.productNum)}>당첨 결과</Button>
                                            </div>

                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header>
                                                    <Modal.Title>당첨 결과</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    {TOF ?
                                                        <div>
                                                            <p>축하드립니다. 당첨되었습니다.</p>
                                                        </div>
                                                        :
                                                        <div>
                                                            <p>귀하는 아쉽게 당첨되지 않았습니다.</p>
                                                        </div>
                                                    }
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    {TOF ?
                                                        <Button className="btn_close" variant="secondary" onClick={handleCart}>
                                                            장바구니 바로 가기
                                                        </Button>
                                                        :
                                                        <div></div>
                                                    }
                                                    <Button className="btn_close" variant="secondary" onClick={handleClose}>
                                                        닫기
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div >
    )

}

export default Result;