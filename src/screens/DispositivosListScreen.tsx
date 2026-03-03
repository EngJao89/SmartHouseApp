import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { DispositivosStackParamList } from '../navigation/types';

type DispositivosListNavigationProp = NativeStackNavigationProp<
  DispositivosStackParamList,
  'DispositivosList'
>;

const DEVICES_MOCK = [
  { id: '1', name: 'Lâmpada Sala' },
  { id: '2', name: 'Ar-condicionado' },
  { id: '3', name: 'Sensor Porta' },
];

export function DispositivosListScreen() {
  const navigation = useNavigation<DispositivosListNavigationProp>();

  const openDetail = useCallback(
    (deviceId: string, deviceName: string) => {
      navigation.navigate('DeviceDetail', { deviceId, deviceName });
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dispositivos</Text>
      {DEVICES_MOCK.map((device) => (
        <TouchableOpacity
          key={device.id}
          style={styles.item}
          onPress={() => openDetail(device.id, device.name)}
          activeOpacity={0.7}
        >
          <Text style={styles.itemText}>{device.name}</Text>
          <Text style={styles.itemSubtext}>ID: {device.id}</Text>
        </TouchableOpacity>
      ))}
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
    marginBottom: 16,
  },
  item: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
