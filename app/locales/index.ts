import CN from "./cn";
import CS from "./cs";
import DE from "./de";
import EN from "./en";
import ES from "./es";
import FR from "./fr";
import IT from "./it";
import JP from "./jp";
import RU from "./ru";
import TR from "./tr";
import TW from "./tw";
import VI from "./vi";

export type { LocaleType } from "./cn";

export const AllLangs = [
  "en",
  "cn",
  "tw",
  "fr",
  "es",
  "it",
  "tr",
  "jp",
  "de",
  "vi",
  "ru",
  "cs",
] as const;
export type Lang = (typeof AllLangs)[number];

const LANG_KEY = "lang";
const DEFAULT_LANG = "cn";

function getItem(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setItem(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function getLanguage() {
  try {
    return navigator.language.toLowerCase();
  } catch {
    console.log("[Lang] failed to detect user lang.");
    return DEFAULT_LANG;
  }
}

export function getLang(): Lang {
  const savedLang = getItem(LANG_KEY);

  if (AllLangs.includes((savedLang ?? "") as Lang)) {
    return savedLang as Lang;
  }

  const lang = getLanguage();

  for (const option of AllLangs) {
    if (lang.includes(option)) {
      return option;
    }
  }

  return DEFAULT_LANG;
}

export function changeLang(lang: Lang) {
  setItem(LANG_KEY, lang);
  location.reload();
}

export default {
  en: EN,
  cn: CN,
  tw: TW,
  fr: FR,
  es: ES,
  it: IT,
  tr: TR,
  jp: JP,
  de: DE,
  vi: VI,
  ru: RU,
  cs: CS,
}[getLang()] as typeof CN;
