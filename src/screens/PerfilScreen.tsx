import { StyleSheet, Text, View, Switch } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Header } from '../components/ui';

export function PerfilScreen() {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Header
        title="Perfil"
        right={
          <View style={styles.themeRow}>
            <Text
              style={[
                styles.themeLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              {isDark ? 'Escuro' : 'Claro'}
            </Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary,
              }}
              thumbColor={theme.colors.primaryContrast}
            />
          </View>
        }
      />
      <View
        style={[
          styles.content,
          {
            padding: theme.spacing.md,
          },
        ]}
      >
        <Text
          style={[
            styles.placeholder,
            {
              color: theme.colors.textSecondary,
              fontSize: theme.typography.body.fontSize,
            },
          ]}
        >
          Configurações e conta.
        </Text>
        <Text
          style={[
            styles.hint,
            {
              color: theme.colors.textSecondary,
              marginTop: theme.spacing.lg,
              fontSize: theme.typography.caption.fontSize,
            },
          ]}
        >
          Use o interruptor acima para alternar entre tema claro e escuro.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  themeLabel: {
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  placeholder: {},
  hint: {},
});
