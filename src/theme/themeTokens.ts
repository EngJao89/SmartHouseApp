/**
 * Tokens do design system: cores, espaçamento e tipografia.
 */

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  backgroundSecondary: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  primaryContrast: string;
  success: string;
  successContrast: string;
  muted: string;
  mutedContrast: string;
  error: string;
  card: string;
  cardActive: string;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface ThemeTypography {
  title: { fontSize: number; fontWeight: '600' | '700' };
  body: { fontSize: number; fontWeight: '400' | '500' };
  caption: { fontSize: number; fontWeight: '400' };
  label: { fontSize: number; fontWeight: '500' };
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  borderRadius: number;
}

const spacing: ThemeSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const typography: ThemeTypography = {
  title: { fontSize: 24, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '500' },
  caption: { fontSize: 12, fontWeight: '400' },
  label: { fontSize: 16, fontWeight: '500' },
};

export const lightTheme: Theme = {
  colors: {
    background: '#ffffff',
    backgroundSecondary: '#f5f5f5',
    text: '#1a1a1a',
    textSecondary: '#666666',
    border: '#e0e0e0',
    primary: '#2196f3',
    primaryContrast: '#ffffff',
    success: '#4caf50',
    successContrast: '#ffffff',
    muted: '#9e9e9e',
    mutedContrast: '#ffffff',
    error: '#c62828',
    card: '#f0f0f0',
    cardActive: '#e8f5e9',
  },
  spacing,
  typography,
  borderRadius: 8,
};

export const darkTheme: Theme = {
  colors: {
    background: '#121212',
    backgroundSecondary: '#1e1e1e',
    text: '#f5f5f5',
    textSecondary: '#b0b0b0',
    border: '#333333',
    primary: '#42a5f5',
    primaryContrast: '#ffffff',
    success: '#66bb6a',
    successContrast: '#ffffff',
    muted: '#757575',
    mutedContrast: '#ffffff',
    error: '#ef5350',
    card: '#252525',
    cardActive: '#1b3d1f',
  },
  spacing,
  typography,
  borderRadius: 8,
};
