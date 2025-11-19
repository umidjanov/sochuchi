import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import useStore from "../store/useStore";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../media/sochu-removebg-preview.png"

export default function Header() {
  const { favorites, getTotalQuantity } = useStore();
  const totalItems = getTotalQuantity();
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const [scrollingUp, setScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setShowShadow(currentScrollY > 10);
      setScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const validFavorites = favorites.filter(
    (item) => item && typeof item.id === "number" && !isNaN(item.id)
  );

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/towels", label: t("nav.towels") },
    { to: "/robes", label: t("nav.robes") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={`bg-white sticky top-0 z-50 transform transition-all duration-300 ${
        scrollingUp ? "translate-y-0" : "-translate-y-full"
      }`}
      style={
        showShadow ? { boxShadow: "0px 10px 50px rgba(0, 0, 0, 0.1)" } : {}
      }
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Логотип */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-700 flex items-center gap-2"
        >
          <img className="w-[50px]" src={logo} alt="" />
        </Link>

        {/* Навигация (десктоп) */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              {link.label}
            </Link>
          ))}

          {/* Til tanlovchi */}
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
            className="border border-gray-300 text-sm rounded px-2 py-1 focus:outline-none"
            aria-label="Select language"
          >
            <option value="uz">UZ</option>
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>
        </nav>

        {/* Iconlar */}
        <div className="flex items-center gap-4 relative">
          <Link
            to="/favorites"
            className="relative text-gray-700 hover:text-red-500"
          >
            <Heart className="w-6 h-6" />
            {validFavorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full animate-bounce">
                {validFavorites.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-blue-600"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full animate-bounce">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Burger menyu tugmasi (mobil) */}
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Открыть меню"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              {link.label}
            </Link>
          ))}

          {/* Til tanlovchi (mobil) */}
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
            className="w-full border border-gray-300 text-sm rounded px-2 py-1 mt-2"
            aria-label="Tilni tanlang"
          >
            <option value="uz">UZ</option>
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>
        </div>
      )}
    </header>
  );
}
