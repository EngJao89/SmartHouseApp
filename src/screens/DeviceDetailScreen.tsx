import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import type { DispositivosStackParamList } from '../navigation/types';
import { toggleDevice, updateBrightness } from '../store/devicesSlice';
import { useUpdateDeviceMutation } from '../store/devicesApi';
import type { RootState } from '../store';

type DeviceDetailRouteProp = RouteProp<
  DispositivosStackParamList,
  'DeviceDetail'
>;

export function DeviceDetailScreen() {
  const route = useRoute<DeviceDetailRouteProp>();
  const { deviceId, deviceName } = route.params;
  const dispatch = useDispatch();
  const device = useSelector((state: RootState) =>
    state.devices.items.find((d) => d.id === deviceId),
  );
  const [updateDevice, { isLoading }] = useUpdateDeviceMutation();

  const handleToggle = useCallback(
    (value: boolean) => {
      dispatch(toggleDevice(deviceId));
      updateDevice({ id: deviceId, on: value });
    },
    [deviceId, dispatch, updateDevice],
  );

  const handleBrightnessChange = useCallback(
    (value: number) => {
      const rounded = Math.round(value);
      dispatch(updateBrightness({ id: deviceId, brightness: rounded }));
    },
    [deviceId, dispatch],
  );

  const handleBrightnessCommit = useCallback(
    (value: number) => {
      const rounded = Math.round(value);
      updateDevice({ id: deviceId, brightness: rounded });
    },
    [deviceId, updateDevice],
  );

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Dispositivo não encontrado.</Text>
      </View>
    );
  }

  const hasBrightness = typeof device.brightness === 'number';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{deviceName ?? device.name}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Estado</Text>
        <Switch
          value={device.on}
          onValueChange={handleToggle}
          disabled={isLoading}
        />
      </View>
      <Text style={styles.hint}>
        {device.on ? 'Ligado' : 'Desligado'}
      </Text>

      {hasBrightness && (
        <>
          <Text style={[styles.label, styles.labelTop]}>Brilho</Text>
          <View style={styles.sliderRow}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={device.brightness ?? 0}
              onValueChange={handleBrightnessChange}
              onSlidingComplete={handleBrightnessCommit}
              minimumTrackTintColor="#2196f3"
              maximumTrackTintColor="#ccc"
              disabled={!device.on || isLoading}
            />
            <Text style={styles.brightnessValue}>
              {device.brightness ?? 0}%
            </Text>
          </View>
        </>
      )}

      {isLoading && (
        <Text style={styles.syncing}>Sincronizando...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  error: {
    fontSize: 16,
    color: '#c62828',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  labelTop: {
    marginTop: 16,
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  brightnessValue: {
    fontSize: 16,
    fontWeight: '600',
    minWidth: 40,
    textAlign: 'right',
  },
  syncing: {
    marginTop: 16,
    fontSize: 12,
    color: '#666',
  },
});
