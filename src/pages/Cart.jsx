import useStore from "../store/useStore";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Cart() {
  const { t } = useTranslation();
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateCartQuantity = useStore((state) => state.updateCartQuantity);
  const clearCart = useStore((state) => state.clearCart);

  const [deletedItem, setDeletedItem] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleDelete = (key) => {
    const item = cart.find((i) => i.key === key);
    setDeletedItem(item?.name || null);
    removeFromCart(key);
    setTimeout(() => setDeletedItem(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t("cart.title")}</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">{t("cart.empty")}</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 border p-4 rounded shadow-sm bg-white"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain border rounded bg-white"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-gray-500">
                    {item.price.toLocaleString()} {t("cart.currency")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t("cart.size")}: {item.selectedSize}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t("cart.color")}: {item.selectedColor}
                  </p>
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => updateCartQuantity(item.key, -1)}
                      className="px-2 py-1 text-sm border rounded"
                    >
                      –
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.key, 1)}
                      className="px-2 py-1 text-sm border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item.key)}
                  className="text-red-600 hover:underline text-sm"
                >
                  {t("cart.remove")}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4 text-right">
            <p className="text-xl font-semibold mb-4">
              {t("cart.total")}: {total.toLocaleString()} {t("cart.currency")}
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={clearCart}
                className="text-sm text-gray-600 underline"
              >
                {t("cart.clear")}
              </button>
              <button
                onClick={() => {
                  alert(t("cart.orderAlert"));
                  clearCart();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                {t("cart.checkout")}
              </button>
            </div>
          </div>

          {deletedItem && (
            <div className="mt-6 text-center text-red-500 font-semibold animate-pulse">
              {t("cart.deleted", { name: deletedItem })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
