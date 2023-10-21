import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Card, CardBody } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Product.css';

const ProductComponent = () => {
  const [product, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productResponse = await axios.post('http://3.7.252.58:4001/product/getAllProduct');
        setProducts(productResponse.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <Container className='product-view'>
      <Row xs={1} md={3} className='g-5'>
        {product.map((productItem, idx) => (
          <Col key={idx}>
            <Card style={{height:'400px'}}>
              <Card.Img className='product-image' variant='top' src={productItem.imageUrl} />
              <Card.Body>
                <Card.Title >{productItem.title}</Card.Title>
                <Card.Text className='text-center'>{productItem.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductComponent;
