import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import type { DispositivosStackParamList } from '../navigation/types';
import { useDevicePairing } from '../hooks/useDevicePairing';
import { setDevices } from '../store/devicesSlice';
import type { RootState } from '../store';
import { Button } from '../components/ui';
import { useTheme } from '../theme/ThemeContext';

type AddDeviceNavigationProp = NativeStackNavigationProp<
  DispositivosStackParamList,
  'AddDevice'
>;

export function AddDeviceScreen() {
  const navigation = useNavigation<AddDeviceNavigationProp>();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const currentDevices = useSelector((state: RootState) => state.devices.items);

  const {
    state,
    discoveredDevices,
    pairedDevice,
    error,
    errorCode,
    startScanning,
    pairWithDevice,
    reset,
    isBusy,
  } = useDevicePairing();

  const handleDone = useCallback(() => {
    if (pairedDevice) {
      dispatch(setDevices([...currentDevices, pairedDevice]));
    }
    reset();
    navigation.goBack();
  }, [pairedDevice, currentDevices, dispatch, reset, navigation]);

  const handleRetry = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      {state === 'idle' && discoveredDevices.length === 0 && (
        <View style={styles.section}>
          <Text
            style={[
              styles.paragraph,
              { color: theme.colors.textSecondary },
            ]}
          >
            Procure dispositivos BLE próximos para parear com a sua conta.
          </Text>
          <Button
            title="Iniciar varredura BLE"
            onPress={startScanning}
            variant="primary"
          />
        </View>
      )}

      {(state === 'scanning' || state === 'pairing') && (
        <View style={styles.section}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text
            style={[
              styles.statusText,
              { color: theme.colors.text, marginTop: theme.spacing.md },
            ]}
          >
            {state === 'scanning'
              ? 'Procurando dispositivos...'
              : 'Pareando com o dispositivo...'}
          </Text>
        </View>
      )}

      {state === 'idle' && discoveredDevices.length > 0 && (
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
                fontSize: theme.typography.label.fontSize,
                marginBottom: theme.spacing.sm,
              },
            ]}
          >
            Dispositivos encontrados
          </Text>
          {discoveredDevices.map((d) => (
            <TouchableOpacity
              key={d.id}
              style={[
                styles.deviceRow,
                {
                  backgroundColor: theme.colors.card,
                  borderRadius: theme.borderRadius,
                  padding: theme.spacing.md,
                  marginBottom: theme.spacing.sm,
                },
              ]}
              onPress={() => pairWithDevice(d.id)}
              disabled={isBusy}
            >
              <View>
                <Text
                  style={[
                    styles.deviceName,
                    {
                      color: theme.colors.text,
                      fontSize: theme.typography.body.fontSize,
                    },
                  ]}
                >
                  {d.name}
                </Text>
                <Text
                  style={[
                    styles.deviceMeta,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  RSSI: {d.rssi} • Toque para parear
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <Button
            title="Nova varredura"
            onPress={startScanning}
            variant="outline"
            style={{ marginTop: theme.spacing.sm }}
          />
        </View>
      )}

      {state === 'paired' && pairedDevice && (
        <View style={styles.section}>
          <Text
            style={[
              styles.successTitle,
              {
                color: theme.colors.success,
                fontSize: theme.typography.title.fontSize,
                marginBottom: theme.spacing.sm,
              },
            ]}
          >
            Dispositivo pareado
          </Text>
          <Text
            style={[
              styles.paragraph,
              { color: theme.colors.textSecondary },
            ]}
          >
            {pairedDevice.name} foi adicionado. Você pode incluí-lo na lista
            tocando em "Concluir".
          </Text>
          <Button title="Concluir" onPress={handleDone} variant="primary" />
        </View>
      )}

      {state === 'error' && (
        <View style={styles.section}>
          <Text
            style={[
              styles.errorTitle,
              {
                color: theme.colors.error,
                fontSize: theme.typography.title.fontSize,
                marginBottom: theme.spacing.xs,
              },
            ]}
          >
            Erro no pareamento
          </Text>
          <Text
            style={[
              styles.paragraph,
              { color: theme.colors.textSecondary, marginBottom: theme.spacing.xs },
            ]}
          >
            {error}
          </Text>
          {errorCode != null && (
            <Text
              style={[
                styles.errorCode,
                { color: theme.colors.textSecondary },
              ]}
            >
              Código: {errorCode}
            </Text>
          )}
          <Button title="Tentar novamente" onPress={handleRetry} variant="primary" />
          <Button
            title="Cancelar"
            onPress={() => {
              reset();
              navigation.goBack();
            }}
            variant="outline"
            style={{ marginTop: 12 }}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  section: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  sectionTitle: {},
  paragraph: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  statusText: {
    fontSize: 16,
  },
  deviceRow: {},
  deviceName: {
    fontWeight: '600',
  },
  deviceMeta: {
    fontSize: 12,
    marginTop: 4,
  },
  successTitle: {},
  errorTitle: {},
  errorCode: {
    fontSize: 12,
    marginBottom: 16,
  },
});
