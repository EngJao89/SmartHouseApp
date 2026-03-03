import React, { createContext, useCallback, useMemo, useState } from 'react';
import type { Theme, ThemeMode } from './themeTokens';
import { darkTheme, lightTheme } from './themeTokens';

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [mode, setMode] = useState<ThemeMode>('light');

  const theme = mode === 'dark' ? darkTheme : lightTheme;
  const isDark = mode === 'dark';

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, mode, isDark, toggleTheme }),
    [theme, mode, isDark, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);
  if (context == null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
