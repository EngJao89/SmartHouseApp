import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { DispositivosStackParamList } from '../navigation/types';
import { setDevices } from '../store/devicesSlice';
import { useGetDevicesQuery } from '../store/devicesApi';
import type { RootState } from '../store';
import { DeviceCard } from '../components/DeviceCard';
import { useTheme } from '../theme/ThemeContext';

type DispositivosListNavigationProp = NativeStackNavigationProp<
  DispositivosStackParamList,
  'DispositivosList'
>;

export function DispositivosListScreen() {
  const navigation = useNavigation<DispositivosListNavigationProp>();
  const dispatch = useDispatch();
  const { theme } = useTheme();
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
      <View
        style={[
          styles.centered,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text
          style={[
            styles.loadingText,
            { color: theme.colors.textSecondary },
          ]}
        >
          Carregando dispositivos...
        </Text>
      </View>
    );
  }

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
            marginBottom: theme.spacing.md,
          },
        ]}
      >
        Dispositivos
      </Text>
      {devices.map((device) => (
        <DeviceCard
          key={device.id}
          device={device}
          onPress={() => openDetail(device.id, device.name)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
  },
  title: {},
});
