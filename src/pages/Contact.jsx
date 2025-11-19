import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setSent(true);
  //   setFormData({ name: '', email: '', message: '' });
  //   setTimeout(() => setSent(false), 3000);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // foydalanuvchi ma'lumotlari konsolga chiqadi
    setSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {t("contact.title")}
      </h1>

      <div className="mb-8 text-gray-700 space-y-2">
        <p>
          📧 {t("contact.email")}:{" "}
          <a
            href="mailto:info@saipovgroup.uz"
            className="text-blue-600 hover:underline"
          >
            info@saipovgroup.uz
          </a>
        </p>
        <p>📞 {t("contact.phone")}: +998 90 123 45 67</p>
        <p>
          📍 {t("contact.address")}: {t("contact.city")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-sm">
            {t("contact.nameLabel")}
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm">
            {t("contact.messageLabel")}
          </label>
          <textarea
            name="message"
            required
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
        >
          {t("contact.submit")}
        </button>
      </form>

      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 text-green-600 font-semibold"
          >
            ✅ {t("contact.success")}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
