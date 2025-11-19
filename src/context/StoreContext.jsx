import { createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);

  // Загрузка из localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

    setCart(storedCart);
    setFavorites(storedFavorites);
    setProducts(storedProducts);
  }, []);

  // Сохраняем изменения
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Ошибка при сохранении cart:", error);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Ошибка при сохранении favorites:", error);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem("products", JSON.stringify(products));
    } catch (error) {
      console.error("Ошибка при сохранении products:", error);
    }
  }, [products]);

  // 📦 ТОВАРЫ
  const addOrUpdateProduct = (product) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      return exists
        ? prev.map((p) => (p.id === product.id ? product : p))
        : [...prev, product];
    });
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // 🛒 КОРЗИНА
  const addToCart = (product, selectedSize) => {
    if (!selectedSize) {
      alert("Пожалуйста, выберите размер перед добавлением в корзину.");
      return;
    }

    setCart((prev) => {
      const exists = prev.find(
        (item) => item.id === product.id && item.size === selectedSize
      );
      if (exists) {
        return prev.map((item) =>
          item.id === product.id && item.size === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { id: product.id, size: selectedSize, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id, size) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // ❤️ ИЗБРАННОЕ
  const addToFavorites = (product) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, { id: product.id }];
    });
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        favorites,
        products,
        setProducts,
        addToCart,
        removeFromCart,
        clearCart,
        addToFavorites,
        removeFromFavorites,
        addOrUpdateProduct,
        removeProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
