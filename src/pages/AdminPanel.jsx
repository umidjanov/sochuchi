import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../store/useStore";

const COLOR_OPTIONS = [
  "Яшил",
  "Сариқ",
  "Беживий",
  "Серий",
  "Сирен",
  "Индиго",
  "Оқ",
  "Бордовий",
];

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "Abdusattor" && password === "12345") {
      onLogin();
    } else {
      setError("Неверное имя пользователя или пароль");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Вход в админ-панель
        </h2>
        {error && <p className="mb-4 text-red-600 text-center">{error}</p>}
        <label className="block mb-1 font-medium">Имя пользователя</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded"
          required
        />
        <label className="block mb-1 font-medium">Пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 mb-6 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          Войти
        </button>
      </form>
    </div>
  );
}

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("add");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("towel");
  const [isNew, setIsNew] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [editId, setEditId] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [description, setDescription] = useState("");
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const products = useStore((state) => state.products);
  const addOrUpdateProduct = useStore((state) => state.addOrUpdateProduct);
  const removeProduct = useStore((state) => state.removeProduct);

  const towelSizes = ["30x30", "40x70", "50x90", "70x140", "100x150", "XL"];
  const robeSizesChildren = [
    "5 лет",
    "6 лет",
    "7 лет",
    "8 лет",
    "9 лет",
    "10 лет",
    "11 лет",
    "12 лет",
  ];
  const robeSizesAdults = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];
  const allSizes =
    category === "towel"
      ? towelSizes
      : [...robeSizesChildren, ...robeSizesAdults];

  useEffect(() => {
    const saved = localStorage.getItem("isLoggedIn");
    if (saved === "true") setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsLoadingImage(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setIsLoadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setImage("");
    setCategory("towel");
    setIsNew(false);
    setIsPopular(false);
    setEditId(null);
    setSizes([]);
    setColors([]);
    setDescription("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !name ||
      !price ||
      !image ||
      sizes.length === 0 ||
      colors.length === 0
    ) {
      alert("Пожалуйста, заполните все поля и выберите размеры и цвета.");
      return;
    }

    const newProduct = {
      id: editId || Date.now(),
      name,
      price: Number(price),
      image,
      category,
      isNew,
      isPopular,
      sizes,
      colors,
      description,
    };

    addOrUpdateProduct(newProduct);
    alert(editId ? "Товар обновлён!" : "Товар добавлен!");
    resetForm();
    setActiveTab("list");
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setCategory(product.category);
    setIsNew(product.isNew);
    setIsPopular(product.isPopular);
    setSizes(product.sizes || []);
    setColors(product.colors || []);
    setDescription(product.description || "");
    setActiveTab("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleValue = (value, array, setter) => {
    if (array.includes(value)) {
      setter(array.filter((v) => v !== value));
    } else {
      setter([...array, value]);
    }
  };

  if (!isLoggedIn) return <Login onLogin={handleLogin} />;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 64 : 256 }}
        className="bg-white border-r border-gray-200 flex flex-col transition-all duration-300"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2
            className={`text-2xl font-bold transition-all duration-300 overflow-hidden whitespace-nowrap ${
              sidebarCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            }`}
          >
            Saipov Admin
          </h2>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-gray-600 hover:text-gray-800"
          >
            {sidebarCollapsed ? "➡️" : "⬅️"}
          </button>
        </div>
        <nav className="flex flex-col flex-grow p-4 space-y-2 items-center">
          <button
            onClick={() => setActiveTab("add")}
            className={`px-4 py-2 rounded text-center ${
              activeTab === "add"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {!sidebarCollapsed
              ? editId
                ? "Редактировать"
                : "Добавить товар"
              : "➕"}
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`px-4 py-2 rounded text-left ${
              activeTab === "list"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {!sidebarCollapsed ? "Список товаров" : "📋"}
          </button>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 text-white py-3 mx-4 rounded mb-6 hover:bg-red-700"
        >
          {!sidebarCollapsed ? "Выйти" : "❌"}
        </button>
      </motion.aside>

      {/* Main */}
      <main className="flex-grow p-8 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "add" ? (
              <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                <h1 className="text-3xl font-bold">Добавить товар</h1>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Название"
                  className="w-full border px-3 py-2"
                  required
                />
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  placeholder="Цена"
                  className="w-full border px-3 py-2"
                  required
                />
                <input
                  onChange={handleImageUpload}
                  type="file"
                  accept="image/*"
                  className="w-full"
                  {...(editId ? {} : { required: true })}
                />
                {isLoadingImage && <p>Загрузка изображения...</p>}
                {image && (
                  <img
                    src={image}
                    alt="preview"
                    className="w-32 h-auto rounded"
                  />
                )}
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Описание товара"
                  className="w-full border px-3 py-2"
                  rows={3}
                />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border"
                >
                  <option value="towel">Полотенце</option>
                  <option value="robe">Халат</option>
                </select>

                <div className="flex gap-4 flex-wrap">
                  <label>
                    <input
                      type="checkbox"
                      checked={isNew}
                      onChange={(e) => setIsNew(e.target.checked)}
                    />{" "}
                    Новинка
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={isPopular}
                      onChange={(e) => setIsPopular(e.target.checked)}
                    />{" "}
                    Популярный
                  </label>
                </div>

                <div>
                  <label className="font-semibold block mb-2">Размеры</label>
                  <div className="flex flex-wrap gap-3">
                    {allSizes.map((size) => (
                      <label key={size} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={sizes.includes(size)}
                          onChange={() => toggleValue(size, sizes, setSizes)}
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-2">Цвета</label>
                  <div className="flex flex-wrap gap-3">
                    {COLOR_OPTIONS.map((color) => (
                      <label key={color} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={colors.includes(color)}
                          onChange={() => toggleValue(color, colors, setColors)}
                        />
                        {color}
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {editId ? "Обновить" : "Добавить"}
                </button>
              </form>
            ) : (
              <div>
                <h1 className="text-3xl font-bold mb-4">Список товаров</h1>
                {products.length === 0 ? (
                  <p>Нет товаров</p>
                ) : (
                  <table className="w-full text-sm border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th>Фото</th>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Категория</th>
                        <th>Флаги</th>
                        <th>Размеры</th>
                        <th>Цвета</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((item) => (
                        <tr key={item.id} className="border-t">
                          <td>
                            <img src={item.image} className="w-20" />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          <td>
                            {item.category === "robe" ? "Халат" : "Полотенце"}
                          </td>
                          <td>
                            {item.isNew && "Новинка "}{" "}
                            {item.isPopular && "Популярный"}
                          </td>
                          <td>{item.sizes?.join(", ") || "-"}</td>
                          <td>{item.colors?.join(", ") || "-"}</td>
                          <td>
                            <button
                              onClick={() => handleEdit(item)}
                              className="text-yellow-600 mr-2"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => removeProduct(item.id)}
                              className="text-red-600"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
