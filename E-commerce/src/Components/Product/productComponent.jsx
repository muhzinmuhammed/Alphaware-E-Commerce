import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Product.css";
import {  Pagination } from "react-bootstrap";
const ProductComponent = () => {
  const [products, setProducts] = useState([]); // Changed the variable name to 'products'.
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currenProduct = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productResponse = await axios.post(
          // Use 'get' instead of 'post' for fetching data.
          "http://3.7.252.58:4001/product/getAllProduct"
        );

        setProducts(productResponse.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  const addToCart = (product) => {
    // Changed the function name to follow naming conventions.
    try {
      const existingCartData =
        JSON.parse(localStorage.getItem("cartDataProduct")) || [];

      const productExistsInCart = existingCartData.some(
        (item) => item.product._id === product._id
      );

      if (!productExistsInCart) {
        toast.success("Product added to cart successfully");
        existingCartData.push({ product });
        localStorage.setItem(
          "cartDataProduct",
          JSON.stringify(existingCartData)
        );
      } else {
        const storedCount = localStorage.getItem(`product_${product._id}`);
        const updatedCount = parseInt(storedCount, 10) + 1;
        localStorage.setItem(`product_${product._id}`, updatedCount.toString());
  
        
        toast.success("Existing product count incremented in the cart");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const showProducts = filteredProducts.length > 0;
  return (
    <>
      <ToastContainer />
      <h1 className="text-center mt-3">Product List</h1>

      {showProducts && (
        <section className="py-4 container product-view">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
          />
          <div className="row mt-5 justify-content-center">
            {currenProduct.map((productItem) => (
              <div
                key={productItem._id}
                className="col-11 col-md-6 col-lg-4 mx-0 mb-4"
              >
                <div className="card p-0 overflow-hidden h-100 shadow">
                  <img
                    className="card-img-top img-fluid"
                    src={productItem.imageUrl}
                    alt="Card image cap"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{productItem.description}</h5>
                    <h6 className="text-center text-danger text-decoration-line-through">
                      Price: ₹ {productItem.price}
                    </h6>
                    <h2 className="text-center text-info">
                      OFFER : ₹ {productItem.discountAmount}
                    </h2>

                    <button
                      onClick={() => addToCart(productItem)}
                      className="add-to-cart"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination className="justify-content-center">
            {currentPage > 1 && <Pagination.Prev onClick={handlePrevPage} />}
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                active={currentPage === index + 1}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            {currentPage < totalPages && (
              <Pagination.Next onClick={handleNextPage} />
            )}
          </Pagination>
        </section>
      )}
      {!showProducts && (
        <div className="text-center mt-5">
          <h3>No products found for the search query {searchQuery}.</h3>

          <button
            onClick={() => (window.location.href = "/")}
            className="btn btn-info text-white"
          >
            {" "}
            Product Page
          </button>
        </div>
      )}
    </>
  );
};

export default ProductComponent;
