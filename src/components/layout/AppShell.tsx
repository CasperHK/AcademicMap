import type { Component } from "solid-js";
import { JSX } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import type { Locale } from "~/types/graph";
import { UI_COPY, parseLocale } from "~/lib/i18n";

interface AppShellProps {
  locale: Locale;
  children: JSX.Element;
}

const AppShell: Component<AppShellProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const copy = () => UI_COPY[props.locale];

  const setLocale = (value: Locale) => {
    setSearchParams({
      ...searchParams,
      lang: value,
    });
  };

  return (
    <div class="flex h-screen flex-col bg-slate-900 text-white">
      <header class="flex items-center justify-between border-b border-slate-700 px-6 py-3">
        <div class="flex items-center gap-3">
          <h1 class="text-xl font-semibold tracking-wide">🎓 {copy().title}</h1>
          <span class="text-sm text-slate-400">{copy().subtitle}</span>
        </div>

        <div class="flex items-center gap-2 text-xs">
          <span class="text-slate-400">{copy().langLabel}</span>
          <button
            class={`rounded border px-2 py-1 transition ${
              props.locale === "en"
                ? "border-cyan-400 bg-cyan-500/20 text-cyan-200"
                : "border-slate-600 text-slate-300 hover:border-slate-500"
            }`}
            onClick={() => setLocale(parseLocale("en"))}
            type="button"
          >
            {copy().enLabel}
          </button>
          <button
            class={`rounded border px-2 py-1 transition ${
              props.locale === "zh-HK"
                ? "border-cyan-400 bg-cyan-500/20 text-cyan-200"
                : "border-slate-600 text-slate-300 hover:border-slate-500"
            }`}
            onClick={() => setLocale(parseLocale("zh-HK"))}
            type="button"
          >
            {copy().zhHkLabel}
          </button>
        </div>
      </header>

      <main class="flex flex-1 overflow-hidden">
        {props.children}
      </main>
    </div>
  );
};

export default AppShell;
