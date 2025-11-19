import { useStore } from "../context/StoreContext";
import { useTranslation } from "react-i18next";

export default function Favorites() {
  const { t } = useTranslation();
  const { favorites, removeFromFavorites, addToCart } = useStore();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {t("favorites.title")}
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600">{t("favorites.empty")}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow bg-white relative"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="mt-3 text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600">
                {product.price.toLocaleString()} {t("favorites.currency")}
              </p>

              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={() => removeFromFavorites(product.id)}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  {t("favorites.remove")}
                </button>

                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                  {t("favorites.addToCart")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
