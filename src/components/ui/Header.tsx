import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface HeaderProps {
  readonly title: string;
  readonly right?: React.ReactNode;
}

export function Header({ title, right }: HeaderProps) {
  const { theme } = useTheme();
  const { colors, spacing, typography } = theme;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: colors.text,
            fontSize: typography.title.fontSize,
            fontWeight: typography.title.fontWeight,
          },
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>
      {right != null && <View style={styles.right}>{right}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  title: {
    flex: 1,
  },
  right: {
    marginLeft: 8,
  },
});
