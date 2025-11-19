import useStore from "../store/useStore";
import { useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Towels() {
  const products = useStore((state) => state.products);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Фильтруем товары по категории "towel"
  const towels = products.filter((p) => p.category === "towel");

  // Фильтрация по цене
  const filtered = towels.filter((product) => {
    const meetsMin = minPrice === "" || product.price >= Number(minPrice);
    const meetsMax = maxPrice === "" || product.price <= Number(maxPrice);
    return meetsMin && meetsMax;
  });

  // Сортировка
  const sorted = [...filtered].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Полотенца</h1>

      {/* Фильтрация и сортировка */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <input
          type="number"
          placeholder="Мин. цена"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-40"
        />
        <input
          type="number"
          placeholder="Макс. цена"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-40"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-48"
        >
          <option value="">Без сортировки</option>
          <option value="price-asc">Цена: по возрастанию</option>
          <option value="price-desc">Цена: по убыванию</option>
          <option value="name-asc">Название: A–Z</option>
          <option value="name-desc">Название: Z–A</option>
        </select>
      </div>

      {/* Вывод товаров */}
      {sorted.length === 0 ? (
        <p className="text-gray-600">Нет товаров по выбранным параметрам.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
