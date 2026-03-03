/**
 * Simula o SDK nativo Tuya para IoT.
 * Todas as chamadas usam setTimeout para simular operações assíncronas.
 */

import type { Device } from '../store/deviceTypes';

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Dispositivo encontrado na varredura BLE (ainda não pareado). */
export interface DiscoverableDevice {
  id: string;
  name: string;
  rssi: number;
  productId: string;
}

/** Resposta de pareamento: dispositivo já registrado na nuvem. */
export interface PairResult {
  success: boolean;
  device?: Device;
  errorCode?: string;
  errorMessage?: string;
}

// Estado em memória simulado (como se viesse do SDK/nuvem)
let devicesStore: Device[] = [
  { id: '1', name: 'Lâmpada Sala', on: false, brightness: 80 },
  { id: '2', name: 'Ar-condicionado', on: false },
  { id: '3', name: 'Sensor Porta', on: true },
];

// Dispositivos "disponíveis" para pareamento BLE (simulação)
const DISCOVERABLE_MOCK: DiscoverableDevice[] = [
  { id: 'ble-1', name: 'Lâmpada Smart BLE', rssi: -45, productId: 'lamp_v1' },
  { id: 'ble-2', name: 'Sensor Temperatura', rssi: -62, productId: 'sensor_v1' },
  { id: 'ble-3', name: 'Interruptor Duplo', rssi: -58, productId: 'switch_v1' },
];

/**
 * Simula inicialização do SDK (ex.: TuyaSDK.init()).
 */
export async function initSDK(): Promise<void> {
  await delay(300);
}

/**
 * Simula obtenção da lista de dispositivos da nuvem/SDK.
 */
export async function getDeviceList(): Promise<Device[]> {
  await delay(400);
  return [...devicesStore];
}

/**
 * Simula comando de ligar/desligar (DP do Tuya).
 */
export async function setDevicePower(deviceId: string, on: boolean): Promise<void> {
  await delay(250);
  const device = devicesStore.find((d) => d.id === deviceId);
  if (!device) {
    throw new Error(`Device not found: ${deviceId}`);
  }
  device.on = on;
}

/**
 * Simula comando de brilho (DP de percentual).
 */
export async function setDeviceBrightness(
  deviceId: string,
  value: number,
): Promise<void> {
  await delay(250);
  const device = devicesStore.find((d) => d.id === deviceId);
  if (!device) {
    throw new Error(`Device not found: ${deviceId}`);
  }
  if (typeof device.brightness !== 'number') {
    throw new Error(`Device ${deviceId} does not support brightness`);
  }
  device.brightness = Math.max(0, Math.min(100, value));
}

/**
 * Simula varredura BLE para descobrir dispositivos próximos.
 */
export async function discoverBleDevices(): Promise<DiscoverableDevice[]> {
  await delay(1500);
  return [...DISCOVERABLE_MOCK];
}

/**
 * Simula pareamento BLE: vincula o dispositivo à conta e retorna o Device.
 * Em ambiente real seria: BLE connect -> exchange keys -> register on cloud.
 */
export async function pairBleDevice(
  discoverableId: string,
): Promise<PairResult> {
  await delay(2000);

  const discoverable = DISCOVERABLE_MOCK.find((d) => d.id === discoverableId);
  if (!discoverable) {
    return {
      success: false,
      errorCode: 'DEVICE_NOT_FOUND',
      errorMessage: 'Dispositivo não encontrado na varredura.',
    };
  }

  // Simula falha aleatória em ~10% para demonstrar estado de erro
  if (Math.random() < 0.1) {
    return {
      success: false,
      errorCode: 'PAIRING_TIMEOUT',
      errorMessage: 'Tempo esgotado. Verifique se o dispositivo está ligado e próximo.',
    };
  }

  const newId = `paired-${discoverable.id}`;
  const newDevice: Device = {
    id: newId,
    name: discoverable.name,
    on: false,
    ...(discoverable.productId === 'lamp_v1' && { brightness: 50 }),
  };

  devicesStore = [...devicesStore, newDevice];

  return {
    success: true,
    device: newDevice,
  };
}
