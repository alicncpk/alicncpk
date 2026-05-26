"use client";

import React, { createContext, useContext, ReactNode } from "react";
import enJson from "../locales/en.json";

type Dictionary = typeof enJson;

interface TranslationContextType {
  language: string;
  loading: boolean;
  t: (key: string) => string;
  changeLanguage: (lang: string) => Promise<void>;
  supportedLanguages: { code: string; name: string; nativeName: string; flag: string }[];
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const language = "en";
  const loading = false;
  const supportedLanguages = [{ code: "en", name: "English", nativeName: "English", flag: "🇺🇸" }];

  const changeLanguage = async (lang: string) => {
    // No-op: only English is supported now
  };

  // Helper to resolve dot notation nested keys in en.json
  const t = (key: string): string => {
    const parts = key.split(".");
    let current: any = enJson;
    
    for (const part of parts) {
      if (current == null || typeof current !== "object") {
        current = null;
        break;
      }
      current = current[part];
    }

    if (typeof current === "string") {
      return current;
    }

    return key;
  };

  return (
    <TranslationContext.Provider
      value={{
        language,
        loading,
        t,
        changeLanguage,
        supportedLanguages,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
