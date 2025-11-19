import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      products: [],
      cart: [],
      favorites: [],

      // ✅ Добавление или обновление товара
      addOrUpdateProduct: (product) => {
        const { products } = get()
        const updated = products.some((p) => p.id === product.id)
          ? products.map((p) => (p.id === product.id ? product : p))
          : [...products, product]

        set({ products: updated })
      },

      // ❌ Удаление товара
      removeProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }))
      },

      // 🛒 Добавление в корзину (поддержка цветов, размеров, количества)
      addToCart: (product, selectedSize, selectedColors, quantity = 1) => {
        const state = get()
        if (!product?.id) return

        const colors = Array.isArray(selectedColors) ? selectedColors : [selectedColors]
        const updatedCart = [...state.cart]

        colors.forEach((color) => {
          const key = `${product.id}-${selectedSize}-${color}`
          const exists = updatedCart.find((item) => item.key === key)

          if (exists) {
            exists.quantity += quantity
          } else {
            updatedCart.push({
              key,
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              selectedSize,
              selectedColor: color,
              quantity,
            })
          }
        })

        set({ cart: updatedCart })
      },

      // 🔄 Обновление количества товара
      updateCartQuantity: (key, amount) => {
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.key === key
                ? { ...item, quantity: item.quantity + amount }
                : item
            )
            .filter((item) => item.quantity > 0),
        }))
      },

      // 🗑️ Удаление из корзины
      removeFromCart: (key) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.key !== key),
        }))
      },

      // 🧹 Очистка корзины
      clearCart: () => {
        set({ cart: [] })
      },

      // ❤️ Добавление в избранное / удаление
      addToFavorites: (product) => {
        if (!product?.id) return

        const { favorites } = get()
        const exists = favorites.find((item) => item.id === product.id)

        const updated = exists
          ? favorites.filter((item) => item.id !== product.id)
          : [...favorites, product]

        set({ favorites: updated })
      },

      // ❌ Удаление из избранного по id
      removeFromFavorites: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== id),
        }))
      },

      // 🔢 Общее количество товаров в корзине
      getTotalQuantity: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0)
      },

      // 🔍 Проверка — есть ли товар в избранном
      isFavorite: (id) => {
        return get().favorites.some((item) => item.id === id)
      },
    }),
    {
      name: 'saipov-store',
      partialize: (state) => ({
        products: state.products,
        cart: state.cart,
        favorites: state.favorites,
      }),
    }
  )
)

export default useStore
