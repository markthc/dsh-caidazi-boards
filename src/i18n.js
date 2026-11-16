import english from "./locales/en.json" with { type: "json" };

export const languageStorageKey = "caidazi-boards:language";

export function resolveLanguage(preference = "system", languages = []) {
  if (preference === "zh" || preference === "en") return preference;
  for (const language of languages) {
    if (/^zh(?:-|$)/i.test(language)) return "zh";
    if (/^en(?:-|$)/i.test(language)) return "en";
  }
  return "en";
}

export function readLanguagePreference(storage) {
  try {
    const value = storage?.getItem(languageStorageKey);
    if (["system", "zh", "en"].includes(value)) return value;
  } catch {}
  return "system";
}

export function translate(text, language, parameters = {}, messages = {}) {
  if (typeof text !== "string") return text;
  let value = text;
  if (language === "en") {
    if (Object.hasOwn(messages, text)) value = messages[text];
    else if (Object.hasOwn(english, text)) value = english[text];
  }
  return value.replace(/\{(\w+)\}/g, (match, key) =>
    parameters[key] === undefined ? match : String(parameters[key]),
  );
}

export function localizeContent(value, language, messages = {}) {
  if (language !== "en") return value;
  if (typeof value === "string") return translate(value, language, {}, messages);
  if (Array.isArray(value)) return value.map(item => localizeContent(item, language, messages));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) =>
      [key, localizeContent(item, language, messages)],
    ));
  }
  return value;
}

export const numberLocale = language => language === "zh" ? "zh-CN" : "en-US";

export function formatQuotePrice(value, language) {
  if (language !== "en" || typeof value !== "string") return value;
  const match = value.match(/^([\d,.]+)\s*(美元|港元|元)$/);
  if (!match) return value;
  return `${{ 美元: "USD", 港元: "HKD", 元: "CNY" }[match[2]]} ${match[1]}`;
}

export function untranslatedStrings(value, messages = english) {
  const missing = new Set();
  function visit(item) {
    if (typeof item === "string" && /\p{Script=Han}/u.test(item) && !Object.hasOwn(messages, item)) missing.add(item);
    if (item && typeof item === "object") {
      for (const [key, child] of Object.entries(item)) if (key !== "nameZh") visit(child);
    }
  }
  visit(value);
  return [...missing];
}

export function formatTime(value, language) {
  const date = new Date(value);
  if (!value || !Number.isFinite(date.getTime())) return "";
  return date.toLocaleString(numberLocale(language), {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false,
  });
}
