import React, { createContext, useContext, useEffect, useState } from "react";
import { languageStorageKey, readLanguagePreference, resolveLanguage, translate } from "./i18n.js";

const LanguageContext = createContext(null);
const systemLanguages = () => navigator.languages?.length ? navigator.languages : [navigator.language];

export function LanguageProvider({ children }) {
  const [preference, setPreference] = useState(() => {
    try { return readLanguagePreference(window.localStorage); } catch { return "system"; }
  });
  const [languages, setLanguages] = useState(systemLanguages);
  useEffect(() => {
    const changed = () => setLanguages(systemLanguages());
    const stored = event => {
      if (event.key === languageStorageKey || event.key === null) {
        setPreference(readLanguagePreference(event.storageArea));
      }
    };
    window.addEventListener("languagechange", changed);
    window.addEventListener("storage", stored);
    return () => {
      window.removeEventListener("languagechange", changed);
      window.removeEventListener("storage", stored);
    };
  }, []);
  const language = resolveLanguage(preference, languages);
  function selectLanguage(value) {
    if (!["system", "zh", "en"].includes(value)) return;
    setPreference(value);
    try { window.localStorage.setItem(languageStorageKey, value); } catch {}
  }
  const t = (text, parameters) => translate(text, language, parameters);
  return <LanguageContext.Provider value={{ language, preference, selectLanguage, t }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);

export function LanguageSelector() {
  const { t, preference, selectLanguage } = useLanguage();
  return <label className="language-select">
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z" />
    </svg>
    <select aria-label="语言 / Language" value={preference} onChange={event => selectLanguage(event.target.value)}>
      <option value="system">{t("跟随系统")}</option>
      <option value="zh">简体中文</option>
      <option value="en">English</option>
    </select>
  </label>;
}
