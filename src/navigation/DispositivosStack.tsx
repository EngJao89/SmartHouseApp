import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { DispositivosStackParamList } from './types';
import { DeviceDetailScreen } from '../screens/DeviceDetailScreen';
import { DispositivosListScreen } from '../screens/DispositivosListScreen';

const Stack = createNativeStackNavigator<DispositivosStackParamList>();

export function DispositivosStack() {
  return (
    <Stack.Navigator
      initialRouteName="DispositivosList"
      screenOptions={{ headerShown: true }}
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
