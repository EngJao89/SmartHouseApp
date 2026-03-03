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
import { useTheme } from '../theme/ThemeContext';

type DeviceDetailRouteProp = RouteProp<
  DispositivosStackParamList,
  'DeviceDetail'
>;

export function DeviceDetailScreen() {
  const route = useRoute<DeviceDetailRouteProp>();
  const { deviceId, deviceName } = route.params;
  const dispatch = useDispatch();
  const { theme } = useTheme();
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
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.background,
            padding: theme.spacing.md,
          },
        ]}
      >
        <Text style={[styles.error, { color: theme.colors.error }]}>
          Dispositivo não encontrado.
        </Text>
      </View>
    );
  }

  const hasBrightness = typeof device.brightness === 'number';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          padding: theme.spacing.md,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.text,
            fontSize: theme.typography.title.fontSize,
            fontWeight: theme.typography.title.fontWeight,
            marginBottom: theme.spacing.lg,
          },
        ]}
      >
        {deviceName ?? device.name}
      </Text>

      <View style={[styles.row, { marginBottom: theme.spacing.xs }]}>
        <Text
          style={[
            styles.label,
            {
              color: theme.colors.text,
              fontSize: theme.typography.label.fontSize,
              fontWeight: theme.typography.label.fontWeight,
            },
          ]}
        >
          Estado
        </Text>
        <Switch
          value={device.on}
          onValueChange={handleToggle}
          disabled={isLoading}
          trackColor={{
            false: theme.colors.border,
            true: theme.colors.primary,
          }}
          thumbColor={theme.colors.primaryContrast}
        />
      </View>
      <Text
        style={[
          styles.hint,
          {
            color: theme.colors.textSecondary,
            fontSize: theme.typography.caption.fontSize,
          },
        ]}
      >
        {device.on ? 'Ligado' : 'Desligado'}
      </Text>

      {hasBrightness && (
        <>
          <Text
            style={[
              styles.label,
              styles.labelTop,
              {
                color: theme.colors.text,
                fontSize: theme.typography.label.fontSize,
                fontWeight: theme.typography.label.fontWeight,
                marginTop: theme.spacing.md,
                marginBottom: theme.spacing.sm,
              },
            ]}
          >
            Brilho
          </Text>
          <View style={styles.sliderRow}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={device.brightness ?? 0}
              onValueChange={handleBrightnessChange}
              onSlidingComplete={handleBrightnessCommit}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.border}
              disabled={!device.on || isLoading}
            />
            <Text
              style={[
                styles.brightnessValue,
                {
                  color: theme.colors.text,
                  fontSize: theme.typography.body.fontSize,
                  fontWeight: '600',
                },
              ]}
            >
              {device.brightness ?? 0}%
            </Text>
          </View>
        </>
      )}

      {isLoading && (
        <Text
          style={[
            styles.syncing,
            {
              color: theme.colors.textSecondary,
              marginTop: theme.spacing.md,
              fontSize: theme.typography.caption.fontSize,
            },
          ]}
        >
          Sincronizando...
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  error: {
    fontSize: 16,
  },
  title: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {},
  labelTop: {},
  hint: {
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
    minWidth: 40,
    textAlign: 'right',
  },
  syncing: {},
});
