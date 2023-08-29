import { Button, Card } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency';

type StoreItemProps = {
  productNum: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem({ productNum, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(productNum);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(productNum)}>
              장바구니에 추가
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: '0.5rem' }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: '0.5rem' }}
              >
                <Button onClick={() => decreaseCartQuantity(productNum)}>-</Button>
                <div>
                  <span className="fs-3"> {quantity}</span>
                </div>
                <Button onClick={() => increaseCartQuantity(productNum)}>+</Button>
              </div>
              <Button
                onClick={() => removeFromCart(productNum)}
                variant="danger"
                size="sm"
              >
                장바구니에서 제거
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
