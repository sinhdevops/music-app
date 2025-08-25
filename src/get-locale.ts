import "server-only";
import type { Locale } from "./configs/i18n-config";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const locales = {
	en: () => import("../locales/en.json").then((module) => module.default),
	vi: () => import("../locales/vi.json").then((module) => module.default),
};

export const getLocales = async (locale: Locale) => locales[locale]?.() ?? locales.en();
