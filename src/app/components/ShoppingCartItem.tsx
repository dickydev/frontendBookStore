interface ShoppingCartItemProps {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({
  id,
  title,
  price,
  quantity,
  imageUrl,
}) => {
  return (
    <div className="flex items-center border-b border-gray-300 py-4">
      <img
        src={imageUrl}
        alt={title}
        className="w-24 h-24 object-cover rounded-lg mr-4"
      />
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">Price: ${price}</p>
        <p className="text-gray-600">Quantity: {quantity}</p>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
