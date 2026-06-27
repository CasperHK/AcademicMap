import type { Component } from "solid-js";
import { JSX } from "solid-js";

interface AppShellProps {
  children: JSX.Element;
}

const AppShell: Component<AppShellProps> = (props) => {
  return (
    <div class="flex h-screen flex-col bg-slate-900 text-white">
      <header class="flex items-center border-b border-slate-700 px-6 py-3">
        <h1 class="text-xl font-semibold tracking-wide">
          🎓 Academic Map
        </h1>
        <span class="ml-3 text-sm text-slate-400">
          學術體系關係圖
        </span>
      </header>

      <main class="flex flex-1 overflow-hidden">
        {props.children}
      </main>
    </div>
  );
};

export default AppShell;
