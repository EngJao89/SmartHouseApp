import { useCallback, useState } from 'react';
import type { Device } from '../store/deviceTypes';
import type { DiscoverableDevice } from '../services/tuyaService';
import { discoverBleDevices, pairBleDevice } from '../services/tuyaService';

export type PairingState =
  | 'idle'
  | 'scanning'
  | 'pairing'
  | 'paired'
  | 'error';

export interface UseDevicePairingResult {
  /** Estado atual do fluxo de pareamento. */
  state: PairingState;
  /** Dispositivos encontrados na última varredura BLE. */
  discoveredDevices: DiscoverableDevice[];
  /** Dispositivo recém-pareado (preenchido quando state === 'paired'). */
  pairedDevice: Device | null;
  /** Mensagem de erro (preenchida quando state === 'error'). */
  error: string | null;
  /** Código de erro do SDK (ex.: PAIRING_TIMEOUT). */
  errorCode: string | null;
  /** Inicia a varredura BLE. */
  startScanning: () => Promise<void>;
  /** Inicia o pareamento com um dispositivo descoberto. */
  pairWithDevice: (discoverableId: string) => Promise<void>;
  /** Volta ao estado inicial (idle) e limpa dados. */
  reset: () => void;
  /** Indica se há operação em andamento (scanning ou pairing). */
  isBusy: boolean;
}

export function useDevicePairing(): UseDevicePairingResult {
  const [state, setState] = useState<PairingState>('idle');
  const [discoveredDevices, setDiscoveredDevices] = useState<
    DiscoverableDevice[]
  >([]);
  const [pairedDevice, setPairedDevice] = useState<Device | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const startScanning = useCallback(async () => {
    setState('scanning');
    setError(null);
    setErrorCode(null);
    setDiscoveredDevices([]);
    setPairedDevice(null);

    try {
      const devices = await discoverBleDevices();
      setDiscoveredDevices(devices);
      setState('idle');
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Falha na varredura BLE';
      setError(message);
      setState('error');
    }
  }, []);

  const pairWithDevice = useCallback(async (discoverableId: string) => {
    setState('pairing');
    setError(null);
    setErrorCode(null);
    setPairedDevice(null);

    try {
      const result = await pairBleDevice(discoverableId);

      if (result.success && result.device) {
        setPairedDevice(result.device);
        setState('paired');
      } else {
        setError(result.errorMessage ?? 'Pareamento falhou');
        setErrorCode(result.errorCode ?? 'UNKNOWN');
        setState('error');
      }
    } catch (e) {
      const message =
        e instanceof Error ? e.message : 'Erro durante o pareamento';
      setError(message);
      setErrorCode('EXCEPTION');
      setState('error');
    }
  }, []);

  const reset = useCallback(() => {
    setState('idle');
    setDiscoveredDevices([]);
    setPairedDevice(null);
    setError(null);
    setErrorCode(null);
  }, []);

  const isBusy = state === 'scanning' || state === 'pairing';

  return {
    state,
    discoveredDevices,
    pairedDevice,
    error,
    errorCode,
    startScanning,
    pairWithDevice,
    reset,
    isBusy,
  };
}
