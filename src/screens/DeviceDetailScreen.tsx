import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import type { DispositivosStackParamList } from '../navigation/types';

type DeviceDetailRouteProp = RouteProp<
  DispositivosStackParamList,
  'DeviceDetail'
>;

export function DeviceDetailScreen() {
  const route = useRoute<DeviceDetailRouteProp>();
  const { deviceId, deviceName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhe do dispositivo</Text>
      <Text style={styles.label}>Nome</Text>
      <Text style={styles.value}>{deviceName ?? '—'}</Text>
      <Text style={styles.label}>ID</Text>
      <Text style={styles.value}>{deviceId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    marginBottom: 16,
  },
});
