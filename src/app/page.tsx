"use client";

import { I18nProvider } from "@/lib/i18n";
import TerminalApp from "@/components/terminal/TerminalApp";

export default function Home() {
  return (
    <I18nProvider>
      <TerminalApp />
    </I18nProvider>
  );
}
