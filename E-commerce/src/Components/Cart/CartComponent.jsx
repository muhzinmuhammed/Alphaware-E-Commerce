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
    initialProductCounts[id] = storedCount ? parseInt(storedCount, 10) : 0;
  });

  const [productCounts, setProductCounts] = useState(initialProductCounts);

  /* Decrease product  Qty*/
  const handleDecrement = (id) => {
    try {
      if (productCounts[id] > 0) {
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
  const handleRemove = (id) => {
    // Show a SweetAlert confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to remove this product from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const existingCartData = JSON.parse(
            localStorage.getItem("cartDataProduct")
          );
          const newData = existingCartData.filter(
            (item) => item?.product?._id !== id
          );
          localStorage.setItem("cartDataProduct", JSON.stringify(newData));
          // Show toast message before reloading the page
          toast.success("Product remove from cart");
          // Reload the page
          window.location.reload();
        } catch (error) {
          toast.error(error);
        }
      }
    });
  };

  return (
    <Container className="cart-page">
      <ToastContainer />
      {ProductData.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Image</th>
              <th>Product Price</th>
              <th>Qunatity</th>
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
                <td>{product?.product?.discountAmount}</td>
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
      ) : (
        <>
          <Container className="ms-5">
            <img src={cartEmpthy} />
            <h1 className="  text-info">No Product In Cart </h1>
            <button
              href="/"
              onClick={() => (window.location.href = "/")}
              className=" btn btn-light text-info"
            >
              Continue Shopiing
            </button>
          </Container>
        </>
      )}
    </Container>
  );
}

export default CardComponent;
