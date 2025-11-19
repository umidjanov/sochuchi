import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {t("about.title")}
      </h1>

      <p className="text-gray-700 leading-relaxed mb-4">
        <strong>Saipov Group</strong> — {t("about.p1")}
      </p>

      <p className="text-gray-700 leading-relaxed mb-4">{t("about.p2")}</p>

      <p className="text-gray-700 leading-relaxed mb-4">{t("about.p3")}</p>

      <p className="text-gray-700 leading-relaxed">{t("about.p4")}</p>
    </div>
  );
}
