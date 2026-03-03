import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { DispositivosStackParamList } from '../navigation/types';
import { setDevices } from '../store/devicesSlice';
import { useGetDevicesQuery } from '../store/devicesApi';
import type { RootState } from '../store';

type DispositivosListNavigationProp = NativeStackNavigationProp<
  DispositivosStackParamList,
  'DispositivosList'
>;

export function DispositivosListScreen() {
  const navigation = useNavigation<DispositivosListNavigationProp>();
  const dispatch = useDispatch();
  const devices = useSelector((state: RootState) => state.devices.items);
  const { data: apiDevices, isSuccess } = useGetDevicesQuery();

  useEffect(() => {
    if (isSuccess && apiDevices) {
      dispatch(setDevices(apiDevices));
    }
  }, [isSuccess, apiDevices, dispatch]);

  const openDetail = useCallback(
    (deviceId: string, deviceName: string) => {
      navigation.navigate('DeviceDetail', { deviceId, deviceName });
    },
    [navigation],
  );

  if (devices.length === 0 && !isSuccess) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Carregando dispositivos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dispositivos</Text>
      {devices.map((device) => (
        <TouchableOpacity
          key={device.id}
          style={[styles.item, device.on && styles.itemOn]}
          onPress={() => openDetail(device.id, device.name)}
          activeOpacity={0.7}
        >
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>{device.name}</Text>
            <Text style={[styles.badge, device.on ? styles.badgeOn : styles.badgeOff]}>
              {device.on ? 'Ligado' : 'Desligado'}
            </Text>
          </View>
          <Text style={styles.itemSubtext}>
            ID: {device.id}
            {device.brightness != null && ` • ${device.brightness}%`}
          </Text>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
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
  itemOn: {
    backgroundColor: '#e8f5e9',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  badge: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeOn: {
    backgroundColor: '#4caf50',
    color: '#fff',
  },
  badgeOff: {
    backgroundColor: '#9e9e9e',
    color: '#fff',
  },
  itemSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
