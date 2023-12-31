import { Container, Table } from "react-bootstrap";
import "./Cart.css";
import Swal from "sweetalert2";
import cartEmpthy from "../../assets/images.png";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CardComponent() {
  const ProductData = JSON.parse(localStorage.getItem("cartDataProduct"));
  const initialProductCounts = {};
  ProductData.forEach((item) => {
    const id = item?.product?._id;
    const storedCount = localStorage.getItem(`product_${id}`);
    initialProductCounts[id] = storedCount ? parseInt(storedCount, 10) : 1;
  });

  const [productCounts, setProductCounts] = useState(initialProductCounts);

  /* Decrease product  Qty*/
  const handleDecrement = (id) => {
    try {
        if (productCounts[id] > 1) {
        const updatedCounts = { ...productCounts };
        updatedCounts[id] = productCounts[id] - 1;
        setProductCounts(updatedCounts);
        localStorage.setItem(`product_${id}`, updatedCounts[id].toString());
        toast.success("Product Decrease Successfully");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  /* Increase Product Qty*/
  const handleIncrement = (id) => {
    try {
      const updatedCounts = { ...productCounts };
      updatedCounts[id] = productCounts[id] + 1;
      setProductCounts(updatedCounts);
      localStorage.setItem(`product_${id}`, updatedCounts[id].toString());
      toast.success("Product add Successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  /* Remove Product From Cart*/
  const handleRemove = async (id) => {
    try {
      const result = await Swal.fire({
        title: `Are you sure you want to remove the product ?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        const updatedCount = 1;
        localStorage.setItem(`product_${id}`, updatedCount.toString());

        const existingCartData = JSON.parse(localStorage.getItem("cartDataProduct"));
        const newData = existingCartData.filter((item) => {
          return item?.product?._id !== id;
        });
        localStorage.setItem("cartDataProduct", JSON.stringify(newData));
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error");
    }
  };

  /*grand Total */
  const grandTotal = ProductData.reduce((total, product) => {
    return total + productCounts[product?.product?._id] * product?.product?.discountAmount;
  }, 0);
  /*grand Total */

/* pagination*/  

/* pagination*/  

  return (
    <Container className="cart-page">
      <ToastContainer />
      {ProductData.length > 0 ? (
        <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Product Image</th>
              <th>Product Price</th>
              <th>Qunatity</th>
              <th>Total</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ProductData.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    style={{ width: "80px" }}
                    src={product.product.imageUrl}
                    alt="Product"
                  />
                </td>
                <td>₹ {product?.product?.discountAmount}</td>
                <td>
                  <button
                    className="cart-button text-center btn btn-info text-white rounded"
                    onClick={() => handleDecrement(product?.product?._id)}
                  >
                    -
                  </button>
                  &nbsp;&nbsp;
                  {productCounts[product?.product?._id]}&nbsp;&nbsp;
                  <button
                    className="cart-button btn-info btn btn-info text-white rounded"
                    onClick={() => handleIncrement(product?.product?._id)}
                  >
                    +
                  </button>
                </td>
                <td>
                ₹  {productCounts[product?.product?._id] * product?.product?.discountAmount}


                </td>

                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemove(product?.product?._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          
        </Table>
        <h1 className="float-end mt-5 ">Sub Total : ₹  {grandTotal} </h1>
        </>
        
      ) : (
        <>
         <Container className="ms-5">
  <div className="text-center">
    <img src={cartEmpthy} className="mx-auto" alt="Empty Cart" />
    <h1 className="text-info"></h1>
    <button
      onClick={() => (window.location.href = "/")}
      className="btn btn-lg bg-info text-white"
    >
      Continue Shopping
    </button>
  </div>
</Container>

        </>
      )}
    </Container>
  );
}

export default CardComponent;
