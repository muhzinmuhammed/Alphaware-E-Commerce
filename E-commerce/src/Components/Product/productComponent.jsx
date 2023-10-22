import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const ProductComponent = () => {
  const [products, setProducts] = useState([]); // Changed the variable name to 'products'.
  
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productResponse = await axios.post( // Use 'get' instead of 'post' for fetching data.
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

  const addToCart = (product) => { // Changed the function name to follow naming conventions.
    try {
      const existingCartData = JSON.parse(localStorage.getItem("cartDataProduct")) || [];

      const productExistsInCart = existingCartData.some((item) => item.product._id === product._id);

      if (!productExistsInCart) {
        toast.success("Product added to cart successfully");
        existingCartData.push({ product });
        localStorage.setItem("cartDataProduct", JSON.stringify(existingCartData));
      } else {
        toast.error("Product already exists in the cart");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <h1 className="text-center mt-3">Product List</h1> {/* Added a title. */}
      <section className="py-4 container product-view">
        <div className="row justify-content-center">
          {products.map((productItem) => (
            <div key={productItem._id} className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
              <div className="card p-0 overflow-hidden h-100 shadow">
                <img className="card-img-top img-fluid" src={productItem.imageUrl} alt="Card image cap" />
                <div className="card-body text-center">
                  <h5 className="card-title">{productItem.description}</h5>
                  <h6 className="text-center text-danger text-decoration-line-through ">
                    Price: ₹ {productItem.price}
                  </h6>
                  <h2 className="text-center text-info">
                    OFFER : ₹ {productItem.discountAmount}
                  </h2>

                  <button onClick={() => addToCart(productItem)} className="btn btn-info text-white">Add To Cart</button> 
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductComponent;
