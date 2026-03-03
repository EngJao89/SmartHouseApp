import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Device } from './deviceTypes';

/**
 * Simula delay de rede (ms).
 */
const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const MOCK_DEVICES: Device[] = [
  { id: '1', name: 'Lâmpada Sala', on: false, brightness: 80 },
  { id: '2', name: 'Ar-condicionado', on: false },
  { id: '3', name: 'Sensor Porta', on: true },
];

let mockDb = [...MOCK_DEVICES];

export const devicesApi = createApi({
  reducerPath: 'devicesApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Devices'],
  endpoints: (builder) => ({
    getDevices: builder.query<Device[], void>({
      queryFn: async () => {
        await delay(600);
        return { data: [...mockDb] };
      },
      providesTags: ['Devices'],
    }),
    updateDevice: builder.mutation<
      Device,
      { id: string; on?: boolean; brightness?: number }
    >({
      queryFn: async (arg) => {
        await delay(400);
        const index = mockDb.findIndex((d) => d.id === arg.id);
        if (index === -1) {
          return {
            error: { status: 404, data: 'Device not found' },
          } as { error: { status: number; data: string } };
        }
        const current = mockDb[index];
        const updated: Device = {
          ...current,
          ...(arg.on !== undefined && { on: arg.on }),
          ...(arg.brightness !== undefined && { brightness: arg.brightness }),
        };
        mockDb = mockDb.map((d) => (d.id === arg.id ? updated : d));
        return { data: updated };
      },
      invalidatesTags: ['Devices'],
    }),
  }),
});

export const { useGetDevicesQuery, useUpdateDeviceMutation } = devicesApi;
