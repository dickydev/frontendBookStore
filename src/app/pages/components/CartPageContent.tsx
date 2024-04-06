import React, { useState, useEffect } from "react";
import axios from "axios";

interface CartItem {
  id: number;
  title: string;
  price: number;
}

const CartPageContent: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get<CartItem[]>(
          "http://localhost:4001/cart"
        );
        setCartItems(response.data);
      } catch (error) {
        setError("Failed to fetch cart items");
      }
    };

    fetchCartItems();
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:4001/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems),
      });
      if (!response.ok) {
        throw new Error("Failed to checkout");
      }
      alert("Checkout successful");
      setCartItems([]);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed");
    }
  };

  return (
    <div>
      <h3>Your Cart</h3>
      {error && <p>{error}</p>}
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.title} - ${item.price}
          </li>
        ))}
      </ul>
      <p>Total Price: ${totalPrice}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default CartPageContent;
