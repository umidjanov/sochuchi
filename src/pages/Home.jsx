import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import towelsData from "../data/towels.json";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { ChevronUp, ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "Сколько длится доставка?",
    answer:
      "Доставка по Узбекистану занимает 1–3 рабочих дня в зависимости от региона.",
  },
  {
    question: "Можно ли вернуть товар?",
    answer:
      "Да, вы можете вернуть товар в течение 14 дней при наличии упаковки и чека.",
  },
  {
    question: "Как выбрать размер халата?",
    answer:
      "Вы можете воспользоваться нашей таблицей размеров на странице товара или связаться с консультантом.",
  },
];

export default function Home() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Ma'lumotlarni olish (API yoki lokaldan)
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Баннер */}
      <section className="bg-gradient-to-r from-blue-100 to-white py-20 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4"
        >
          {t("bannerTitle")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          {t("bannerSubtitle")}
        </motion.p>
      </section>

      {/* Категории */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          {t("categoriesTitle")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
          >
            <img
              src="media/sochiqqqq.png"
              alt={t("towelsTitle")}
              className="w-[100%] h-[200px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{t("towelsTitle")}</h3>
              <p className="text-sm text-gray-600 mb-4">{t("towelsDesc")}</p>
              <Link
                to="/towels"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                {t("goTo")}
              </Link>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
          >
            <img
              src="/images/robes-banner.jpg"
              alt={t("robesTitle")}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{t("robesTitle")}</h3>
              <p className="text-sm text-gray-600 mb-4">{t("robesDesc")}</p>
              <Link
                to="/robes"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                {t("goTo")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Новинки */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          {t("newArrivals")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {towelsData.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Популярные товары */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          {t("popularProducts")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {towelsData
            .filter((product) => product.isPopular)
            .slice(0, 6)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>

      {/* Отзывы */}
      <section className="bg-gray-50 py-16 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          {t("reviews")}
        </h2>

        <div className="max-w-5xl mx-auto relative">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 2500 }}
            // breakpoints={{
            //   640: { slidesPerView: 1 }
            // }}
          >
            {[
              {
                name: t("Hyatt Regency"),
                text: t(
                  "Sochiqlar va halatlar ajoyib! Yumshoqligi, sifati va nafisligi har bir mehmonni zavqlantiradi. Hyatt’da dam olish – bu haqiqiy hashamat!"
                ),
                image: "media/Hyat regency.png",
              },
              {
                name: t("Hilton Hotel"),
                text: t(
                  "Sochiqlar ipdek yumshoq, halatlar esa g‘oyat qulay va nafis. Hilton brendi har doim sifat va yuksak xizmatni anglatadi – bu gal ham istisno emas!"
                ),
                image: "media/Hilton.jpg",
              },
              {
                name: t("Intercontinental Hotel"),
                text: t(
                  "Halatlar tanani muloyimlik bilan o‘raydi, sochiqlar esa har bir foydalangandan keyin yangidek saqlanadi. Bunday darajadagi mahsulotlar – faqat Intercontinental’da bo‘lishi mumkin!"
                ),
                image: "media/InterContinental.jpg",
              },
              {
                name: t("Grand Mir Hotel"),
                text: t(
                  "Sochiqlar va halatlar nafaqat qulay, balki dizayni bilan ham mehmonxona atmosferasiga uyg‘un. Har bir detalda e’tibor va did mujassam."
                ),
                image: "media/Grand Mir hotel.gif",
              },
              {
                name: t("Buxoro Palace"),
                text: t(
                  "O‘zbekona mehmondo‘stlikka zamonaviy qulayliklar qo‘shilgan: sochiqlar gipoallergen, halatlar esa juda hashamatli. Mehmonlarimiz doim mamnun."
                ),
                image: "media/Buxoro.jpg",
              },
              {
                name: t("Sharq"),
                text: t(
                  "Sochiqlar – ipakday, halatlar – muloyim va klassik uslubda. Sharq mehmonxonasida har bir detal mehmonlar roziligi uchun xizmat qiladi."
                ),
                image: "media/Sharq.jpg",
              },
            ].map((review, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition h-[220px] flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <h4 className="font-semibold text-gray-800">
                      {review.name}
                    </h4>
                  </div>
                  <p className="text-gray-600 text-sm">{review.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* FAQ */}

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Часто задаваемые вопросы
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 transition"
              >
                <span className="font-semibold text-left text-gray-800">
                  {faq.question}
                </span>
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 py-3 text-gray-700 bg-white"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
