const CheckoutForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label
          htmlFor="fullName"
          className="block text-gray-700 font-bold mb-2"
        >
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Enter your full name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
          Address
        </label>
        <textarea
          id="address"
          name="address"
          placeholder="Enter your address"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 h-32 resize-none"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="paymentMethod"
          className="block text-gray-700 font-bold mb-2"
        >
          Payment Method
        </label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          required
        >
          <option value="">Select payment method</option>
          <option value="creditCard">Credit Card</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Place Order
      </button>
    </form>
  );
};

export default CheckoutForm;
