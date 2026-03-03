import { createSlice } from '@reduxjs/toolkit';
import type { Device } from './deviceTypes';

export interface DevicesState {
  items: Device[];
}

const initialState: DevicesState = {
  items: [
    { id: '1', name: 'Lâmpada Sala', on: false, brightness: 80 },
    { id: '2', name: 'Ar-condicionado', on: false },
    { id: '3', name: 'Sensor Porta', on: true },
  ],
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    toggleDevice(state, action: { payload: string }) {
      const id = action.payload;
      const device = state.items.find((d) => d.id === id);
      if (device) {
        device.on = !device.on;
      }
    },
    updateBrightness(state, action: { payload: { id: string; brightness: number } }) {
      const { id, brightness } = action.payload;
      const device = state.items.find((d) => d.id === id);
      if (device && typeof device.brightness === 'number') {
        device.brightness = Math.max(0, Math.min(100, brightness));
      }
    },
    setDevices(state, action: { payload: Device[] }) {
      state.items = action.payload;
    },
  },
});

export const { toggleDevice, updateBrightness, setDevices } = devicesSlice.actions;
export default devicesSlice.reducer;
