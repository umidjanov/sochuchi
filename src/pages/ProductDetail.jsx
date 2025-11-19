import { useParams } from "react-router-dom";
import useStore from "../store/useStore"; // Если ты перешёл на Zustand, замени на ../store/useStore
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart } = useStore();
  const [selectedSize, setSelectedSize] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' или 'error'

  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <div className="p-8 text-center text-red-600 text-lg">
        Товар не найден
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setMessage("Пожалуйста, выберите размер");
      setMessageType("error");
      return;
    }

    addToCart({ ...product, selectedSize });
    setMessage("✅ Добавлено в корзину!");
    setMessageType("success");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-contain rounded border bg-white"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-4">
            {product.price.toLocaleString()} сум
          </p>

          {/* Размеры */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Выберите размер:</label>
            <div className="flex gap-2 flex-wrap">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setMessage("");
                    setMessageType("");
                  }}
                  className={`px-3 py-1 rounded border transition ${
                    selectedSize === size
                      ? "bg-blue-600 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {message && (
              <p
                className={`mt-2 text-sm ${
                  messageType === "error" ? "text-red-600" : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
}
