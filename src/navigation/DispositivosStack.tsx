import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { DispositivosStackParamList } from './types';
import { DeviceDetailScreen } from '../screens/DeviceDetailScreen';
import { DispositivosListScreen } from '../screens/DispositivosListScreen';
import { useTheme } from '../theme/ThemeContext';

const Stack = createNativeStackNavigator<DispositivosStackParamList>();

export function DispositivosStack() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="DispositivosList"
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.text,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen
        name="DispositivosList"
        component={DispositivosListScreen}
        options={{ title: 'Dispositivos' }}
      />
      <Stack.Screen
        name="DeviceDetail"
        component={DeviceDetailScreen}
        options={({ route }) => ({
          title: route.params.deviceName ?? 'Detalhe',
        })}
      />
    </Stack.Navigator>
  );
}
