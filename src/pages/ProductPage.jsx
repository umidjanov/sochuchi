import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useStore from "../store/useStore";

const colorsList = [
  "Яшил",
  "Сариқ",
  "Беживий",
  "Серий",
  "Сирен",
  "Индиго",
  "Оқ",
  "Бордовий",
];

export default function ProductPage() {
  const { id } = useParams();
  const product = useStore((state) =>
    state.products.find((p) => p.id === Number(id))
  );

  const addToCart = useStore((state) => state.addToCart);
  const addToFavorites = useStore((state) => state.addToFavorites);
  const favorites = useStore((state) => state.favorites);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const ageSizes = product?.sizes?.filter((s) => s.includes("лет"));
  const otherSizes = product?.sizes?.filter((s) => !s.includes("лет"));

  useEffect(() => {
    setSelectedSize("");
    setSelectedAge("");
    setSelectedColors([]);
  }, [product]);

  if (!product) return <p className="p-6">Товар не найден.</p>;

  const handleColorToggle = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleAddToCart = () => {
    if (otherSizes.length > 0 && !selectedSize) {
      alert("Выберите размер.");
      return;
    }

    if (ageSizes.length > 0 && !selectedAge) {
      alert("Выберите возраст.");
      return;
    }

    if (selectedColors.length === 0) {
      alert("Выберите хотя бы один цвет.");
      return;
    }

    const finalSize = selectedSize || selectedAge;

    selectedColors.forEach((color) => {
      addToCart({ ...product }, finalSize, color, quantity);
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const isFavorite = favorites.some((f) => f.id === product.id);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 text-lg mb-2">
            {product.price.toLocaleString()} сум
          </p>

          {product.description && (
            <p className="mb-4 text-gray-600">{product.description}</p>
          )}

          {/* Размер */}
          {otherSizes.length > 0 && (
            <div className="mb-6">
              <p className="font-semibold mb-1">Выберите размер:</p>
              <div className="flex flex-wrap gap-2">
                {otherSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded border ${
                      selectedSize === size ? "bg-blue-600 text-white" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Возраст */}
          {ageSizes.length > 0 && (
            <div className="mb-6">
              <p className="font-semibold mb-1">Выберите возраст:</p>
              <div className="flex flex-wrap gap-2">
                {ageSizes.map((age) => (
                  <button
                    key={age}
                    onClick={() => setSelectedAge(age)}
                    className={`px-3 py-1 rounded border ${
                      selectedAge === age ? "bg-purple-600 text-white" : ""
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Цвета */}
          <div className="mb-6">
            <p className="font-semibold mb-1">Выберите цвета:</p>
            <div className="flex flex-wrap gap-2">
              {colorsList.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorToggle(color)}
                  className={`px-3 py-1 rounded border ${
                    selectedColors.includes(color)
                      ? "bg-green-500 text-white"
                      : ""
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Количество */}
          <div className="mb-6">
            <p className="font-semibold mb-1">Количество:</p>
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 border rounded"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <span className="min-w-[32px] text-center">{quantity}</span>
              <button
                className="px-2 py-1 border rounded"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Добавить в корзину
            </button>

            <button
              onClick={() => addToFavorites(product)}
              className={`text-2xl ${
                isFavorite ? "text-red-500" : "text-gray-400"
              }`}
              title="Добавить в избранное"
            >
              ❤️
            </button>
          </div>

          {/* Уведомление */}
          {added && (
            <div className="mt-4 text-green-600 font-semibold animate-pulse">
              ✅ Товар добавлен в корзину!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
