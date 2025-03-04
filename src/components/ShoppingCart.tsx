import { Offcanvas, Stack, Button } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency';
import { CartItem } from './CartItem';
import storeItems from '../data/items.json';

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>장바구니</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.productNum} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total:{' '}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(i => i.productNum === cartItem.productNum);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
      <Button 
        style={{ display: "flex", height: '50px'}}
        onClick={() => {
          console.log(cartItems);
          fetch('https://localhost:8080/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItems),
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          })
        }}>주문하기</Button>
    </Offcanvas>
  );
}
