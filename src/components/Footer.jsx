import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-100 text-gray-700 mt-8">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Brend */}
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {/* Saipov <span className="text-blue-600">Group</span> */}
            <img src="media/image 2.png" alt="" />
          </h2>
          <p className="mt-2 text-sm">{t("footer.brandDesc")}</p>
        </div>

        {/* Navigatsiya */}
        <div>
          <h3 className="font-semibold mb-2">{t("footer.navigation")}</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-600">
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link to="/towels" className="hover:text-blue-600">
                {t("nav.towels")}
              </Link>
            </li>
            <li>
              <Link to="/robes" className="hover:text-blue-600">
                {t("nav.robes")}
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-600">
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600">
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Kontaktlar */}
        <div>
          <h3 className="font-semibold mb-2">{t("footer.contacts")}</h3>
          <p className="text-sm">
            📞 +998 90 123 45 67
            <br />
            ✉️ info@saipovgroup.uz
            <br />
            📍 {t("footer.location")}
          </p>
        </div>
      </div>

      <div className="bg-gray-200 text-center text-sm py-4">
        © {new Date().getFullYear()} Saipov Group. {t("footer.rights")}
      </div>
    </footer>
  );
}
