import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RootTabParamList } from './types';
import { DispositivosStack } from './DispositivosStack';
import { AutomacoesScreen } from '../screens/AutomacoesScreen';
import { PerfilScreen } from '../screens/PerfilScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 12 },
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
