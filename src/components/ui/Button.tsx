import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius } = theme;

  const variantStyles: Record<ButtonVariant, { container: ViewStyle; text: TextStyle }> = {
    primary: {
      container: {
        backgroundColor: colors.primary,
        borderWidth: 0,
      },
      text: { color: colors.primaryContrast },
    },
    secondary: {
      container: {
        backgroundColor: colors.backgroundSecondary,
        borderWidth: 0,
      },
      text: { color: colors.text },
    },
    outline: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.primary,
      },
      text: { color: colors.primary },
    },
  };

  const v = variantStyles[variant];

  return (
    <TouchableOpacity
      style={[
        styles.base,
        {
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.lg,
          borderRadius,
          opacity: disabled ? 0.5 : 1,
        },
        v.container,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, v.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
