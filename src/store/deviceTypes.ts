/**
 * Modelo de dispositivo para estado local e API.
 */
export interface Device {
  id: string;
  name: string;
  on: boolean;
  /** 0–100, apenas para dispositivos que suportam (ex.: lâmpadas). */
  brightness?: number;
}
