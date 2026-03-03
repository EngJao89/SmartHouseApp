import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type { RootTabParamList } from './types';
import { DispositivosStack } from './DispositivosStack';
import { AutomacoesScreen } from '../screens/AutomacoesScreen';
import { PerfilScreen } from '../screens/PerfilScreen';
import { useTheme } from '../theme/ThemeContext';

const Tab = createBottomTabNavigator<RootTabParamList>();

interface TabBarIconProps {
  readonly focused: boolean;
  readonly color: string;
  readonly size: number;
  readonly activeName: string;
  readonly outlineName: string;
}

function TabBarIcon({ focused, color, size, activeName, outlineName }: TabBarIconProps) {
  return (
    <Ionicons
      name={(focused ? activeName : outlineName) as never}
      size={size}
      color={color}
    />
  );
}

interface TabIconProps {
  readonly focused: boolean;
  readonly color: string;
  readonly size: number;
}

function DispositivosTabIcon(props: TabIconProps) {
  return <TabBarIcon {...props} activeName="home" outlineName="home-outline" />;
}

function AutomacoesTabIcon(props: TabIconProps) {
  return <TabBarIcon {...props} activeName="flash" outlineName="flash-outline" />;
}

function PerfilTabIcon(props: TabIconProps) {
  return <TabBarIcon {...props} activeName="person" outlineName="person-outline" />;
}

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
        options={{ tabBarLabel: 'Dispositivos', tabBarIcon: DispositivosTabIcon }}
      />
      <Tab.Screen
        name="Automacoes"
        component={AutomacoesScreen}
        options={{ tabBarLabel: 'Automações', tabBarIcon: AutomacoesTabIcon }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{ tabBarLabel: 'Perfil', tabBarIcon: PerfilTabIcon }}
      />
    </Tab.Navigator>
  );
}
