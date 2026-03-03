import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RootTabParamList } from './types';
import { DispositivosStack } from './DispositivosStack';
import { AutomacoesScreen } from '../screens/AutomacoesScreen';
import { PerfilScreen } from '../screens/PerfilScreen';
import { useTheme } from '../theme/ThemeContext';

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}
    >
      <Tab.Screen
        name="Dispositivos"
        component={DispositivosStack}
        options={{ tabBarLabel: 'Dispositivos' }}
      />
      <Tab.Screen
        name="Automacoes"
        component={AutomacoesScreen}
        options={{ tabBarLabel: 'Automações' }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{ tabBarLabel: 'Perfil' }}
      />
    </Tab.Navigator>
  );
}
