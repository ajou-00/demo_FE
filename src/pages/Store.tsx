import { Col, Row } from 'react-bootstrap';
import { StoreItem } from '../components/StoreItem';
import storeItems from '../data/items.json';
import MetaData from './MetaData';

export function Store() {
  return (
    <>
      <MetaData title="Store" />
      <h1>블랙프라이데이 특가 상품</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storeItems.map(item => (
          <Col key={item.productNum}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
