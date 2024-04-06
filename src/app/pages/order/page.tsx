"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import { useRouter } from "next/navigation";

interface OrderFormProps {
  customerId: number;
  bookId: number;
  price: number;
  onSubmitSuccess: () => void;
  pointsCustomer: number;
}

const OrderForm: React.FC<OrderFormProps> = ({
  customerId,
  bookId,
  price,
  onSubmitSuccess,
  pointsCustomer,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [status, setStatus] = useState<string>("ready");
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showCongrats, setShowCongrats] = useState<boolean>(false);
  const [pointsLates, setPointsLates] = useState<number>(0);
  const router = useRouter();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get<any>(
          `http://localhost:4001/customers/${customerId}`
        );
        const { points } = response.data;
        console.log("test points", points);
        setPointsLates(points);
        localStorage.setItem("points", points);
      } catch (error) {
        console.error("Failed to fetch points:", error);
      }
    };

    fetchPoints();
  }, [customerId]);
  console.log("test points", pointsLates);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const totalPrice = price * quantity;
      const orderPromise = axios.post("http://localhost:4001/orders", {
        customer_id: customerId,
        book_id: bookId,
        status: status,
      });

      const pointsString = localStorage.getItem("points");
      const initialPoints = pointsString ? parseInt(pointsString) : 0;
      const updatedPoints = Math.floor(initialPoints - totalPrice);

      const customerPromise = axios.put(
        `http://localhost:4001/customers/${customerId}/points`,
        {
          points: updatedPoints,
        }
      );

      const [orderResponse, customerResponse] = await Promise.all([
        orderPromise,
        customerPromise,
      ]);

      if (orderResponse.status === 201 && customerResponse.status === 200) {
        localStorage.setItem("points", pointsLates);
        setShowCongrats(true);
        setTimeout(() => {
          setShowCongrats(false);
          onSubmitSuccess();
          router.push("/pages");
        }, 3000);
      } else {
        const orderErrorMessage =
          orderResponse.statusText || "Failed to submit order";
        const customerErrorMessage =
          customerResponse.statusText || "Failed to update customer points";
        setError(`Error: ${orderErrorMessage} - ${customerErrorMessage}`);
      }
    } catch (error) {
      console.error("Failed to submit order:", error);
      setError("Failed to submit order");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
      >
        Buy
      </button>

      {showModal && (
        <Modal closeModal={() => setShowModal(false)}>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-4">Buy Book</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min={1}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  value={status}
                  onChange={handleStatusChange}
                >
                  <option value="ready">Ready</option>
                  <option value="not">Not Ready</option>
                </select>
              </div>
              <div>
                <p>Total Price: ${price * quantity}</p>
              </div>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <button
                type="submit"
                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                Submit Order
              </button>
            </form>
          </div>
        </Modal>
      )}

      {showCongrats && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Congrats!</h2>
            <p className="text-lg">
              You have successfully purchased the book..
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderForm;
