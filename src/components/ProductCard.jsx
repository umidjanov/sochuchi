import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import useStore from '../store/useStore'
import { motion } from "framer-motion";
import useStore from "../store/useStore";

export default function ProductCard({ product }) {
  const { addToCart, addToFavorites, favorites } = useStore();
  const navigate = useNavigate();

  const isFavorite = favorites.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();

    const defaultSize = product.sizes?.[0] || "Без размера";

    addToCart(
      {
        ...product,
        selectedSize: defaultSize,
        selectedColors: product.colors || [],
      },
      defaultSize
    );
  };

  const handleAddToFavorites = (e) => {
    e.stopPropagation();
    addToFavorites(product);
  };

  const handleNavigate = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex flex-col"
    >
      <img
        src={product.image}
        alt={product.name}
        onClick={handleNavigate}
        className="w-full h-40 object-contain rounded mb-4 cursor-pointer"
      />

      <h2
        onClick={handleNavigate}
        className="text-lg font-semibold mb-1 text-blue-600 hover:underline cursor-pointer"
      >
        {product.name}
      </h2>

      <p className="text-sm text-gray-500 mb-3">
        {product.price.toLocaleString()} сум
      </p>

      {product.sizes?.length > 0 && (
        <p className="text-xs text-gray-400 mb-2">
          Размеры: {product.sizes.join(", ")}
        </p>
      )}

      {product.colors?.length > 0 && (
        <p className="text-xs text-gray-400 mb-2">
          Цвета: {product.colors.join(", ")}
        </p>
      )}

      <div className="mt-auto flex justify-between items-center">
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm flex items-center gap-1 transition"
        >
          <ShoppingCart size={16} />В корзину
        </button>

        <button
          onClick={handleAddToFavorites}
          className={`text-red-500 hover:text-red-600 transition ${
            isFavorite ? "opacity-100" : "opacity-50"
          }`}
        >
          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
    </motion.div>
  );
}
