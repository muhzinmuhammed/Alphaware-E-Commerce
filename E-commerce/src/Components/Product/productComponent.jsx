import { useState, useEffect } from "react";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./Product.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductComponent = () => {
  const [product, setProducts] = useState([]);
  /* fetch data from api*/
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productResponse = await axios.post(
          "http://3.7.252.58:4001/product/getAllProduct"
        );
        console.log(productResponse.data, "lll");
        setProducts(productResponse.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  /* fetch data from api*/

  /*add to cart function*/
  const AddToCart = (product) => {
    try {
      // Get the existing cart data from localStorage
      const existingCartData = JSON.parse(localStorage.getItem("cartDataProduct")) || [];
  
      // Check if the product already exists in the cart
      const productExistsInCart = existingCartData.some((item) => item.product._id === product._id);
  
      if (!productExistsInCart) {
        toast.success("Product added to cart successfully");
        existingCartData.push({ product }); // Wrap the product in an object
  
        // Update the cart data in localStorage
        localStorage.setItem("cartDataProduct", JSON.stringify(existingCartData));
      } else {
        toast.error("Product already exists in the cart");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  /*add to cart function*/

  return (
    <>
      <ToastContainer />
      <Container className="product-view bg-body-tertiary">
        <Row xs={1} md={3} className="g-5">
          {product.map((productItem, idx) => (
            <Col key={idx}>
              <Card key={productItem._id} style={{ height: "500px" }}>
                <Card.Img
                  className="product-image"
                  variant="top"
                  src={productItem.imageUrl}
                />
                <Card.Body>
                  <h4 className="text-center">{productItem.description}</h4>
                  <h6 className="text-center text-danger text-decoration-line-through ">
                    Price: ₹ {productItem.price}
                  </h6>
                  <h2 className="text-center text-info">
                    OFFER : ₹ {productItem.discountAmount}
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      onClick={() => {
                        AddToCart(productItem);
                      }}
                      className=" add-to-cart "
                    >
                      Add To Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ProductComponent;
